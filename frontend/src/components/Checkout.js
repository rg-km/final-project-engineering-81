import { Button, Input, useDisclosure } from '@chakra-ui/react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Checkout.css'
import { Modal,  ModalOverlay, ModalContent,  ModalHeader,  ModalFooter,  ModalBody, ModalCloseButton} from '@chakra-ui/react'
import useCartStore from '../store/cartStore'
import { useState } from 'react'

export default function Checkout(){
    const cartItems = useCartStore().items
    const state = useLocation().state
    // const date = new Date(Date.now() + (3600 * 1000 * 24))

    return(
        <div className="co-container">
            <div className="co-left">
                <div className="co-title">Checkout</div>
                
                <div className='co-address'>
                    <div className='title'>
                        <h2><i className="bi bi-geo-alt"></i>Alamat Tujuan Pengiriman</h2>
                        <h2 className='green'>Ubah Alamat</h2>
                    </div>
                    <h2>
                        <b>Label Alamat</b><br/>
                        Nama Penerima
                        Jl. Nama Jalan Penerima, Nama Kota, Nama Provinsi, Kode Pos
                    </h2>
                </div>
                <div className='co-lists'>
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                        />
                    ))}
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
                            <h2>{state.totalBrg} Barang</h2>
                        </div>
                        <div className='detail'>
                            <h2>Total Belanja</h2>
                            <h2><b>Rp. {state.total}</b></h2>
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
                            <h1 className='green'><b>Rp. {state.total}</b></h1>
                        </div>
                    </div>
                    <Payment total={state.total}/>
                </div>
            </div>


            {/* MODAL */}
            
        </div>
    )
}

function Payment({total}) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [dateTomorrow, setTomorrow] = useState('')

    const btnBayarOnClick = () => {
        onOpen()
        // const date = new Date(Date.now() + (3600 * 1000 * 24))
        const date = new Date(Date.now() + (3600 * 1000 * 24))
        const dString = date.toString()
        setTomorrow(dString)
        
    }

    return (
        <>
        <Button onClick={btnBayarOnClick}>Bayar Pesanan</Button>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent className='modal'>
                <ModalHeader className='modal-header'>
                    <h2>Selesaikan pembayaran sebelum</h2>
                    <h1>{(dateTomorrow)}</h1>
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
                        <Input value={total} isReadOnly />
                    </div>

                    {/* <div className='bukti'>
                        <h2><b>Bukti Pembayaran</b></h2>
                        <div className='input-img'>
                            <Input type={'image'} className='img-input' />
                        </div>
                        <Button>Upload Bukti Transfer</Button>
                    </div> */}
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
}

function CartItem({item}) {
    return(
        <>
        {/* START ITEMS */}
        <div className='co-item'>
            <div className='item'>
                <img src='https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif'/>
                <div className='item-detail'>
                    <h3>BukuKita.com</h3>
                    <h2>{item.title}</h2>
                    <h3>{item.qty} Barang</h3>
                    <h2>Rp. {item.price}</h2>
                </div>
            </div>
            <div className='co-subTot'>
                <h3>Subtotal</h3>
                <h1 className='green'>Rp. {item.qty * item.price}</h1>
            </div>
        </div>
        <hr/>
        {/* END ITEMS */}
        </>
    )
}