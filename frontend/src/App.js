import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AddBook from "./components/AddBook";
import BookList from "./components/BookList";
import NotFound from "./components/NotFound";
import Header from './components/Header'
import Footer from "./components/Footer";
import BookDetails from "./components/BookDetails";

function App() {
  return (
    <BrowserRouter>

      <div className="container">
        <Header />
        <Routes>
          <Route exact path='/' element={<BookList />} />
          <Route path='/add' element={<AddBook />} />
          <Route path='/books/edit/:id' element={<AddBook />} />
          <Route path='/books/edit/get/:id' element={<BookDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>

      </div>
      <Footer />
    </BrowserRouter>

  )
}

export default App;