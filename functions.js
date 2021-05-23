const authors = require("./authors.json");
const books = require("./books.json");

/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  // Your code goes here
  // if(bookId)
  // {return books.filter((idOf) => idOf.id === bookId)}
  return books.find(book => book.id === bookId);
}
//console.log(getBookById(12, books));

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  // Your code goes here
  // for(let i=0;i<authors.length;i++){
  //   if(authors[i].name.toUpperCase() == authorName.toUpperCase()){
  //     return authors[i];
  //   }
  // }
  // return undefined
  return authors.find(
    author => author.name.toLowerCase() === authorName.toLowerCase()
  );
}
//console.log(getAuthorByName("J.K. Rowling", authors));

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  // Your code goes here
  // authors.forEach(author =>console.log([author.name , author.books.length]))
//   const arrayy=[]
//  for(let i=0;i<authors.length;i++){
//    arrayy.push({ 'author': authors[i].name, 'bookCount': authors[i].books.length})
//  }
//  return arrayy
return authors.map(authorA => ({
  author: authorA.name,
  bookCount: authorA.books.length
}));
}
 //console.log(bookCountsByAuthor(authors));

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};

  // Your code goes here
  books.forEach(book => {
    if (colors[book.color]){
      colors[book.color].push(book.title);
      }
    else {
      colors[book.color] = [book.title]
      };
  });
  return colors;
}
  console.log(booksByColor(books));

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
   const author = getAuthorByName(authorName, authors);
  if (!author) return [];
  return author.books.map(bookId => getBookById(bookId, books).title);
}
// console.log(titlesByAuthorName("George R.R. Martin", authors, books));

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  // Your code goes here
  let authorProfile = authors[0];

  authors.forEach(author => {
    if (author.books.length > authorProfile.books.length) {
      authorProfile = author;
    }
  });

  return authorProfile.name;
}
// console.log(mostProlificAuthor(authors));

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  // Your code goes here
  const book = getBookById(bookId, books);
  let titles = [];

  book.authors.forEach(
    author =>
      (titles = titles.concat(titlesByAuthorName(author.name, authors, books)))
  );
  return titles;
}
// console.log(relatedBooks(50, authors, books));

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // Your code goes here
  authors.forEach(author => {
    author.coauthoringCount = 0;
    authors.forEach(secondAuthor => {
      if (secondAuthor.name !== author.name) {
        const sharedBooks = secondAuthor.books.filter(bookId =>
          author.books.includes(bookId)
        );
        author.coauthoringCount += sharedBooks.length;
      }
    });
  });

  let friendlyAuthor = authors[0];

  authors.forEach(author => {
    if (author.coauthoringCount > friendlyAuthor.coauthoringCount) {
      friendlyAuthor = author;
    }
  });

  return friendlyAuthor.name;
}
// console.log(friendliestAuthor(authors));

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor,
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */
