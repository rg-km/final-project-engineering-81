import '../styles/Navbar.css'
import logo from '../assets/logo-light.png'
import { Link, useLocation } from 'react-router-dom'



export default function Navbar(){
    const loc = useLocation()
    const pathName = loc.pathname
    const splitPath = pathName.split('/')
    
    let link = '/user/buku';
    let user = '';

    if(splitPath[1] === 'admin'){
        user = 'admin'
        link = '/admin/buku'
    };

    return(
        <div className="navbar-container">
            <Link to={link}>
                <div className='title'>
                    <img src={logo}/>
                    <p>BukuKita</p>
                </div>
            </Link>

            <div className='tools'>
                {user === 'admin' 
                    ?
                    <>
                        <Link to={'/admin/pesanan'}>
                            <i className="bi bi-card-list"></i>
                        </Link>
                    </>
                    :
                    <>
                        <Link to={'/user/keranjang'}>
                            <i className="bi bi-cart3"></i>
                        </Link>
                        
                        <Link to={'/user/akun'}>
                            <img src='https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif' alt='user'/>
                        </Link>
                    </>
                }
            </div>
        </div>
    )
}