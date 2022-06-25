import '../styles/Login.css'
import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import logo from '../assets/logo-dark.png'
import { useNavigate } from 'react-router-dom';
import RegisterModal from './RegisterModal';
import { useState } from 'react';
import { getLogin } from '../api/login';

export default function Login(){
    const navigate =  useNavigate()
    const [formLogin, setFormLogin] = useState({})
    const [error, setError] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormLogin((prevValues)=>({
            ...prevValues,
            [name] : value,
        }))
        setError(false)
    }
    
    const handleLogin = async event =>{
        event.preventDefault();

        const accessLogin = await getLogin(formLogin)
        if(accessLogin){
            // setIsLoggedIn(true)
            console.log(accessLogin);
        } else{
            setError('Invalid Email or Password')
        }
    }

    if(isLoggedIn){
        if(formLogin.email == 'admin'){
            navigate('/admin/buku')
        } else if (formLogin.email == 'user'){
            navigate('/user/buku')
        }
    }

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
