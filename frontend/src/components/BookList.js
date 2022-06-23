import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import '../styles/BookList.css'

export default function BookList(){
    let items = ['Item 1','Item 2','Item 3','Item 4','Item 5',
                'Item 1','Item 2','Item 3','Item 4','Item 5',
                'Item 1','Item 2','Item 3','Item 4','Item 5'];

    const loc = useLocation()
    const pathName = loc.pathname
    const splitPath = pathName.split('/')
    
    let link = '/daftar-buku/detail';
    let user = '';

    if(splitPath[1] == 'admin'){
        user = 'admin'
        link = '/admin/daftar-buku/detail'
    };

    const [productActive, setProductActive] = useState('all')
    
    return(
        <div className='container-bookList'>
            {user ?
                <>
                    <div className='nav-buku-admin'>
                        <Button 
                            color = {productActive == 'all' ? '#1DC9A1' : 'black'}
                            onClick = {() => setProductActive('all')}
                        >
                            Semua Produk
                        </Button> 
                        
                        <Button 
                            color={productActive == 'show' ? '#1DC9A1' : 'black'}
                            onClick = {() => setProductActive('show')}
                        >
                            Produk Ditampilkan
                        </Button>
                        
                        <Button 
                            color={productActive == 'arsip' ? '#1DC9A1' : 'black'}
                            onClick = {() => setProductActive('arsip')}
                        >
                            Produk Diarsipkan
                        </Button>

                        <Button 
                            color={productActive == 'donate' ? '#1DC9A1' : 'black'}
                            onClick = {() => setProductActive('donate')}
                        >
                            Produk Donasi
                        </Button>

                        <div className='btn-green'>
                            <Button>Tambah Produk</Button>
                        </div>
                    </div>
                    <hr/>
                </>
                : null}

            <div className='book-items'>
                {items.map((item, idx)=>{
                    return(
                        <Link to={link}>
                            <div className='card'>
                                <img src='https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif'/>
                                <div className='detail'>
                                    <div className='writer-show'>
                                        <h3><b>Nama Penulis</b></h3>
                                        {user ? <h3>Tampil</h3> : ''}
                                    </div>
                                    <h2>Judul Buku</h2>
                                    <h2 className='green'>Rp. 00.000</h2>
                                    {user ? <h3>300 Terjual</h3> : ''}
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
            
        </div>
    )
}