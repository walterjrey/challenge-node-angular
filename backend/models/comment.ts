import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    body: {
        type: String
    },
    author: {
        type: String
    },
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }
}, { timestamps: true })

commentSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Comment = mongoose.model('Comment', commentSchema)

export { Comment }