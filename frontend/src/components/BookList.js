import { Button } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom'
import { getBookLists } from '../api/bookLists';
import useAccountStore from '../store/accountStore';
import useCartStore from '../store/cartStore';
import '../styles/BookList.css'

export default function BookList(){
    const dataAccount = useAccountStore().account

    const [productActive, setProductActive] = useState('all')

    // API GET BOOK LISTS
    const [ bookLists, setBookLists ] = useState([]);

    const loadBookLists = async () =>{
        const booksData = await getBookLists()
        if(booksData.items){
            setBookLists(booksData.items)
        }
    }

    useEffect(() => {
        loadBookLists();
        // console.log(bookLists);
    }, []);

    return(
        <div className='container-bookList'>
            {dataAccount.role === "admin" ?
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
                    const price = Math.floor(Math.random() * (250000 - 10000 + 1)) + 10000
                    return(
                        <Link to={`/${dataAccount.role}/buku/${item.id}`} key={item.id} state={price}>
                            <div className='card'>
                                <img src={item.volumeInfo.imageLinks.thumbnail}/>
                                <div className='detail'>
                                    <div className='author-showing'>
                                        <div className='author'>
                                            <h3><b>{item.volumeInfo.authors ? item.volumeInfo.authors[0] : ''}</b></h3> 
                                        </div>
                                        {dataAccount.role === 'admin' ? <h3>{item.saleInfo.isEbook ? 'Tampil' : 'Arsip'}</h3> : ''}

                                    </div>
                                    <div className='title'>
                                        <h2>{item.volumeInfo.title}</h2>
                                    </div>
                                    <h2 className='green'>Rp. {price}</h2>
                                    {dataAccount.role === "admin" ? <h3>300 Terjual</h3> : ''}
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
            
        </div>
    )
}