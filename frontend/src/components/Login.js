import '../styles/Login.css'
import { Button, Input, Image } from "@chakra-ui/react";
import logo from '../assets/logo-dark.png'
import { Link } from 'react-router-dom';
import RegisterModal from './RegisterModal';

export default function Login(){
    const roleUser = 'admin'

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
                    <Link to={roleUser == 'admin' ? '/admin/daftar-buku' : '/daftar-buku'}>
                        <Button colorScheme={'#112B3C'}>Login</Button>
                    </Link>
                </div>
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