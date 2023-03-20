import express from 'express';
const router = express.Router();
import { ArticlesController } from '../controllers/articlesController';
import { CommentsController } from '../controllers/commentsController';

router.get('/articles', ArticlesController.fetch);
router.post('/articles', ArticlesController.create);
router.get('/articles/:id', ArticlesController.find);
router.put('/articles/:id', ArticlesController.update);
router.delete('/articles/:id', ArticlesController.delete);

router.get('/comments', CommentsController.fetch);
router.post('/comments', CommentsController.create);
router.get('/comments/:id', CommentsController.find);
router.put('/comments/:id', CommentsController.update);
router.delete('/comments/:id', CommentsController.delete);


export default router;