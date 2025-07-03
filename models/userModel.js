const path = "./data/users.json";
const { readJSON, writeJSON } = require("../utils/fileUtils");

const getUsers = () => readJSON(path);
const saveUsers = (data) => writeJSON(path, data);

module.exports = { getUsers, saveUsers };
