import { Router } from 'express';
import {
    createThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction,
} from '../../controllers/thoughtController';

const router = Router();

// /api/thoughts
router.route('/')
.get(getAllThoughts) // GET all thoughts
.post(createThought); // POST a new thought

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
.get(getThoughtById) // GET a single thought by its _id
.put(updateThought) // PUT to update a thought by its _id
.delete(deleteThought); // DELETE to remove a thought by its _id

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

export { router as thoughtRouter };
