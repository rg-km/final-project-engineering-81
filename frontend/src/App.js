import React from 'react';
import './App.css';
import BookList from './components/BookList';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom'
import BookDetail from './components/BookDetail';
import Footer from './components/Footer';
import Cart from './components/Cart';
import AccountUser from './components/AccountUser';
import Checkout from './components/Checkout';
import AddBook from './components/AddBook';
import accountStore from './store/accountStore';

function App() {
  const loc = useLocation()
  const pathName = loc.pathname;

  // const isLoggedIn = 

  return (
    <div className='App'>
      {/* Navbar */}
      {
        pathName === '/' ? null 
        : 
        <Navbar/>
      }


      <Routes>
        {/* Login */}
        <Route path='/' element={ <Login/> }/>

        {/* USER */}
        <Route path='user'>
          {/* daftar buku */}
          <Route path='buku'>
            <Route index element={ <BookList/> } />
            <Route path='detail' element={ <BookDetail/> } />
          </Route>
          
          {/* Keranjang */}
          <Route path='keranjang' element={ <Cart/> }/>
          <Route path="akun" element={<AccountUser />} />
          {/* CHECKOUT */}
          <Route path='checkout' element={ <Checkout/> }/>
        </Route>


        {/* ADMIN */}
        <Route path='admin'>
          {/* DAFTAR BUKU */}
          <Route path='buku'>
            <Route index element={ <BookList/> } />

            <Route path='detail' element={ <BookDetail/> } />

            <Route path='tambah' element={ <AddBook/> }/>
          </Route>
        </Route>
        {/* END ADMIN */}

      </Routes>


      {/* Footer */}
      {
        pathName === '/' ? null 
        : 
        <Footer/>
      }
    </div>
  );
}

export default App;
