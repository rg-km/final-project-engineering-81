import './App.css';
import BookList from './components/BookList';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={ <Login/> }/>

        <Route path='daftarBuku' element={ 
          <>
            <Navbar/>
            <BookList/> 
          </> }
        />
      </Routes>
    </div>
  );
}

export default App;
