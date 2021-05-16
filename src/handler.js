const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  // Get var from params
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Prepare books
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const finished = readPage === pageCount;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // Check name is required
  if (typeof name === 'undefined' || name === 'null') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Check readPage
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // Insert
  books.push(newBook);

  // Check is success
  const isSuccess = books.filter((book) => book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  // Default response
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};
// ======================================================================
const getBooksHandler = (request, h) => {
  // Get books with custom var
  const { name, finished, reading } = request.query;
  console.log('Call getBooksHandler');

  if (name) {
    console.log('params name : ', name);
    const bookList = books.filter((entry) => entry.name.toLowerCase().includes(name.toLowerCase()));
    const response = h.response({
      status: 'success',
      data: {
        books: bookList.map((obj) => ({
          id: obj.id,
          name: obj.name,
          publisher: obj.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  if (finished) {
    console.log('params finished : ', finished);
    const bookList = books.filter((entry) => entry.finished === (finished === '1'));
    const response = h.response({
      status: 'success',
      data: {
        books: bookList.map((obj) => ({
          id: obj.id,
          name: obj.name,
          publisher: obj.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  if (reading) {
    console.log('params reading : ', reading);
    const bookList = books.filter((entry) => entry.reading === (reading === '1'));
    const response = h.response({
      status: 'success',
      data: {
        books: bookList.map((obj) => ({
          id: obj.id,
          name: obj.name,
          publisher: obj.publisher,
        })),
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((obj) => ({
        id: obj.id,
        name: obj.name,
        publisher: obj.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};
// ======================================================================
const getBooksByIdHandler = (request, h) => {
  // Get var from params
  const { id } = request.params;

  // Get book object
  const book = books.filter((n) => n.id === id)[0];

  // Get response
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  // Default response
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};
// ======================================================================
const editBooksByIdHandler = (request, h) => {
  // Get var from params
  const { id } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Prepare update date
  const updatedAt = new Date().toISOString();

  // Name is required
  if (typeof name === 'undefined' || name === 'null') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Check readPage
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  // Get books by id
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  // Default response
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
// ======================================================================
const deleteBooksByIdHandler = (request, h) => {
  // Get var from params
  const { id } = request.params;

  // find index books
  const index = books.findIndex((book) => book.id === id);

  // Check index
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  // Default response
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getBooksHandler,
  getBooksByIdHandler,
  editBooksByIdHandler,
  deleteBooksByIdHandler,
};
