import { Schema, model, type Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Schema.Types.ObjectId[];
    friends: Schema.Types.ObjectId[];
}

const userSchema= new Schema<IUser>({ 
    username: {
        type: String,
        required: true,
        unique: true,
        //trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[^@]+@[^@.]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address'],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
},
{
    toJSON: {
        virtuals: true,
    },
    timestamps:false
});

userSchema.virtual('friendCount').get(function (this: IUser) { //or empty function and remove this '?'
    return this.friends?.length;
});

const User = model<IUser>('User', userSchema);

export default User;