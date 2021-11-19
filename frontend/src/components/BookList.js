import { useEffect, useState } from 'react';
import bookService from '../Services/bookServices';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';

const BookList = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    init();
  }, [])

//Printing All Book Details
  const init = () => {
    bookService.getAll()
    .then(response => {
      console.log('printing the book data', response.data);
      setBooks(response.data);
    })
    .catch(error => {
      console.log('Something went wrong', error);
    })
  }

  //Deleting a record
  const handleDelete = id => {
      bookService.remove(id)
      .then(response=>{
          console.log('Book deleted successfully',response.data);
          init();
      })
      .catch(error =>{
          console.log('Something went wrong',error);
      })
  }

  return (
    <div className='container'>
      <h3 className='text-center'>Book List</h3>
      <hr/>
      <Link to='/add' className='btn btn-warning mb-2'>Add Book</Link>
      <div>
        <table border="1" cellPadding="10" className='table table-striped table-bordered'>
          <thead className='thead-dark'>
          <tr>
            <th>Author name</th>
            <th>Book name</th>
            <th>Quantity Available</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {
            books.map(book => (
              <tr key={book.id}>
                <td>{book.author}</td>
                <td>{book.bookName}</td>
                <td>{book.quantity}</td>
                <td>{book.price}</td>
                <td>
                    <Link className="btn btn-info" to={`/books/edit/${book.id}`}>Update</Link>
                    <button className='btn btn-danger ml-2' onClick={(e)=>{
                        handleDelete(book.id)
                    }}>Delete</button>
                </td>
              </tr>
            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookList;