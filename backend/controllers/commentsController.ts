import { Request, Response } from 'express';
import { Comment } from '../models/comment';

class CommentsController {

    static async fetch(req: Request, res: Response) {
        try {
            const data = await Comment.find({ article: req.query.article }).sort({ createdAt: -1 });
            res.json(data)
        }
        catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    static async create(req: Request, res: Response) {
        console.log(req.body);
        const commentData = new Comment({
            body: req.body.body,
            author: req.body.author,
            article: req.body.articleId,
        });

        try {
            const commentToSave = await commentData.save();
            res.status(200).json(commentToSave)
        }
        catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    static async find(req: Request, res: Response) {
        try {
            const data = await Comment.findById(req.params.id);
            res.json(data)
        }
        catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const updatedData = req.body;
            const options = { new: true };

            const result = await Comment.findByIdAndUpdate(
                id, updatedData, options
            )

            res.send(result)
        }
        catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const data = await Comment.findByIdAndDelete(id)
            res.status(200).json({ok: true, msg: `Document with ${data?.body} has been deleted..`});
        }
        catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
}

export { CommentsController }