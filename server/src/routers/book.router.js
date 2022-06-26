import express from 'express';
import * as bookController from '../controllers/book.controller.js';
import adminAuth from '../middlewares/admin.auth.js';

const router = new express.Router();

router.get('/books', bookController.getAllBooks);

router.get('/books/:bookID', bookController.getBookByID);

router.post('/books/new', adminAuth, bookController.createBook);

router.patch('/books/:bookID', adminAuth, bookController.updateBook);

router.delete('/books/:bookID', adminAuth, bookController.deleteBook);

export default router;