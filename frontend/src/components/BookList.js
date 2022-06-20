import { Link } from 'react-router-dom'
import '../styles/BookList.css'

export default function BookList(){
    let items = ['Item 1','Item 2','Item 3','Item 4','Item 5',
                'Item 1','Item 2','Item 3','Item 4','Item 5',
                'Item 1','Item 2','Item 3','Item 4','Item 5'];
    
    return(
        <div className='container-bookList'>
            {items.map((item, idx)=>{
                return(
                    <Link to={'/daftar-buku/detail'}>
                        <div className='card'>
                            <img src='https://dinkes.dairikab.go.id/wp-content/uploads/sites/12/2022/03/default-img.gif'/>
                            <div className='detail'>
                                <p className='writer'>Nama Penulis</p>
                                <p className='title'>Judul Buku</p>
                                <p className='price'>Rp. 00.000</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
            
        </div>
    )
}