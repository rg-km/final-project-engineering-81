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
    const [item, setItem] = useState()
    const [qty, setQty] = useState(1)

    const location = useLocation()
    const price = location.state

    const loadBookDetail = async () =>{
        const getBookDetail = await getBooksDetail(id)
        if(getBookDetail.data){
            setDetailBook(getBookDetail.data)
            setItem({
                id : getBookDetail.data.id,
                title : getBookDetail.data.volumeInfo.title,
                price : price,
                qty : qty,
                img : getBookDetail.data.volumeInfo.imageLinks.thumbnail
            })
        }
    }

    const changeQty = (num) => {
        if(qty === 1 && num < 0){
            setQty(1)
        } else{
            setQty(qty+num)
        }
        setItem({qty:qty})
    }

    const keranjangHandle = () => {
        addToCart(item)
    }

    useEffect(()=>{
        loadBookDetail()
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
                            <h1>Rp. {price}</h1> 
                            {/* Stock : 100 &emsp; &emsp; Terjual:10 */}
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

                    {dataAccount.role === "user" ?
                    
                    <div className='detail-right'>
                        <div className='buy-card'>
                            <h3 className='grey'>Atur jumlah pembelian</h3>
                            <h3>Jumlah Barang</h3>
                            <div className='btn-changeQty'>
                                <Button onClick={() => changeQty(-1)}>-</Button>
                                <h3><b>{qty}</b></h3>
                                <Button onClick={() => changeQty(1)}>+</Button>
                            </div>
                            
                            <div>
                                <div className='subtotal'>
                                    <div className='grey'>Subtotal</div>
                                    <div>Rp. {price * qty}</div>
                                </div>

                                <div className='buy-btn'>
                                    <Button 
                                    className='keranjang'
                                    onClick={keranjangHandle}
                                    >
                                        Keranjang
                                    </Button>

                                    <Link to={`/${dataAccount.role}/checkout`}>
                                        <Button className='beli'>Beli Sekarang</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    '' }
                </>
                :
                ''
            }
        </div>
    )
}