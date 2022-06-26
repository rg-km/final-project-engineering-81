import React from 'react'
import { VStack, Heading, Text, Container } from '@chakra-ui/react'

import emptyAnimation from '../assets/animation/629-empty-box.gif'

const OrderedBooks = () => {
    return (
        <Container maxW='container.xl' mt={100}>
            <VStack>
                <img src={emptyAnimation} alt="ImageContent" width={300} height={300} draggable={false}/>
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
                    Pengguna masih belum mempunyai pesanan buku.
                </Text>
            
            
            </VStack>
        </Container>
    )
}

export default OrderedBooks