import '../styles/Navbar.css'
import logo from '../assets/logo-light.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { logout } from '../api/account'
import { useCookies } from 'react-cookie';
import { useContext, useEffect } from 'react'
import { SessionContext } from '../context/SessionContext'
import useAccountStore from '../store/accountStore'


export default function Navbar(){
    const isLoggedIn = useContext(SessionContext).isLoggedIn
    const setIsLoggedIn = useContext(SessionContext).setIsLoggedIn
    const addDataUser = useAccountStore((state)=>state.addAccount)
    const {account} = useAccountStore()
    const removeAccount = useAccountStore((state) => state.removeAccount)
    const navigate = useNavigate()

    const loc = useLocation()
    const pathName = loc.pathname
    const splitPath = pathName.split('/')
    
    let link = '/user/buku';
    let user = '';

    if(splitPath[1] === 'admin'){
        user = 'admin'
        link = '/admin/buku'
    };

    const [cookies, setCookie, removeCookie] = useCookies(['token'])

    const handleLogedOut = async() => {
        const logoutAccount = await logout(cookies)
        setIsLoggedIn(false)
        removeCookie('token')
        removeAccount()
    } 

    useEffect(()=>{
        if (!isLoggedIn){
            navigate('/')
        }
    },[isLoggedIn])

    return(
        <div className="navbar-container">
            <Link to={link}>
                <div className='title'>
                    <img src={logo} alt="logo"/>
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
                        <Button onClick={handleLogedOut}>
                            <i className="bi bi-box-arrow-right"></i>
                        </Button>
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