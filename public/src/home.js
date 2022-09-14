function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let isBorrowed = books.filter(book => book.borrows[0].returned === false)
  return isBorrowed.length
}

//Helper function 
function topFive(list) {
  let topFive = list.sort((Former, Latter) => 
  Latter.count - Former.count)
  topFive.length = 5
  return topFive
}


function getMostCommonGenres(books) {
  let genres = books.reduce((total, book) => {
    total[book.genre] != null ? 
    total[book.genre].count++ : 
    total[book.genre] = {name: book.genre, count:1}
    return total
  }, {})
  let genreList = Object.keys(genres)
    .map(genre => genres[genre])
  return topFive(genreList)
}

function getMostPopularBooks(books) {
  let titleList = books.map(book => {
    return {
      name: book.title,
      count: book.borrows.length
   }
  })
  return topFive(titleList)
}

function getMostPopularAuthors(books, authors) {
  //Establish list
  let authorList = []
  //Loop through authors to
  for (let author in authors) {
    //Gather an array of books by that author
    const authoredBooks = books.filter((book) => {
      return book.authorId === authors[author].id
    })
    //Reduce borrows length of authored books into a count of all borrows
    const totalBorrows = authoredBooks.reduce((total, book) => {
      return total + book.borrows.length
    }, 0)
    //Push an object containing authors name and total 
    //borrows count into established list
    const authorName = authors[author].name
    authorList.push({
      name: `${authorName.first} ${authorName.last}`,
      count: totalBorrows
    })
  }
  //Run through topFive to return most popular authors
  return topFive(authorList)
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
