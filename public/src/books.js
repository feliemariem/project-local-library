function findAuthorById(authors, id) {
  let matchedAuthor = {};
  for (let author in authors) {
      author = authors[author];
      authorId = author.id;
      if (authorId === id) {
          matchedAuthor = author;
      }
  }
  return matchedAuthor;
}

function findBookById(books, id) {
  let matchedBook = {};
  for (let book in books) {
      book = books[book];
      const bookId = book.id;
      if (bookId === id) {
          matchedBook = book;
      }
  }
  return matchedBook;
}

function partitionBooksByBorrowedStatus(books) {
 // return [[books.filter((book => !book.borrow[0].returned))], [...theRest]]
  let isIn = books.filter((book) => 
    book.borrows[0].returned);
  let isOut = books.filter((book) => 
    !book.borrows[0].returned);
  return [ isOut, isIn ]
}

function getBorrowersForBook(book, accounts) {
  //Create new updated account array
  let updatedAccountArray = []
  //Map the book object
  book.borrows.map(borrow => {
  //With the matching account id
  const account = accounts.find(account => account.id === borrow.id)
  //Returned key/value pair
  account.returned = borrow.returned
  //Add to updated account array up to desired length
  if (updatedAccountArray.length < 10)
    updatedAccountArray.push(account)
  })
  return updatedAccountArray
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
