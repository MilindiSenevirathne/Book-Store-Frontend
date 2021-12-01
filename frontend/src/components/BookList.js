import { useEffect, useState } from 'react';
import bookService from '../Services/bookServices';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap'


const BookList = () => {

  const [books, setBooks] = useState([]);
  const history = useNavigate();

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
      .then(response => {
        console.log('Book deleted successfully', response.data);
        init();
      })
      .catch(error => {
        console.log('Something went wrong', error);
      })
  }

  

  function BookDetails(id) {
    history(`/books/edit/get/${id}`);
  }

  return (
    <div className='container'>
      <h3 className='text-center'>Book List</h3>
      <hr />
      <div>
        <table border="1" cellPadding="10" className='table table-striped table-bordered'>
          <thead >
            <tr className='tr-expand-md tr-dark bg-dark' style={{ color: "white", fontSize: "18px", textAlign: "center" }}>
              <th>Book name</th>
              <th>Author name</th>
              <th>Quantity Available</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              books.map(book => (
                <tr key={book.id}>
                  <td onClick={() => BookDetails(book.id)}>{book.bookName}</td>
                  <td onClick={() => BookDetails(book.id)}>{book.authorName}</td>
                  <td onClick={() => BookDetails(book.id)}>{book.quantity}</td>
                  <td onClick={() => BookDetails(book.id)}>{book.price}</td>
                  <td>
                    <Link className="btn btn-info" to={`/books/edit/${book.id}`} style={{ marginLeft: "40px" }} >Update</Link>
                    <Button variant="danger" onClick={(e) => {
                      handleDelete(book.id)
                    }} style={{ marginLeft: "20px" }}>Delete</Button>
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