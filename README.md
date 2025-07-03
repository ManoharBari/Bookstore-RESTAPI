# 📚 Bookstore REST API

A simple and well-structured RESTful API built with **Node.js** and **Express**, supporting file-based persistence and token-based user authentication.

---

## ✅ Features

- User Registration & Login with JWT authentication
- CRUD operations on books
- File-based JSON persistence using `fs.promises`
- Middleware-based logging, authentication, and error handling
- Filter books by genre
- Pagination support

---

## 🔧 Tech Stack

- Node.js
- Express.js
- JSON Web Token (JWT)
- bcryptjs
- uuid
- dotenv

---

## ⚙️ Installation

```bash
git clone https://github.com/ManoharBari/Bookstore-RESTAPI.git
cd Bookstore-RESTAPI
npm install
```

Create a `.env` file:

```
JWT_SECRET=your_secret_key
```

---

## 🚀 Running the Server

```bash
npm start
```

Server will run at: `http://localhost:3000`

---

## ⚖️ API Endpoints

###  Auth

#### Register

```
POST /api/register
```

**Body:**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

#### Login

```
POST /api/login
```

**Body:**

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**

```json
{
  "token": "<jwt_token>"
}
```

---

### 📖 Books (Protected)

Use `Authorization: Bearer <token>` in headers for all book routes.

#### Get All Books (with optional filters & pagination)

```
GET /api/books?genre=Fantasy&page=1&limit=5
```

#### Get Book by ID

```
GET /api/books/:id
```

#### Add Book

```
POST /api/books
```

**Body:**

```json
{
  "title": "Dune",
  "author": "Frank Herbert",
  "genre": "Sci-Fi",
  "publishedYear": 1965
}
```

#### Update Book

```
PUT /api/books/:id
```

#### Delete Book

```
DELETE /api/books/:id
```

---

## 🔍 Search & Pagination

- Filter by genre:
  `GET /api/books?genre=Sci-Fi`
- Pagination:
  `GET /api/books?page=2&limit=10`
- Combined:
  `GET /api/books?genre=Fantasy&page=1&limit=5`

---

## 💾 Data Persistence

Data is stored in:

- `data/users.json`
- `data/books.json`

Uses `fs.promises` to read/write data asynchronously.

---

## 🔎 Testing the API

Use **Postman**, **cURL**, or any REST client:

Example:

```bash
curl -X POST http://localhost:3000/api/register \
 -H "Content-Type: application/json" \
 -d '{"email":"test@mail.com","password":"123456"}'
```

---

## 🚫 Access Control

- Only authenticated users can access `/books`
- Only the book owner can update/delete their books

---

## ✨ Bonus Features

- `GET /books?genre=` ✓
- Pagination `?page=&limit=` ✓
- `uuid` for book IDs ✓
- Middleware: logger, auth, error handler ✓

---

## 📊 Optional Improvements

- Swagger API documentation
- Unit tests with Jest/Mocha
- Dockerization
- Search by author/title/year

---

## ✉️ Author

Built by [Manohar Kale](https://github.com/manoharbari)
