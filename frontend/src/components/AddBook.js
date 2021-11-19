import React, { useState, useEffect } from "react";
import bookServices from "../Services/bookServices";
import { useNavigate, useParams } from "react-router";
import { Link } from 'react-router-dom'

const AddBook = () => {

    const [author, setAuthor] = useState('');
    const [bookName, setBookName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();


    //Add or update a book details in database
    const saveBook = (e) => {
        e.preventDefault();

        const book = { author, bookName, quantity, price, id };
        //update book details according to a particular id
        if (id) {
            bookServices.update(book)
                .then(response => {
                    console.log('Book updated successfully', response.data);
                    navigate('/');
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
        //save a new record
        else {
            bookServices.create(book)
                .then(response => {
                    console.log('Book has been added', response.data);
                    navigate('/');
                })
                .catch(error => {
                    console.log("Something went wrong", error);
                });
        }
    }

    //Get data from database when a book detail is updating
    useEffect(() => {
        if (id) {
            bookServices.get(id)
                .then(book => {
                    setAuthor(book.data.author);
                    setBookName(book.data.bookName);
                    setQuantity(book.data.quantity);
                    setPrice(book.data.price);
                })
                .catch(error => {
                    console.log('Something went wrong', error);
                })
        }
    }, [])

    return (
        <div className='container'>
            <h3 style={{ marginTop: "70px" }}>Add New Book</h3>
            <hr />

            <form >
                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control col-4'
                        id='name'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder='Author Name'
                    />
                </div >
                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control col-4'
                        id='bookName'
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        placeholder='Book Name'
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control col-4'
                        id='name'
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder='Quantity'
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        className='form-control col-4'
                        id='price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder='Price'
                    />
                </div>
                <div>
                    <button className='btn btn-success' onClick={(e) => saveBook(e)}>Save</button>
                    <Link to='/'><button className='btn btn-danger' style={{ marginLeft: "10px" }}>Cancel</button></Link>
                </div>
            </form>


        </div>
    );
}

export default AddBook;