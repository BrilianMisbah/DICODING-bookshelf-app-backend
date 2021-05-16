const {
  addBookHandler,
  getBooksHandler,
  getBooksByIdHandler,
  editBooksByIdHandler,
  deleteBooksByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBooksByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBooksByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBooksByIdHandler,
  },
  // {
  //   method: 'GET',
  //   path: '/books/{name?}',
  //   handler: getAllBooksByNameHandler,
  // },
  // {
  //   method: 'GET',
  //   path: '/books/{reading?}',
  //   handler: getAllBooksByReadingHandler,
  // },
  // {
  //   method: 'GET',
  //   path: '/books/{finished?}',
  //   handler: getAllBooksByFinishedHandler,
  // },
];

module.exports = routes;
