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
        <div style={{padding:"70px"}} >
             <table className="table table-bordered" style={{ marginTop: "30px" }}>
                <tbody style={{ color: "white", fontSize: "18px" }} className="bg-dark">
                    <tr >
                        <td className="tb" style={{ paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold" }}>Book Name :</td>
                        <td style={{ paddingTop: "10px", paddingBottom: "10px" }}>{books ? books.bookName : null}</td>
                    </tr>
                    <tr>
                        <td className="tb" style={{ paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold" }}>Author :</td>
                        <td style={{ paddingTop: "10px", paddingBottom: "10px" }}>{books ? books.authorName : null}</td>
                    </tr>
                    <tr>
                        <td className="tb" style={{ paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold" }}>Price :</td>
                        <td style={{ paddingTop: "10px", paddingBottom: "10px" }}>{books ? books.price : null}</td>
                    </tr>
                    <tr>
                        <td className="tb" style={{ paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold" }}>Quantity :</td>
                        <td style={{ paddingTop: "10px", paddingBottom: "10px" }}>{books ? books.quantity : null}</td>
                    </tr>
                    <tr>
                        <td className="tb" style={{ paddingTop: "10px", paddingBottom: "10px", fontWeight: "bold" }}>Invoice :</td>
                        <td><a href={books ? books.invoicePath : null}><img alt="invoice" style={{ width: "200px", height: "200px" ,border:"2px solid yellow" }} src={books ? books.invoicePath : null} /></a></td>
                    </tr>
                </tbody>

            </table>
        <Link to='/' className="btn btn-info">Back</Link>
        <Link to={`/books/edit/get/${books.id-1}` } className='btn btn-danger ml-2'>Previous</Link>
        <Link to={`/books/edit/get/${books.id+1}` } className='btn btn-warning ml-2'>Next</Link>

        </div>
    )

}


export default BookDetails;