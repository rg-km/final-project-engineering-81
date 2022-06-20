import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import '../styles/BookDetail.css'


export default function BookDetail(){
    return(
        <div className='container-bookDetail'>
            <div className='detail-left'>
                <div className='detail-img'>
                    <img src='https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif'/>
                </div>
            </div>

            <div className='detail-center'>
                <h1 className='title'>Judul Buku</h1>
                <p className='writer'>Nama Penulis</p>
                <div className='price'>
                    <h1>Rp. 00.000</h1> Stock : 100 &emsp; &emsp; Terjual:10
                </div>

                <hr/>

                 <div className='desc'>
                    <h2>Deskripsi</h2>
                    <h3>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam egestas ac at praesent quis cursus turpis. Iaculis eget egestas lectus dui senectus. Quam et mollis habitant fames egestas sed. 
                    </h3>
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
                            <h3>120</h3>
                            <h4>ISBN</h4>
                            <h3>0000000</h3>
                        </div>
                        <div>
                            <h4>Tahun Terbit</h4>
                            <h3>2020</h3>
                            <h4>Penerbit</h4>
                            <h3>Nama Penerbit</h3>
                            <h4>Bahasa</h4>
                            <h3>Indonesia</h3>
                            <h4>Kategori Buku</h4>
                            <h3>Fiksi</h3>
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
                    <h3><Button>-</Button> <b>1</b> <Button>+</Button></h3>
                    <div>
                        <div className='subtotal'>
                            <div className='grey'>Subtotal</div>
                            <div>Rp. 00.000</div>
                        </div>

                        <div className='buy-btn'>
                            <Link to={'/keranjang'}>
                                <Button className='keranjang'>Keranjang</Button>
                            </Link>
                            <Button className='beli'>Beli Sekarang</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}