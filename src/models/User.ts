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

userSchema.virtual('friendCount').get(function () {
    return this.friends?.length;
});

const User = model<IUser>('User', userSchema);

export default User;