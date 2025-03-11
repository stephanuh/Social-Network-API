import { Request, Response } from 'express';
import { Thought, User } from '../models/index.js';

//Return all thoughts
export const getAllThoughts = async (_req: Request, res: Response) => {
    try{
        const thoughts = await Thought.find();
        res.json(thoughts);
    }catch(err) {
        console.error('Error on getAllThoughts',err);
        res.status(500).json(err);
    }
};

//Create a thought & asign user to it
export const createThought = async(req: Request, res: Response) => {
    const userId = req.body.userId;
    try{
        if(await User.countDocuments({_id: userId}) === 0) {
            res.status(404).json({message: 'No user found with this id!'});
        }else {
            const thought = await Thought.create(req.body);
            await User.findOneAndUpdate(
                {_id: userId},
                {$push: {thoughts: thought._id}},
                {new: true}
            );
            res.json(thought);
        }
    } catch(err) {
        console.error('Error on createThought',err);
        res.status(500).json(err);
    }
};
 
//Return single thought by id
export const getThoughtById = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try{
        const thought = await Thought.findById(thoughtId);
        if(thought){
            res.json(thought);
        }else{
            res.status(404).json({message: 'No thought found with this id!'});
        }
    }catch(err){
        console.error('Error on getThoughtById',err);
        res.status(500).json(err);
    }
};

 
//Update thought by id
export const updateThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try{
        const thought = await Thought.findOneAndUpdate(
            {_id: thoughtId},
            {$set: req.body},
            {runValidators: true, new: true}
        );
        if(!thought){
            res.status(404).json({message: 'No thought found with this id!'});
        } else {
        res.json(thought);
        }
    }catch(err){
        console.error('Error on updateThought',err);
        res.status(500).json(err);
    }
};

//DELETE thought by id
export const deleteThought = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try{
        const result = await Thought.findOneAndDelete({_id: thoughtId});
            if(!result){
                res.status(404).json({message: 'No thought found with this id!'});
            }else{
                await User.findOneAndUpdate(
                    {thoughts: thoughtId},
                    {$pull: {thoughts: thoughtId}},
                    {new: true}
                );
                res.status(200).json({message: 'Thought deleted successfuly! 🎉'});
            }
    }catch(err) {
        console.error('Error on deleteThought',err);
        res.status(500).json(err);
    }
};

//---------------------------------REACTIONS---------------------------------

//ADD reaction to thought
export const addReaction = async (req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try{
        const thought = await Thought.findOneAndUpdate(
             { _id: thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true}
        );
        if(!thought){
            res.status(404).json({message: 'No thought found with this id!'});
        }else{
            res.json(thought);
        }
    }
    catch (err){
        console.error('Error on addReaction',err);
        res.status(400).json(err);
    }
};

//DELETE reaction from thought
export const deleteReaction = async (req: Request, res: Response) => {
    const { thoughtId, reactionId } = req.params;
    try{
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId},
            {$pull: {reactions: {reactionId}}},
            {new: true}
        );
        if(!thought){
            res.status(404).json({message: 'No thought found with this id!'});
        }else{
            res.json(thought);
        }
    }
    catch (err){
        console.error('Error on deleteReaction',err);
        res.status(500).json(err);
    }
}