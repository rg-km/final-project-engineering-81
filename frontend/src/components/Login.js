import '../styles/Login.css'
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import logo from '../assets/logo-dark.png'
import { useNavigate } from 'react-router-dom';
import RegisterModal from './RegisterModal';
import { useContext, useEffect, useState } from 'react';
import { getLogin } from '../api/account';
import useAccountStore from '../store/accountStore';
import { SessionContext } from '../context/SessionContext';
import { useCookies } from 'react-cookie';

export default function Login(){
    const navigate =  useNavigate()
    const [formLogin, setFormLogin] = useState({})
    const [error, setError] = useState()
    const isLoggedIn = useContext(SessionContext).isLoggedIn
    const setIsLoggedIn = useContext(SessionContext).setIsLoggedIn

    const addDataUser = useAccountStore((state)=>state.addAccount)
    const {account} = useAccountStore()

    const [cookies, setCookie] = useCookies(['token'])

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormLogin((prevValues)=>({
            ...prevValues,
            [name] : value,
        }))
    }
    
    const handleLogin = async event =>{
        event.preventDefault();

        const accessLogin = await getLogin(formLogin)
        
        if(accessLogin?.status == 200){
            setIsLoggedIn(true)
            if(accessLogin.data.email == 'ruben@gmail.com'){
                accessLogin.data.role = 'admin'
            } else if(accessLogin.data.email == 'user@gmail.com'){
                accessLogin.data.role = 'user'
            } else if(accessLogin.data.email == 'donatur@gmail.com'){
                accessLogin.data.role = 'donatur'
            }
            addDataUser(accessLogin.data)
            setCookie('token', accessLogin.data.token, { path:'/'})
        } else{
            setError('Invalid Email or Password')
        }
    }

    useEffect(()=>{
        if (isLoggedIn){
            navigate(`${account.role}/buku`, { replace:true })
        }
    },[isLoggedIn])

    return(
        <div className="container">
            <div className='left'>
                <div className='welcome'>
                    Welcome Back
                </div>

                {/* LOGIN FORM */}
                <form onSubmit={handleLogin}>
                    <div className='inputLogin'>
                            {error ?
                                <div className='error'>
                                    <i className="bi bi-exclamation-circle-fill"></i>
                                    {error}
                                </div>
                                    :''
                            }
                        <FormControl isRequired>
                            <div className='test'>

                                <FormLabel>Email</FormLabel>
                            </div>
                            <Input 
                            placeholder='Enter Your Email'
                            type='text'
                            name='email'
                            value={formLogin.email ? formLogin.email : ''}
                            onChange={handleOnChange}
                            />
                        </FormControl>
                        
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input 
                            placeholder='Password' 
                            type='password'
                            onChange={handleOnChange}
                            name='password'
                            />
                        </FormControl>
                    </div>

                    <div className='btnLogin'>
                        <Button 
                        colorScheme={'#112B3C'}
                        type='submit'
                        >
                            Login
                        </Button>
                    </div>
                    
                </form>
                {/* END LOGIN FORM */}

                <div className='btnLogin'>
                    <RegisterModal />
                </div>
            </div>

            <div className='right'>
                BukuKita
                <img src={logo}/>
            </div>
            
        </div>
    )
}
