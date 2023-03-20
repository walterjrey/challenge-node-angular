import { Request, Response } from 'express';
import { Article } from '../models/article';

class ArticlesController {
    static async create(req: Request, res: Response) {
        const articleData = new Article({
            title: req.body.title,
            body: req.body.body,
            author: req.body.author
        });

        try {
            const articleToSave = await articleData.save();
            res.status(200).json(articleToSave)
        }
        catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }

    static async fetch(req: Request, res: Response) {
        try {
            var params: object = {};
            if(req.query.title) {
                params = {title: { $regex: '.*' + req.query.title + '.*' }};
            }
            const data = await Article.find(params);
            res.json(data)
        }
        catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    static async find(req: Request, res: Response) {
        try {
            const data = await Article.findById(req.params.id);
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

            const result = await Article.findByIdAndUpdate(
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
            console.log('delete', id);
            const data = await Article.findByIdAndDelete(id)
            res.status(200).json({ok: true, msg: `Document with ${data?.title} has been deleted..`});
        }
        catch (error: any) {
            res.status(400).json({ message: error.message })
        }
    }
}

export { ArticlesController }