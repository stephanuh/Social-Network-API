import { Router } from "express";
import {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} from '../../controllers/userController';

const router = Router();

// /api/users
router.route('/')
.post(createUser)//creates a user
.get(getAllUsers);//reads all users

// /api/users/:userid
router.route('/:userid')
.get(getUserById)//reads a user by id
.put(updateUser)//updates a user by id
.delete(deleteUser);//deletes a user by id

// /api/users/:userid/friends/:friendid
router.route('/:userid/friends/:friendid')
.post(addFriend)//adds a friend to a user
.delete(removeFriend);//delete a friend from a user

export { router as userRouter };