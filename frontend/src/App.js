import React, { useContext } from 'react';
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
import { SessionContext } from './context/SessionContext';
import useAccountStore from './store/accountStore';
import useCartStore from './store/cartStore';

function App() {
  const loc = useLocation()
  const pathName = loc.pathname;
  
  const isLoggedIn = useContext(SessionContext).isLoggedIn
  const dataAccount = useAccountStore().account
  const cartStore = useCartStore()
  // console.log(isLoggedIn);

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

        {isLoggedIn && dataAccount.role ?
        <>
          <Route path={dataAccount.role}>
            {/* daftar buku */}
            <Route path='buku'>
              <Route index element={ <BookList/> }/>
              <Route path=':id' element={ <BookDetail/> } />
              
              {dataAccount.role === 'admin' ? 
                <Route path='tambah' element={ <AddBook/> }/>
                : ''
              }
            </Route>

            {dataAccount.role === 'user' ?
              <>
                {/* Keranjang */}
                <Route path='keranjang' element={ <Cart/> }/>
                <Route path="akun" element={<AccountUser />} />
                {/* CHECKOUT */}
                <Route path='checkout' element={ <Checkout/> }/>
              </>
              : ''
            }
            

          </Route>
        </>
        :
          ''
        }
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
