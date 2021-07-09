require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const database = require("./database/index");

const shapeAI = express();

shapeAI.use(express.json());  

mongoose
.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }
)
.then(() => console.log("connection established!!!!"));

shapeAI.get("/", (req, res) =>{
    return res.json({books: database.books});
} );

shapeAI.get("/is/:isbn", (req, res)=>{
    const getSpecificBook = database.books.filter((book)=> book.ISBN === req.params.isbn);
    
    if(getSpecificBook.length===0) {
        return res.json({
            error: `No book found for the ISBN of ${req.params.isbn}`,
    });
}
return res.json({book: getSpecificBook});
});

shapeAI.get("/c/:category", (req, res)=> {
    const getSpecificBooks = database.books.filter((book) => book.category.includes(req.params.category)
    );

    if(getSpecificBooks.length === 0) {
        return res.json({
            error: `No book found for the category of ${req.params.category}`,
    });
}
return res.json({ books: getSpecificBooks});
});


shapeAI.get("/publications", (req, res) => {
    return res.json({ publications: database.publications });
  });
  
  shapeAI.post("/book/new", (req, res) => {
    const {newBook} = req.body;
    database.books.push(newBook);
    return res.json({books: database.books, message: "book was added!"});
});

shapeAI.post("/author/new", (req, res) => {
    const {newAuthor} = req.body;
    database.authors.push(newAuthor);
    return res.json({authors: database.authors, message: "author was added!"});
});

shapeAI.post("/publications/new", (req, res)=>
{
    const {newPublications} = req.body;
    database.publications.push(newPublications);
    return res.json({publications: database.publications, message: "publication was added!"});
})

shapeAI.put("/book/update/:isbn", (req, res)=>
{
database.books.forEach((book) =>
{
    if(book.ISBN === req.params.isbn){
     book.title = req.body.bookTitle;
     return;
    }
});
return res.json({
    books:database.books
});
});

shapeAI.put("/book/author/update/:isbn", (req,res)=>
{
    database.books.forEach((book)=>{
     if(book.ISBN === req.params.isbn) return book.authors.push(
      req.body.newAuthor   
     );
      });
      database.authors.forEach((author)=>
      {
          if(author.id === req.body.newAuthor)
          return author.books.push(req.params.isbn);
      });
      return res.json({
          books: database.books, 
          authors: database.authors,
          message: "New author was added",
      });
});

shapeAI.put("/publication/update/book/:isbn", (req,res) =>
{
    database.publications.forEach((publication)=>
    {
     if(publication.id === req.body.pubId) {
         return publication.books.push(req.params.isbn);
     }
    });
    database.books.forEach((book) =>{
        if(book.ISBN === req.params.isbn){
            book.publication = req.body.pubId;
            return;
        }
    });
    return res.json({
        books: database.books,
        publications: database.publications,
        message: "Successfully updated publication",
    });
});
  
shapeAI.delete("/book/delete/:isbn",(req,res)=>
{
const updatedBookDatabase = database.books.filter((book)=> book.ISBN !== req.params.isbn);
database.books = updatedBookDatabase;
return res.json({books: database.books});
});


shapeAI.listen(5000, () => console.log("server running!!"));

