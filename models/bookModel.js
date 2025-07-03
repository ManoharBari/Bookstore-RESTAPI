const path = './data/books.json';
const { readJSON, writeJSON } = require('../utils/fileUtils');

const getBooks = () => readJSON(path);
const saveBooks = (data) => writeJSON(path, data);

module.exports = { getBooks, saveBooks };
