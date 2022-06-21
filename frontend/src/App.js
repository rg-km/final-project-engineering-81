import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'

import AccountUser from './components/AccountUser';

function App() {
  const location = useLocation();

  return (
      <Routes location={location} key={location.pathname}>
        < Route exact path="/account" element={<AccountUser />} />
      </Routes>

  );
}

export default App;
