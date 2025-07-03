const { v4: uuidv4 } = require("uuid");
const { getBooks, saveBooks } = require("../models/bookModel");

exports.getAllBooks = async (req, res) => {
  try {
    let books = await getBooks();
    const { genre, page = 1, limit = 10 } = req.query;

    // Filter by genre if provided
    if (genre) {
      books = books.filter(
        (book) => book.genre.toLowerCase() === genre.toLowerCase()
      );
    }

    // Pagination logic
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;

    const paginatedBooks = books.slice(startIndex, endIndex);

    res.json({
      total: books.length,
      page: pageNum,
      limit: limitNum,
      data: paginatedBooks,
    });
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ error: "Failed to fetch books" });
  }
};

exports.getBookById = async (req, res) => {
  const books = await getBooks();
  const book = books.find((b) => b.id === req.params.id);
  book ? res.json(book) : res.status(404).json({ error: "Book not found" });
};

exports.addBook = async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;
  const newBook = {
    id: uuidv4(),
    title,
    author,
    genre,
    publishedYear,
    userId: req.user.id,
  };
  const books = await getBooks();
  books.push(newBook);
  await saveBooks(books);
  res.status(201).json(newBook);
};

exports.updateBook = async (req, res) => {
  const books = await getBooks();
  const index = books.findIndex((b) => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  const book = books[index];
  if (book.userId !== req.user.id)
    return res.status(403).json({ error: "Forbidden" });

  books[index] = { ...book, ...req.body };
  await saveBooks(books);
  res.json(books[index]);
};

exports.deleteBook = async (req, res) => {
  const books = await getBooks();
  const index = books.findIndex((b) => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  if (books[index].userId !== req.user.id)
    return res.status(403).json({ error: "Forbidden" });

  books.splice(index, 1);
  await saveBooks(books);
  res.status(204).end();
};
