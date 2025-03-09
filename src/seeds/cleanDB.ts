import { User, Thought } from '../models/index.js';

const cleanDB = async (): Promise<void> => {
    try {
        await User.deleteMany({});
        console.log('Users collection cleaned');

        await Thought.deleteMany({});
        console.log('Thoughts collection cleaned');
    }catch(err){
        console.error('Error cleaning database');
        process.exit(1);
    }
};

export default cleanDB;