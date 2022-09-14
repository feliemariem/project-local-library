function findAccountById(accounts, id) {
  let matchedAccount = {};
  for (let account in accounts) {
      account = accounts[account];
      const accountId = account.id; 
      if (accountId === id) {
          matchedAccount = account;
      }
  }
  return matchedAccount;  
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountsA, accountsB) => accountsA.name.last.toLowerCase() > accountsB.name.last.toLowerCase() ? 1 : -1);
}

function getTotalNumberOfBorrows(account, books) {
  // Go through each book using reduce method
  return books.reduce((total, book) => {
    // increase accumulator each time account appears in transaction list
    book.borrows.some(borrow => borrow.id === account.id) ? total++ : total += 0
    return total
  }, 0)
}

function getBooksPossessedByAccount(account, books, authors) {
  /* Filter out an array of books that are currently loaned out to an account */
  let booksPossessed = books.filter((book) =>
    book.borrows[0].returned === false && 
    book.borrows[0].id === account.id)
  //Map out a new object array, adding the author key and object to basic book object
  let booksWithAuthor = booksPossessed.map((book) => ({
    ...book,
    author: authors.find((author) => author.id === book.authorId)
  }))
  //Return modified object array
  return booksWithAuthor
}

 

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
