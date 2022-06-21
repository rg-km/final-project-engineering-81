import './App.css';
import BookList from './components/BookList';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom'
import BookDetail from './components/BookDetail';
import Footer from './components/Footer';
import Cart from './components/Cart';
import AccountUser from './components/AccountUser';
// import Checkout from './components/Checkout';

function App() {
  const loc = useLocation()
  const pathName = loc.pathname;

  return (
    <div className='App'>
      {/* Navbar */}
      {
        pathName == '/' ? null 
        : 
        <Navbar/>
      }


      <Routes>
        {/* Login */}
        <Route path='/' element={ <Login/> }/>

        {/* daftar buku */}
        <Route path='daftar-buku'>
          <Route index element={ <BookList/> } />

          <Route path='detail' element={ <BookDetail/> } />
        </Route>

        {/* Keranjang */}
        <Route path='keranjang' element={ <Cart/> }/>

        {/* CHECKOUT */}
        {/* <Route path='checkout' element={ <Checkout/> }/> */}

        < Route exact path="/account" element={<AccountUser />} />

      </Routes>


      {/* Footer */}
      {
        pathName == '/' ? null 
        : 
        <Footer/>
      }
    </div>
  );
}

export default App;
