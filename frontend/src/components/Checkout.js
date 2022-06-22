import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import '../styles/Checkout.css'

export default function Checkout(){
    return(
        <div className="co-container">
            <div className="co-left">
                <div className="co-title">Checkout</div>
                
                <div className='co-address'>
                    <div className='title'>
                        <h2><i class="bi bi-geo-alt"></i>Alamat Tujuan Pengiriman</h2>
                        <h2 className='green'>Ubah Alamat</h2>
                    </div>
                    <h2>
                        <b>Label Alamat</b><br/>
                        Nama Penerima
                        Jl. Nama Jalan Penerima, Nama Kota, Nama Provinsi, Kode Pos
                    </h2>
                </div>

                <div className='co-lists'>
                    {/* START ITEMS */}
                    <div className='co-item'>
                        <div className='item'>
                            <img src='https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif'/>
                            <div className='item-detail'>
                                <h3>BukuKita.com</h3>
                                <h2>Judul Buku</h2>
                                <h3>1 Barang</h3>
                                <h2>Rp. 00.000</h2>
                            </div>
                        </div>
                        <div className='co-subTot'>
                            <h3>Subtotal</h3>
                            <h1 className='green'>Rp. 00.000</h1>
                        </div>
                    </div>
                    <hr/>
                    {/* END ITEMS */}
                    {/* <div className='shipping-method'>
                        <h1>Metode Pengiriman</h1>
                        <Button>Pilih Metode Pengiriman</Button>
                    </div> */}
                </div>
            </div>

            {/* RIGHT */}
            <div className="co-right">
                {/* <div className='payment'>
                    <h1>Metode Pembayaran</h1>
                    <Button>Metode Pembayaran</Button>
                </div> */}

                <div className='shopping-detail'>
                    <h1>Rincian belanja</h1>
                    <hr/>
                    
                    <div className='details'>
                        <div className='detail'>
                            <h2>Total Pesanan</h2>
                            <h2>1 Barang</h2>
                        </div>
                        <div className='detail'>
                            <h2>Total Belanja</h2>
                            <h2><b>Rp. xx.000</b></h2>
                        </div>
                        <div className='detail'>
                            <h2>Biaya Ongkos Kirim</h2>
                            <h2><b>Rp. xx.000</b></h2>
                        </div>
                        <div className='detail'>
                            <h2>Biaya Admin</h2>
                            <h2><b>Rp. xx.000</b></h2>
                        </div>
                        <hr/>
                        <div className='detail'>
                            <h1><b>Total</b></h1>
                            <h1 className='green'><b>Rp. xx.000</b></h1>
                        </div>
                    </div>
                    <Button>Bayar Pesanan</Button>
                </div>
            </div>
        </div>
    )
}