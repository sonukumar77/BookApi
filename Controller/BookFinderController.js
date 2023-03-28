const Book = require("../Model/BookModel");

class BookFinder{

    async getAllBooks(req,res){

        try{
          const books =  await  Book.find();
           console.log(books)
           res.status(200).send({ books: books });

        }catch(error){
            res.status(500).send({ message: "failed to get all books" });
        }
    }

    async getAllBooksWithCountgreaterThanOne(req,res){
       
        try{

           const books = await Book.find({count:{$gte:1}})
           res.status(200).send({ books: books });
        }catch(error){
            res.status(500).send({ message: "failed to get all books" });
        }
    }

    async getBookUsingIsbn(req,res){
        const isbn = req.params.isbn;
        try{
            
          const books =  await Book.findOne({isbn:isbn});
          res.status(200).send({ books: books });

        }catch(error){
            res.status(500).send({ message: "failed to get books" });
        }
    }


    async getAllBooksWrittenByAuthor(req,res){
        const author = req.params.author;

        try{
            const data = await Book.find();
            const books=[];

            for(let book of data){
                const authors = book.authors;
                for (let authorOfThidBook of authors){
                    if(author === authorOfThidBook){
                        books.push(book);
                    }
                }
            }

            res.status(200).send({ books: books });
        }catch(error){
            res.status(500).send({ message: "failed to get all books" });
        }
    }

    async reduceBookCount(req,res){
        const { isbn, count } = req.body;

        try{
            const data= await Book.findOne({isbn});
            if(!data){
                res.status(404).send({ message: "this book is not present in db." });
            }else{
                data.count = Math.max(0, data.count - count); 
                await data.save();
            }

        }catch(error){
            res.status(500).send({ message: "failed to get books" });
        }
    }

}

module.exports = new BookFinder();
