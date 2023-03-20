import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    body: {
        type: String
    },
    author: {
        type: String
    }
}, { timestamps: true })

articleSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

const Article = mongoose.model('Article', articleSchema)

export { Article }