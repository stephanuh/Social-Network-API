import { Request, Response } from 'express';
import { Thought, User } from '../models/index';

//GET
export const getAllThoughts = async (_req: Request, res: Response) => {
    try{
        const thoughts = await Thought.find().populate('reactions');
        res.json(thoughts);
    }catch(err: any){
        console.error('Error on getAllThoughts',err);
        res.status(400).json(err);
    }
};

//POST
export const createThought = async(req: Request, res: Response) => {
    try{
        const thought = await Thought.create(req.body);
        const { username } = thought;
        const user = await User.findOneAndUpdate(
            {username: username},
            {$addToSet: {thoughts: thought._id}},
            {new: true}
        );
        if(!user){
            res.status(404).json({message: 'No user found with this username!'});
        }
        res.json(thought);
    }catch(err: any){
        console.error('Error on createThought',err);
        res.status(400).json(err);
    }
};
 
//GET
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try{
        const thought = await Thought.findById(thoughtId);
        if(thought){
            res.json(thought);
        }else{
            res.status(404).json({message: 'No thought found with this id!'});
        }
    }catch(err: any){
        console.error('Error on getThoughtById',err);
        res.status(400).json(err);
    }
};

 
//PUT
export const updateThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try{
        const thought = await Thought.findByIdAndUpdate(
            thoughtId,
            {$set: req.body},
            {runValidators: true, new: true}
        );
        if(!thought){
            res.status(404).json({message: 'No thought found with this id!'});
        }
        res.json(thought);
    }catch(err: any){
        console.error('Error on updateThought',err);
        res.status(500).json(err);
    }
};

//DELETE
export const deleteThought = async (req: Request, res: Response) => {
    try{
        const thought = await Thought.findOneAndDelete(
            {_id: req.params.thoughtId});
            if(!thought){
                res.status(404).json({message: 'No thought found with this id!'});
            }else{
                await Thought.deleteMany({ _id: { $in: thought.reactions } });
                res.json(200).json({message: 'Thought deleted successfuly!'});
            }
    }catch(err: any){
        console.error('Error on deleteThought',err);
        res.status(400).json(err);
    }
};

//REACTION

//PUT
export const addReaction = async (req: Request, res: Response) => {
    try{
        const thought = await Thought.findByIdAndUpdate(
             req.params.thoughtId,
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        );
        if(!thought){
            console.log('No thought found with this id to add the reaction to!');
            res.status(404).json({message: 'No thought found with this id!'});
        }else{
            res.status(200).json(thought);
        }
    }
    catch (err: any){
        console.error('Error on addReaction',err);
        res.status(400).json(err);
    }
};

//DELETE
export const deleteReaction = async (req: Request, res: Response) => {
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {new: true}
        );
        if(!thought){
            console.log('No thought found with this id!');
            res.status(404).json({message: 'No thought found with this id!'});
        }else{
            res.status(200).json(thought);
        }
    }
    catch (err: any){
        console.error('Error on deleteReaction',err);
        res.status(400).json(err);
    }
}