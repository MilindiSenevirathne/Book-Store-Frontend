import React, { useState, useEffect } from "react";
import BookService from "../Services/bookServices";
import { Navigate, useNavigate, useParams } from "react-router";
import { Link } from 'react-router-dom'


const AddBook = () => {

    
    const [bookName, setBookName] = useState('')
    const [authorName, setAuthorName] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [invoice, setInvoice] = useState();
    const history = useNavigate();
    const { id } = useParams();

    
    useEffect(() => {

        BookService.get(id).then((response) => {
            setBookName(response.data.bookName)
            setAuthorName(response.data.authorName)
            setQuantity(response.data.quantity)
            setPrice(response.data.price)
            setInvoice(response.data.invoice)
        }).catch(error => {
            console.log(error)
        })
    }, [id])

    function saveBook(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("bookName", bookName);
        formData.append("authorName", authorName);
        formData.append("price", price);
        formData.append("quantity", quantity);
        formData.append("file", invoice)

        //const book ={bookName,authorName,price,quantity,invoice}
        if (id) {
            BookService.update(id, formData).then((response) => {
                console.log(response.data);
                history('/');
            }).catch(error => {
                console.log(error)
            })

        }else{
            console.log(formData);
            BookService.create(formData).then((response) => {
                console.log(response.data);
                history('/');
            })
                .catch(error => console.log(error))
        }
    }


    




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
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        // defaultValue={data.authorName}
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
                <div className='form-group'>
                    <input
                          type="file" 
                          name="file"
                          onChange={(e)=>setInvoice(e.target.files[0])}
                    />
                </div>
                <div>
                    <button className='btn btn-success' type="submit" onClick={(e)=>saveBook(e)}>Save</button>
                    <Link to='/'><button className='btn btn-danger' style={{ marginLeft: "10px" }}>Cancel</button></Link>
                </div>
            </form>


        </div>
    );
}

export default AddBook;