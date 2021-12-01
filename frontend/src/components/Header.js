import React from "react";
import { Link } from "react-router-dom";


const Header = () => {
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{
                    "width": "100%",
                    "position": "fixed",
                    "left": "0",
                    "top": "0"
                }}>
                    <div>
                        <img src="book-stack-16.png" height="25px" style={{ marginLeft: "20px" }} />
                        <a href="https://www.linkedin.com/in/milindi-senevirathne/" className="navbar-brand"
                            style={{ "marginLeft": "10px" }}>Books Store Management System</a>
                    </div>
                    <div style={{ color: "white", marginLeft: "850px" }}><Link to="/add" className='btn btn-warning'>Add Book</Link></div>
                </nav>
            </header>
        </div>
    );
}

export default Header;