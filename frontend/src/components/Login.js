import '../styles/Login.css'
import { Button, Input, Image } from "@chakra-ui/react";
import logo from '../assets/logo-dark.png'
import { Link } from 'react-router-dom';
import RegisterModal from './RegisterModal';
import { useState } from 'react';
import axios from "axios";

export default function Login(){
    // This should already be declared in your API file
    // var app = express();

    // // ADD THIS
    // var cors = require('cors');
    // app.use(cors());


    const roleUser = 'admin'

    const [formLogin, setFormLogin] = useState({});

    const handleOnChange = (e) =>{
        const { name, value } = e.target
        setFormLogin((prevValues) => ({
            ...prevValues,
            [name] : value,
        }))
        console.log(formLogin);
    }

    
    const handleFormLogin = async () => {
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
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="container">
            <div className='left'>
                <div className='welcome'>
                    Welcome Back
                </div>

                <form>
                    <div className='inputLogin'>
                        <p>Email</p>
                        <Input 
                        placeholder='Enter Your Email'
                        type='text'
                        name='email'
                        onChange={handleOnChange}
                        value={formLogin.email ? formLogin.email : ''}
                        />

                        <p>Password</p>
                        <Input 
                        placeholder='Password' 
                        type='password'
                        name='password'
                        onChange={handleOnChange}
                        
                        />
                    </div>
                
                    <div className='btnLogin'>
                        {/* <Link to={roleUser == 'admin' ? '/admin/buku' : '/user/buku'}> */}
                            <Button 
                            colorScheme={'#112B3C'}
                            onClick={handleFormLogin}
                            // type='submit'
                            >
                                Login
                            </Button>
                        {/* </Link> */}
                    </div>
                </form>
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