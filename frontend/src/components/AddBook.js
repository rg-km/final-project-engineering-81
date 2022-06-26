import { Button, Input, Textarea } from '@chakra-ui/react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/AddBook.css'

export default function AddBook(){
    const [formValues, setFormValues] = useState({});

    const handleOnChange = (e) =>{
        const { name, value } = e.target
        setFormValues((prevValues) =>({
            ...prevValues,
            [name] : value,
        }))
        console.log(formValues);
    }


    return(
        <div className="container-addBook">
            {/* KIRI */}
            <div className='add-left'>
                <div className='add-title'>Tambah Buku</div>
                
                <div className='book-img'>
                    <h1>Gambar Buku</h1>
                    <img src={formValues.image ? formValues.image : ''}/>
                    <Input 
                        type='text' placeholder={'URL Image'}
                        name='image'
                        onChange={handleOnChange}
                    />
                </div>
                
                <div className='book-idt'>
                    <h1>Identitas Buku</h1>
                    <div className='input'>
                        <h2>Judul</h2>
                        <Input 
                            type='text'
                            name='title'
                            value={formValues.title ? formValues.title : ''}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='input'>
                        <h2>Penulis</h2>
                        <Input 
                            type='text'
                            name='writer'
                            value={formValues.writer ? formValues.writer : ''}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='input'>
                        <h2>Penerbit</h2>
                        <Input 
                            type='text'
                            name='publisher'
                            value={formValues.publisher ? formValues.publisher : ''}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='input'>
                        <h2>Tahun terbit</h2>
                        <Input 
                            type='number'
                            name='year'
                            value={formValues.year ? formValues.year : ''}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='input'>
                        <h2>Jumlah Halaman</h2>
                        <Input 
                            type='number'
                            name='pages'
                            value={formValues.pages ? formValues.pages : ''}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='input'>
                        <h2>ISBN<h3>(International Standard Book Number)</h3></h2>
                        <Input 
                            type='number'
                            name='isbn'
                            value={formValues.isbn ? formValues.isbn : ''}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='input'>
                        <h2>Kategori</h2>
                        <Input 
                            type='text'
                            name='category'
                            value={formValues.category ? formValues.category : ''}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='input'>
                        <h2>Bahasa</h2>
                        <Input 
                            type='text'
                            name='language'
                            value={formValues.language ? formValues.language : ''}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='input'>
                        <h2>Berat</h2>
                        <Input 
                            type='number'
                            name='weight'
                            value={formValues.weight ? formValues.weight : ''}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>

                <div className='book-idt'>
                    <h1>Identitas Buku</h1>
                    <div className='input'>
                        <h2>Harga</h2>
                        <Input 
                            type='number'
                            name='price'
                            value={formValues.price ? formValues.price : ''}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='input'>
                        <h2>Kondisi</h2>
                        <Input 
                            type='text'
                            name='condition'
                            value={formValues.condition ? formValues.condition : ''}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='input'>
                        <h2>Status</h2>
                        <select
                        name='status'
                        value={formValues.status ? formValues.status : ''}
                        onChange={handleOnChange}
                        >
                            <option value={true}>Pilih Status Produk</option>
                            <option value={true}>Tampil</option>
                            <option value={false}>Arsip</option>
                        </select>
                    </div>
                    <div className='input'>
                        <h2>Stok</h2>
                        <Input 
                            type='number'
                            name='stock'
                            value={formValues.stock ? formValues.stock : ''}
                            onChange={handleOnChange}
                        />
                    </div>
                    <div className='input'>
                        <h2>Deskripsi</h2>
                        <Textarea 
                            type='text'
                            name='description'
                            value={formValues.description ? formValues.description : ''}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
            </div>
            {/* END KIRI */}

            {/* KANAN */}
            <div className='add-right'>
                <div className='btn-action'>
                    <div className='btn-white'>
                        <Link to={'/admin/buku'}>
                            <Button>Batal</Button>
                        </Link>
                    </div>
                    <div className='btn-green'>
                        <Button>Tambahkan Produk</Button>
                    </div>
                </div>
            </div>
            {/* END KANAN */}
        </div>
    )
}