import '../styles/Navbar.css'
import logo from '../assets/logo-light.png'



export default function Navbar(){
    return(
        <div className="navbar-container">
            <div className='title'>
                <img src={logo}/>
                <p>BukuKita</p>
            </div>

            <div className='tools'>
                <i class="bi bi-cart3"></i>
                <img src='https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif'/>
            </div>
        </div>
    )
}