import { Request, Response } from 'express';
import { User } from '../models/index.js';


//GET all users
export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    }catch(err){
        console.error('Error in getAllUsers', err);
        res.status(500).json(err);
    }
};

//return single user by id
export const getUserById = async (req: Request, res: Response) => {
    const { userid } = req.params;
    try {
        const user = await User.findById(userid).populate('friends').populate('thoughts');
        if (user) {
            res.json(user);
        }else {
            res.status(404).json({ message: 'No user found with this id!' });
        }
    }catch(err){
        console.error('Error in getUserById', err);
        res.status(500).json(err);
    }
};

//CREATE new user
export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await User.create(req.body);
        res.json(user);
    }catch(err){
        console.error('Error in createUser', err);
        res.status(500).json(err);
    }
};

//UPDATE user by id
export const updateUser = async (req: Request, res: Response) => {
    const { userid } = req.params;
    try {
        const user = await User.findOneAndUpdate(
            {_id: userid},
            {$set: req.body},
            {runValidators: true, new: true}
        );
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
        }else{
        res.json(user);
        }
    }catch(err){
        console.error('Error in updateUser', err);
        res.status(500).json(err);
    }
};

//DELETE user by id
export const deleteUser = async (req: Request, res: Response) => {
    const { userid } = req.params;
    try {
        const result = await User.findOneAndDelete({_id: userid});
        if (!result) {
            res.status(404).json({ message: 'No user found with this id!' });
        }else{
            res.status(200).json({ message: 'User deleted successfully! 🎉' });
        }
    }catch(err) {
        console.error('Error in deleteUser', err);
        res.status(500).json(err);
    }
};

//---------------------------------FRIENDS---------------------------------

//ADD new friends to user friends list
export const addFriend = async (req: Request, res: Response) => {
    const { userid, friendId } = req.params;
    try {
        const friend = await User.findById(friendId);
        if(!friend){
            res.status(404).json({ message: 'Invalid friend ID!' });
        }else {
            const user = await User.findOneAndUpdate(
                {_id: userid},
                {$addToSet: {friends: friendId}},
                {new: true}
            );
            if(!user){
                res.status(404).json({ message: 'No friend found with this id!' });
            }else{
                res.json(user);
            }
        }
    }catch(err){
        console.error('Error in addFriend', err);
        res.status(500).json(err);
    }
};

//REMOVE a friend from user friends list
export const removeFriend = async (req: Request, res: Response ) => {
    const { userid, friendId } = req.params;
    try{
        const user = await User.findOneAndUpdate(
            {_id: userid},
            {$pull: { friends: friendId }},
            {new: true}
        );
        if(!user) {
            res.status(404).json({ message: 'No user found with this id!' });
        }else{
            res.json(user);
        }
    }catch(err){
        console.error('Error in removeFriend', err);
        res.status(500).json(err);
    }
};