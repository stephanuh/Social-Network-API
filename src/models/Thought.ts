import { Schema, model, Types, type Document, SchemaTypeOptions } from 'mongoose';
import dayjs from 'dayjs';
import { create } from 'domain';

export interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Array<IReaction>;
}

export interface IReaction extends Document {
    reactionId: Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

// Schema settings
const thoughtSchema = Schema<IThought> = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: function (value: Date | undefined): string {
            return value ? dayjs(value).format('YYY-MMM-DD hh:mm:ss A') : ''; 
        },
    } as unknown as SchemaTypeOptions<Date>,
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
});

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        defualt: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
        get: (value: Date) => dayjs(value).format('YYY-MMM-DD hh:mm:ss A'),
    },
});

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions.length;
});

const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;