import React, { useState } from 'react'
import { Heading, Box, Stack, SimpleGrid, Container } from '@chakra-ui/react'

import contentAkunUser from '../subComponents/contentAkunUser'
import contentPesananUser from '../subComponents/contentPesananUser'
import contentDataDiriUser from '../subComponents/contentDataDiriUser'
import Navbar from './Navbar'
import Footer from './Footer'


const FeatureContent = ({ content, ...rest }) => {
    return (
      <Box p={8} shadow='md' borderWidth='1px' {...rest}>
        {content === 'Data Diri' ? contentDataDiriUser() : null}
        {content === 'Akun Saya' ? contentAkunUser() : null}
        {content === 'Pesanan Saya' ? contentPesananUser() : null}
      </Box>
    )
}


const AccountUser = () => {
    const [contentActive, setcontentActive] = useState('Akun Saya')

    return (
        <SimpleGrid column={1}>
            {/* import navbar */}
            <Navbar />

            <Container maxW='container.xl' mt={100}>
            <Stack spacing={8} direction='row' >
                <Box w='20%' h='300' p={8} shadow='md' borderWidth='1px'>
                    <Box 
                    as='button'
                    mb={3}
                    color= {contentActive === 'Data Diri' ? '#1DC9A1' : '#000'} 
                    fontSize='xl'
                    fontWeight='semibold' 
                    _hover={{ color: '#1DC9A1' }} 
                    _active={{ color: '#1DC9A1', transform: 'scale(0.9)' }}
                    _focus={{ color: '#1DC9A1'}}
                    onClick={ () => setcontentActive('Data Diri') }
                    >
                        Data Diri
        
                    </Box>
                    <br/>

                    <Box 
                    as='button'
                    mb={3}
                    color= {contentActive === 'Akun Saya' ? '#1DC9A1' : '#000'} 
                    fontSize='xl'
                    fontWeight='semibold' 
                    _hover={{ color: '#1DC9A1' }} 
                    _active={{ color: '#1DC9A1', transform: 'scale(0.9)' }}
                    _focus={{ color: '#1DC9A1'}}
                    onClick={ () => setcontentActive('Akun Saya') }
                    >
                        Akun Saya
        
                    </Box>
                    <br/>

                    <Box  
                    as='button'
                    mb={16}
                    color= {contentActive === 'Pesanan Saya' ? '#1DC9A1' : '#000'} 
                    fontSize='xl'
                    fontWeight='semibold'
                    _hover={{ color: '#1DC9A1' }} 
                    _active={{ color: '#1DC9A1', transform: 'scale(0.9)' }}
                    onClick={ () => setcontentActive('Pesanan Saya') }
                    >
                        Pesanan Saya
                    </Box>
                    <br/>
                    
                    <Box 
                    as='button' 
                    fontSize='xl' 
                    fontWeight='semibold' 
                    color='red'
                    _active={{ transform: 'scale(0.9)' }}>
                        Keluar
                    </Box>
                </Box>

                <FeatureContent w='80%'
                    content= {contentActive}
                />


                </Stack>
            </Container>

            <Footer />

        </SimpleGrid>
    )
}

export default AccountUser