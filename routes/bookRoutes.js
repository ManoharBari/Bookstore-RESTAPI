const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const bookController = require('../controllers/bookController');

router.use(auth);

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.addBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
