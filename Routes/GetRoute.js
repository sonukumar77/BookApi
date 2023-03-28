const express = require("express");
const router = express.Router();
// const Book = require("../Model/BookModel");
const BookFinderController = require("../Controller/BookFinderController");
const jwt = require("jsonwebtoken");
const UserModal = require("../Model/UserModel");

//   router.get("/", (req, res) => {
//     Book.find()
//       .then((data) => {
//         console.log(data);
//         res.status(200).send({ books: data });
//       })
//       .catch((error) => {
//         res.status(500).send({ message: "failed to get all books" });
//       });
//   });

router.get(
  "/",
  (req, res, next) => {
    const { accessToken } = req.cookies;
    if (!accessToken) res.status(400).send({ message: "user not signed in" });
    let payload;
    try {
      payload = jwt.verify(accessToken, "salt");
    } catch (error) {
      res.status(400).send({ message: "user not signed in" });
    }

    const { _id } = payload;

    UserModal.findOne({ _id })
      .then((user) => {
        if (user) {
          next();
        } else {
          res.status(200).send({ message: "user is signed in ! cool" });
        }
      })
      .catch((error) => {
        res.status(400).send({ message: "user not signed in" });
      });
  },
  BookFinderController.getAllBooks
);

//   router.get("/morethanonecount", (req, res) => {
//     Book.find({ count: { $gte: 1 } })
//       .then((data) => {
//         res.status(200).send({ books: data });
//       })
//       .catch((error) => {
//         res.status(500).send({ message: "failed to get all books" });
//       });
//   });

router.get(
  "/morethanonecount",
  BookFinderController.getAllBooksWithCountgreaterThanOne
);

//   router.get("/isbn/:isbn", (req, res) => {
//     const isbn = req.params.isbn;
//     Book.find({ isbn: isbn })
//       .then((data) => {
//         res.status(200).send({ books: data });
//       })
//       .catch((error) => {
//         res.status(500).send({ message: "failed to get all books" });
//       });
//   });

router.get("/isbn/:isbn", BookFinderController.getBookUsingIsbn);

//   router.get("/author/:author", (req, res) => {
//     const author = req.params.author;
//     Book.find()
//       .then((data) => {
//         const books = [];
//         for (let book of data) {
//           const authors = book.authors;
//           for (let autherOfThis of authors) {
//             if (author === autherOfThis) {
//               books.push(book);
//             }
//           }
//         }

//         res.status(200).send({ books: books });
//       })
//       .catch((error) => {
//         res.status(500).send({ message: "failed to get all books" });
//       });
//   });

router.get("/author/:author", BookFinderController.getAllBooksWrittenByAuthor);

//   router.get("/deletebooks", (req, res) => {
//     const { isbn, count } = req.body;

//     Book.findOne({ isbn: isbn })
//       .then((data) => {
//         if (!data) {
//           res.status(404).send({ message: "this book is not present in db." });
//         } else {
//           data.count = Math.max(0, data.count - count); // default value 0 for negetiv edge case
//           data.save().then(() => {
//             res.status(200).send({ message: "count decremented" });
//           });
//         }
//       })
//       .catch((error) => {
//         res.status(500).send({ message: "failed to delete book count" });
//       });
//   });

router.get("/deletebooks", BookFinderController.reduceBookCount);

module.exports = router;
