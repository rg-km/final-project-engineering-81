import { Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import '../styles/Cart.css'

export default function Cart(){
    const { items, removeItem, changeQty} = useCartStore()
    const [total, setTotal] = useState(0)
    const [totalBrg, setTotalBrg] = useState(0)

    // items.map((item)=>setTotalBrg(totalBrg+item.qty))

    // console.log(totalBrg);

    const count = () => {
        if(items.length > 0){
            var brg = 0
            var total = 0 
            
            for(var i in items){
                total = total + (items[i].qty * items[i].price)
                brg = brg + items[i].qty
            }
            setTotal(total)
            setTotalBrg(brg)
        }
    }
    
    useEffect(()=>{
        count()
    }, [items])

    return(
        <div className='cart-container'>
            <div className='cart-left'>
                <div className='cart-title'>Keranjang</div>
                <div className='cart-lists'>
                    {/* START ITEMS */}               
                    {items.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onChange={changeQty}
                            onRemove = {removeItem}
                        />
                    ))}
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
                            <h2>{totalBrg} Barang</h2>
                            <h2 className='total-price'>Rp. {total}</h2>
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

function CartItem({item, onChange, onRemove}) {
    return(
        <>
        <div className='cart-item'>
            <img src={item.img}/>
            <div className='item'>
                <h3>BukuKita.com</h3>
                <h2>{item.title}</h2>
                <h3>{item.qty} Barang</h3>
                <h2>Rp. {item.price}</h2>
            </div>
            <div className='cart-tools'>
                <div className='trash'>
                    <Button 
                    onClick={() => onRemove(item.id)}>
                        <i className="bi bi-trash"></i>
                    </Button>
                </div>
                <div className='btn-changeQty'>
                    <Button
                    onClick={() => onChange(item.id, item.qty - 1)}
                    >
                        -
                    </Button>
                    <b>{item.qty}</b>
                    <Button
                    onClick={() => onChange(item.id, item.qty + 1)}
                    >
                        +
                    </Button>
                </div>
                <h1 className='price'>Rp. {item.qty*item.price}</h1>
            </div>
        </div>
        <hr/>
        </>
    )
}