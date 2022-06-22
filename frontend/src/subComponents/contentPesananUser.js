import React from 'react'
import { Link  } from "react-router-dom";

import { MdShoppingCart } from "react-icons/md"
import { VStack, Heading, Text, Button } from '@chakra-ui/react'

import emptyAnimation from '../assets/animation/629-empty-box.gif'


const contentPesananUser = () => {

    return (
        <VStack>
            <img src={emptyAnimation} alt="ImageContent" width={300} height={300} />
            <Heading
                color={'#1DC9A1'} 
                fontSize={'2xl'}
            >
                Belum ada pesanan
            </Heading>
            
            <Text
                w={'80%'}
                textAlign={'center'}
                color={'gray'}
            >
                Kamu masih belum pernah berbelanja, ayo mulai berbelanja sekarang. BukuKita memiliki berbagai produk hanya untukmu. Yuk mulia belanja!
            </Text>
            
            <Link to="/daftar-buku">
                <Button 
                p='6'
                mt={'10'}
                mb={'10'}
                leftIcon={<MdShoppingCart/>} 
                colorScheme='green' 
                fontSize='lg'
                > 
                    Coba Beli 
                </Button>
            </Link>
            
            
        </VStack>
    )
}

export default contentPesananUser