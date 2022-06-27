import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import '../styles/Cart.css'

export default function Cart(){
    return(
        <div className='cart-container'>
            <div className='cart-left'>
                <div className='cart-title'>Keranjang</div>
                <div className='cart-lists'>
                    {/* START ITEMS */}
                    <div className='cart-item'>
                        <img src='https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif'/>
                        <div className='item'>
                            <h3>BukuKita.com</h3>
                            <h2>Judul Buku</h2>
                            <h3>1 Barang</h3>
                            <h2>Rp. 00.000</h2>
                        </div>
                        <div className='cart-tools'>
                            <i className="bi bi-trash"></i>
                            <h1><Button>-</Button> <b>1</b> <Button>+</Button></h1>
                            <h1 className='price'>Rp. 00.000</h1>
                        </div>
                    </div>
                    <hr/>
                    {/* END ITEMS */}
                </div>
            </div>
            <div className='cart-right'>
                <div className='detail'>
                    <h1>Rincian Belanja</h1>
                    <hr/>
                    <div className='ket'>
                        <div>
                            <h2>Total Pesanan</h2>
                            <h2 className='total'>Total Biaya Belanja</h2>
                        </div>
                        <div>
                            <h2>1 Barang</h2>
                            <h2 className='total-price'>Rp. 00.000</h2>
                        </div>
                    </div>
                    <div className='next'>
                        <Link to={'/user/checkout'}>
                            <Button className='btn'>Lanjut Ke Pembayaran</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}