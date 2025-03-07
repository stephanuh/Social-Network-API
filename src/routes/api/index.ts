import { Router } from 'express';
import { userRouter } from './userRoutes';
import { thoughtRouter } from './thoughtRoutes';

const router = Router();

// api/users
router.use('/users', userRouter);

// api/thoughts
router.use('/thoughts', thoughtRouter);

export default router;