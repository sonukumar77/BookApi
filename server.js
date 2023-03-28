const dotenv = require("dotenv");
dotenv.config(); // after this line 2 all can access .env file
const express = require("express");
const db = require("./database");
const PORT = process.env.PORT || 3500;
const GetRouter = require("./Routes/GetRoute");
const cookie_parser = require("cookie-parser");


db();
const app = express();
app.use(express.json());
app.use(cookie_parser());




app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello world this is node api</h1>");
});


app.use("/auth",require("./Routes/AuthRoute"));
app.use("/get", GetRouter);
app.use("/post",require("./Routes/PostRoute"));






// app.post("/post", (req, res) => {
//   const { isbn, name, authors, count = 1 } = req.body;
//   Book.findOne({ isbn })
//     .then((data) => {
//       if (!data) {
//         Book.create({ isbn, name, authors, count }).then((book) => {
//           res.status(200).send({ message: "book added!", book: book });
//         });
//       } else {
//         data.count = data.count + count;
//         data.save().then((book) => {
//           res.status(200).send({ message: "book count added!", book: book });
//         });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).send({ message: "try again later!" });
//     });
// });

// app.post("/post/addbooks", (req, res) => {
//   const { books } = req.body;
//   try {
//     for (let book of books) {
//       Book.findOne({ isbn: book.isbn }).then((data) => {
//         if (!data) {
//           Book.create({
//             isbn: book.isbn,
//             name: book.name,
//             authors: book.authors,
//             count: book.count,
//           }).then((newBook) => {
//             //
//           });
//         } else {
//           data.count = data.count + book.count;
//           data.save().then((d) => {
//             //
//           });
//         }
       
//       });
//     }
//     res.status(200).send({ message: "Books added", books });
//   } catch (error) {
//     res.status(500).send({ message: "Try again latter" });
//   }
// });

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
