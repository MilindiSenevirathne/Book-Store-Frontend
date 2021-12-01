import { useEffect, useState } from 'react';
import bookServices from "../Services/bookServices";
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { Page, Document, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function ViewInvoice(props) {
    const [numPages, setNumPages] = useState(null);

    function fileType() {

        if (props.fType == 'pdf') {
            return (
                <Document
                    file={`http://localhost:8080/api/v1/books/invoice/${props.id}`}
                    onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    className="dc"
                    style={{ height: "100%", width: "100%" }}
                >
                    {Array.apply(null, Array(numPages))
                        .map((x, i) => i + 1)
                        .map(page => <Page pageNumber={page} />)}
                </Document>
            )
        }
        else {
            return <img src={`http://localhost:8080/api/v1/books/invoice/${props.id}`} className="dc" style={{ height: "100%", width: "100%" }} />
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                {fileType()}
            </Modal.Body>
            <Modal.Footer><a href={`http://localhost:8080/api/v1/books/invoice/${props.id}`} class="btn btn-success" >Download</a><Button onClick={props.onHide} class="btn btn-danger" style={{ backgroundColor: "#dc3545", borderColor: "#dc3545" }} >Cancel</Button></Modal.Footer>
        </Modal>
    );
}

function BookDetails() {

    const { id } = useParams();
    const [books, setBook] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [fType, setFType] = useState('');

    useEffect(() => {
        bookServices.get(id)
            .then((response) => {
                response.data.invoicePath = "http://localhost:8080/img/" + response.data.invoicePath;
                console.log(response.data);
                setBook(response.data);
            })
            .catch(error =>
                console.log(error))
    }, [id])

    function fileType(){
        let fType=books.invoicePath.split(".")[1];
        setFType(fType);
    }

    return (
        <div style={{ padding: "70px" }} >
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
                        <td><Button variant="outline-info" onClick={() => { setModalShow(true); fileType(); }}>View Invoice</Button></td>
                    </tr>
                </tbody>

            </table>
            <ViewInvoice
                show={modalShow}
                onHide={() => setModalShow(false)}
                id={id}
                fType={fType}
            />


            <Link to='/' className="btn btn-info" >Back</Link>
            <Link to={`/books/edit/get/${books.id - 1}`} className='btn btn-danger ml-2' style={{ marginLeft: "10px" }}>Previous</Link>
            <Link to={`/books/edit/get/${books.id + 1}`} className='btn btn-warning ml-2' style={{ marginLeft: "10px" }}>Next</Link>

        </div>
    )

}


export default BookDetails;