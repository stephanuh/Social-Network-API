import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';

//GET
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find().populate('friends').populate('thoughts');
        res.json(users);
    }catch(err: any) {
        console.error('Error in getAllUsers', err);
        res.status(500).json(err);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { userid } = req.params;
    try {
        const user = await User.findById(userid).populate('friends').populate('thoughts');
        if (user) {
            res.json(user);
        }else {
            res.status(404).json({ message: 'No user found with this id!' });
        }
    }catch(err: any) {
        res.status(500).json({ message: 'Error in getUserById', err });
    }
};

//POST
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    }catch(err: any) {
        console.error('Error in createUser', err);
        res.status(500).json(err);
    }
};

//PUT
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userid},
            {$set: req.body},
            {runValidators: true, new: true}
        );
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
        }
        res.json(user);
    }catch(err: any) {
        console.error({message: err.message});
    }
};

//DELETE
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndDelete({_id: req.params.userid});
        if (!user){
            res.status(404).json({ message: 'No user found with this id!' });
        }else{
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            res.status(200).json({ message: 'User deleted successfully!' });
        }
    }catch(err: any) {
        console.error('Error in deleteUser', err);
        res.status(500).json(err);
    }
};

//FRIENDS POST
export const addFriend = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userid},
            {$addToSet: { friends: req.params.friendId }},
            {runValidators: true, new: true}
        );
        if(!user){
            res.status(404).json({ message: 'No user found with this id!' });
        }
        const friend = await User.findOneAndUpdate(
            { _id: req.params.friendId},
            {$addToSet: { friends: req.params.userid }},
            {runValidators: true, new: true}
        );
        if(!friend){
            res.status(404).json({ message: 'No friend found with this id!' });
        }
        res.json({user, friend});
    }catch(err: any) {
        console.error('Error in addFriend', err);
        res.status(500).json(err);
    }
};

//FRIENDS DELETE
export const removeFriend = async (req: Request, res: Response ) => {
    try{
        console.log('req.params = ', req.params);
        const user = await User.findByIdAndUpdate(
            req.params.userid,
            {$pull: { friends: req.params.friendId }},
            {new: true}
        );
        if(!user) {
            res.status(404).json({ message: 'No user found with this id!' });
        }
        const friend = await User.findByIdAndUpdate(
            req.params.friendId,
            {$pull: { friends: req.params.userid }},
            {new: true}
        );
        if(!friend){
            res.status(404).json({ message: 'No friend found with this id!' });
        }else{
            res.status(200).json({ message: 'Friend removed successfully! 🎉' });
        }
    }catch(err: any) {
        console.error('Error in removing Friend', err);
        res.status(500).json(err);
    }
};