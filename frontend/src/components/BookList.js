import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { getBookLists } from '../api/bookLists';
import '../styles/BookList.css'

export default function BookList(){
    const loc = useLocation()
    const pathName = loc.pathname
    const splitPath = pathName.split('/')
    
    let link = '/user/buku/detail';
    let user = '';

    if(splitPath[1] === 'admin'){
        user = 'admin'
        link = '/admin/buku/detail'
    };

    const [productActive, setProductActive] = useState('all')

    // API GET BOOK LISTS
    const [ bookLists, setBookLists ] = useState([]);

    const loadBookLists = async () =>{
        const booksData = await getBookLists()
        setBookLists(booksData.items)
    }

    useEffect(() => {
        loadBookLists();
        // console.log(bookLists);
    }, []);

    return(
        <div className='container-bookList'>
            {user ?
                <>
                    <div className='nav-buku-admin'>
                        <Button 
                            color = {productActive === 'all' ? '#1DC9A1' : 'black'}
                            onClick = {() => setProductActive('all')}
                        >
                            Semua Produk
                        </Button> 
                        
                        <Button 
                            color={productActive === 'show' ? '#1DC9A1' : 'black'}
                            onClick = {() => setProductActive('show')}
                        >
                            Produk Ditampilkan
                        </Button>
                        
                        <Button 
                            color={productActive === 'arsip' ? '#1DC9A1' : 'black'}
                            onClick = {() => setProductActive('arsip')}
                        >
                            Produk Diarsipkan
                        </Button>

                        <Button 
                            color={productActive === 'donate' ? '#1DC9A1' : 'black'}
                            onClick = {() => setProductActive('donate')}
                        >
                            Produk Donasi
                        </Button>

                        <div className='btn-green'>
                            <Link to={'/admin/buku/tambah'}>
                                <Button>Tambah Produk</Button>
                            </Link>
                        </div>
                    </div>
                    <hr/>
                </>
                : null}

            <div className='book-items'>
                {bookLists.map((item, index)=>{
                    return(
                        <Link to={link} key={item.id}>
                            <div className='card'>
                                <img src={item.volumeInfo.imageLinks.thumbnail}/>
                                <div className='detail'>
                                    <div className='author-showing'>
                                        <div className='author'>
                                            <h3><b>{item.volumeInfo.authors ? item.volumeInfo.authors[0] : ''}</b></h3> 
                                        </div>
                                        {user=='admin' ? <h3>{item.saleInfo.isEbook ? 'Tampil' : 'Arsip'}</h3> : ''}
                                    </div>
                                    <div className='title'>
                                        <h2>{item.volumeInfo.title}</h2>
                                    </div>
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