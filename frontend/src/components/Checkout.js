import { Button, Input, useDisclosure } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import '../styles/Checkout.css'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

export default function Checkout(){
    function Payment() {
        const { isOpen, onOpen, onClose } = useDisclosure()

        return (
            <>
            <Button onClick={onOpen}>Bayar Pesanan</Button>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent className='modal'>
                    <ModalHeader className='modal-header'>
                        <h2>Selesaikan pembayaran sebelum</h2>
                        <h1>1 Januari 2022, 23.59 WIB</h1>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6} className='modal-body'>
                        <div className='transfer'>
                            <div className='bank-addres'>
                                <img src='https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif'/>
                                <div>
                                    <h2><b>BANK NAMA_BANK</b></h2>
                                    <h3>A/N BukuKita</h3>
                                </div>
                            </div>
                            <Input value={1234567890} isReadOnly />
                            <h2><b>Nominal Transfer</b></h2>
                            <Input value={100000} isReadOnly />
                        </div>

                        <div className='bukti'>
                            <h2><b>Bukti Pembayaran</b></h2>
                            <div className='input-img'>
                                <Input type={'image'} className='img-input' />
                            </div>
                            <Button>Upload Bukti Transfer</Button>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        {/* <Button colorScheme='blue' mr={3}>
                        Save
                        </Button> */}
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            </>
        )
    }

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
                    <Payment/>
                </div>
            </div>


            {/* MODAL */}
            
        </div>
    )
}