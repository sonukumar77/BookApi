const Book = require("../Model/BookModel");

class PostBookController{

    postSingleBook(req,res){
        const { isbn, name, authors, count = 1 } = req.body;
        Book.findOne({ isbn })
          .then((data) => {
            if (!data) {
              Book.create({ isbn, name, authors, count }).then((book) => {
                res.status(200).send({ message: "book added!", book: book });
              });
            } else {
              data.count = data.count + count;
              data.save().then((book) => {
                res.status(200).send({ message: "book count added!", book: book });
              });
            }
          })
          .catch((error) => {
            console.log(error);
            res.status(500).send({ message: "try again later!" });
          });
    }

    postMultipleBook(req,res){
        const { books } = req.body;
        try {
          for (let book of books) {
            Book.findOne({ isbn: book.isbn }).then((data) => {
              if (!data) {
                Book.create({
                  isbn: book.isbn,
                  name: book.name,
                  authors: book.authors,
                  count: book.count,
                }).then((newBook) => {
                  //
                });
              } else {
                data.count = data.count + book.count;
                data.save().then((d) => {
                  //
                });
              }
             
            });
          }
          res.status(200).send({ message: "Books added", books });
        } catch (error) {
          res.status(500).send({ message: "Try again later" });
        }
    }
}

module.exports = new PostBookController;