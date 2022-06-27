import '../styles/Navbar.css'
import logo from '../assets/logo-light.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { logout } from '../api/account'
import { useCookies } from 'react-cookie';
import { useContext, useEffect } from 'react'
import { SessionContext } from '../context/SessionContext'
import useAccountStore from '../store/accountStore'
import useCartStore from '../store/cartStore'


export default function Navbar(){
    const setIsLoggedIn = useContext(SessionContext).setIsLoggedIn
    const account = useAccountStore().account

    const removeAccount = useAccountStore((state) => state.removeAccount)
    const removeCart = useCartStore((state) => state.removeCart)


    const [cookies, setCookie, removeCookie] = useCookies(['token'])
    const navigate = useNavigate()

    const handleLogedOut = async() => {
        const logoutAccount = await logout(cookies)
        setIsLoggedIn(false)
        removeCookie('token')
        removeAccount()
        removeCart()
        navigate('/', {replace:true})
    } 

    return(
        <div className="navbar-container">
            <Link to={`${account.role}/buku`}>
                <div className='title'>
                    <img src={logo} alt="logo"/>
                    <p>BukuKita</p>
                </div>
            </Link>

            <div className='tools'>
                {account.role === 'admin' 
                    ?
                    <>
                        <Link to={`/${account.role}/pesanan`}>
                            <i className="bi bi-card-list"></i>
                        </Link>
                        <Button onClick={handleLogedOut}>
                            <i className="bi bi-box-arrow-right"></i>
                        </Button>
                    </>
                    :
                    <>
                        <Link to={`/${account.role}/keranjang`}>
                            <i className="bi bi-cart3"></i>
                        </Link>
                        
                        <Link to={`/${account.role}/akun`}>
                            <img src='https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif' alt='user'/>
                        </Link>
                    </>
                }
            </div>
        </div>
    )
}