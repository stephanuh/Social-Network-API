import mongoose from 'mongoose';

const db = async (): Promise<typeof mongoose.connection> => {
    try {
        await mongoose.connect(
            process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetwork_db',
        );
        console.log('Connected to database ✅');
        return mongoose.connection;
    } catch (err) {
        console.error('Error connecting to database ❌', err);
        throw new Error('Database connection failed');
    }
};

export default db;