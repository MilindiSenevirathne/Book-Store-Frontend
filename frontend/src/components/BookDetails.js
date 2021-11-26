import { useEffect, useState } from 'react';
import bookServices from "../Services/bookServices";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';

function BookDetails(){
    
    const { id } = useParams();
    const [books, setBook] = useState([]);

    useEffect(()=>{
        bookServices.get(id)
        .then((response)=>{
            response.data.invoicePath = "http://localhost:8080/img/" + response.data.invoicePath;
            console.log(response.data);
            setBook(response.data);
        })
        .catch(error=>
            console.log(error))
    },[id])

    return(
        <div style={{padding:"70px"}}>
            <div>
            <h3 >Author name: <span style={{fontWeight:"lighter"}} className="text-info">{books?books.authorName:null}</span></h3>
        </div>
        <div>
            <h3 >Book name: <span style={{fontWeight:"lighter"}} className="text-info">{books?books.bookName:null}</span></h3>
        </div>
        <div>
            <h3 >Available Quantity: <span style={{fontWeight:"lighter"}} className="text-info">{books?books.quantity:null}</span></h3>
        </div>
        <div>
            <h3 >Price: <span style={{fontWeight:"lighter"}} className="text-info">{books?books.price:null}</span></h3>
        </div>
        <div>
            <h3 >Invoice: <span ><a href={books ? books.invoicePath : null}><img alt="invoice" style={{ width: "200px", height: "200px" }} src={books ? books.invoicePath : null} /></a></span></h3>
        </div>
        <Link to='/' className="btn btn-info">Back</Link>
        <Link to={`/books/edit/get/${books.id-1}` } className='btn btn-danger ml-2'>Previous</Link>
        <Link to={`/books/edit/get/${books.id+1}` } className='btn btn-warning ml-2'>Next</Link>

        </div>
    )

}


export default BookDetails;