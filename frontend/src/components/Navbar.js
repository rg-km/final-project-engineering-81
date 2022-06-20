import '../styles/Navbar.css'
import logo from '../assets/logo-light.png'
import { Link } from 'react-router-dom'



export default function Navbar(){
    return(
        <div className="navbar-container">
            <Link to={'/daftar-buku'}>
                <div className='title'>
                    <img src={logo}/>
                    <p>BukuKita</p>
                </div>
            </Link>

            <div className='tools'>
                <Link to={'/keranjang'}>
                    <i className="bi bi-cart3"></i>
                </Link>
                <img src='https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif'/>
            </div>
        </div>
    )
}