import '../styles/Login.css'
import { Alert, AlertIcon, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import logo from '../assets/logo-dark.png'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import RegisterModal from './RegisterModal';
import axios from "axios"
import { useEffect, useState } from 'react';
import { testGetLogin } from '../api/login';

export default function Login(){
    const navigate =  useNavigate()
    const [formLogin, setFormLogin] = useState({})
    const [error, setError] = useState('asa')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = async()=>{
        try {
            const getLogin = await axios.post(
                "http://localhost:8080/api/user/login",
                {
                    email : "ruben@gmail.com",
                    password : "ruben123"
                },
                {
                  headers: {
                    "Access-Control-Allow-Origin" : "*",
                  },
                  withCredentials: true,
                }
              )
            console.log("getLogin");
            return (getLogin)
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormLogin((prevValues)=>({
            ...prevValues,
            [name] : value,
        }))
    }
    
    const testHandleLogin = async event =>{
        event.preventDefault();
        
        try {
            await testGetLogin(formLogin.email, formLogin.password)
            setIsLoggedIn(true)
        } catch (error) {
            console.log("Login gagal");
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
                <form onSubmit={testHandleLogin}>
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
