import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getBooksDetail } from '../api/bookLists'
import useAccountStore from '../store/accountStore'
import useCartStore from '../store/cartStore'
import '../styles/BookDetail.css'


export default function BookDetail(){
    const [ detailBook, setDetailBook ] = useState()
    const { id } = useParams()
    const dataAccount = useAccountStore().account

    const addToCart = useCartStore((state) => state.addCart)
    const location = useLocation()
    const price = location.state

    const loadBookDetail = async () =>{
        const bookDetail = await getBooksDetail(id)
        if(bookDetail.data){
            setDetailBook(bookDetail.data)
            // console.log(bookDetail);
        }
    }

    useEffect(()=>{
        loadBookDetail()
        // console.log(detailBook);
    }, [])

    return(
        <div className='container-bookDetail'>
            {
                detailBook ?
                <>
                    <div className='detail-left'>
                        <div className='detail-img'>
                            <img src={detailBook.volumeInfo.imageLinks.thumbnail}/>
                        </div>
                    </div>

                    <div className='detail-center'>
                        <h1 className='title'>{detailBook.volumeInfo.title}</h1>
                        <p className='writer'>{detailBook.volumeInfo.authors}</p>
                        <div className='price'>
                            <h1>Rp. {price}</h1> Stock : 100 &emsp; &emsp; Terjual:10
                        </div>

                        <hr/>

                        <div className='desc'>
                            <h2>Deskripsi</h2>
                            {`${detailBook.volumeInfo.description}`}
                        </div>

                        <div className='detail'>
                            <h2>Detail</h2>
                            <div className='book-detail'>
                                <div>
                                    <h4>Kondisi</h4>
                                    <h3>Baru</h3>
                                    <h4>Berat</h4>
                                    <h3>0.25 Kg</h3>
                                    <h4>Jumlah Halaman</h4>
                                    <h3>{detailBook.volumeInfo.printedPageCount}</h3>
                                    <h4>ISBN</h4>
                                    <h3>{detailBook.volumeInfo.industryIdentifiers?.identifier}</h3>
                                </div>
                                <div>
                                    <h4>Tahun Terbit</h4>
                                    <h3>{detailBook.volumeInfo.publishedDate}</h3>
                                    <h4>Penerbit</h4>
                                    <h3>{detailBook.volumeInfo.publisher}</h3>
                                    <h4>Bahasa</h4>
                                    <h3>{detailBook.volumeInfo.language}</h3>
                                    <h4>Kategori Buku</h4>
                                    <h3>{detailBook.volumeInfo.categories}</h3>
                                </div>
                            </div>
                        </div>

                        <div className='donatur'>
                            <h2>Donatur</h2>
                            <div className='donatur-detail'>
                                <div>
                                    <h4>Nama Donatur</h4>
                                    <h3>Nama Donatur</h3>
                                </div>
                                <div>
                                    <h4>Tanggal Donasi</h4>
                                    <h3>1 Januari 2022</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='detail-right'>
                        <div className='buy-card'>
                            <h3 className='grey'>Atur jumlah pembelian</h3>
                            <h3>Jumlah Barang</h3>
                            <div className='btn-changeQty'>
                                <Button>-</Button>
                                <h3><b>1</b></h3>
                                <Button>+</Button>
                            </div>
                            {/* <h3><Button>-</Button> <b>1</b> <Button>+</Button></h3> */}
                            <div>
                                <div className='subtotal'>
                                    <div className='grey'>Subtotal</div>
                                    <div>Rp. 00.000</div>
                                </div>

                                <div className='buy-btn'>
                                    <Link to={`/${dataAccount.role}/keranjang`}>
                                        <Button className='keranjang'>Keranjang</Button>
                                    </Link>
                                    <Link to={`/${dataAccount.role}/checkout`}>
                                        <Button className='beli'>Beli Sekarang</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                :
                ''
            }
        </div>
    )
}