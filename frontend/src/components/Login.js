import '../styles/Login.css'
import { Button, Input, Image } from "@chakra-ui/react";
import logo from '../assets/logo-dark.png'
import BookList from './BookList';

export default function Login(){
    return(
        <div className="container">
            <div className='left'>
                <div className='welcome'>
                    Welcome Back
                </div>

                <div className='inputLogin'>
                    <p>Username</p>
                    <Input placeholder='Enter Your Username'/>
                    <p>Password</p>
                    <Input placeholder='Password' type='password'/>
                </div>

                <div className='btnLogin'>
                    <Button colorScheme={'#112B3C'}>Login</Button>
                </div>
            </div>

            <div className='right'>
                BukuKita
                <img src={logo}/>
            </div>
        </div>
    )
}