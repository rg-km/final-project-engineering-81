import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormLabel,
    Text,
    Heading
  } from '@chakra-ui/react'
import { useState } from 'react'


const RegisterModal = () => {
  const { isOpen: isOpenModalMain, onOpen: onOpenModalMain, onClose:onCloseModalMain } = useDisclosure()
  const { isOpen: isOpenRegistUser, onOpen: onOpenRegistUser, onClose:onCloseRegistUser } = useDisclosure()
  const { isOpen: isOpenRegistDonatur, onOpen: onOpenRegistDonatur, onClose:onCloseRegistDonatur } = useDisclosure()
  
  const handleAsUser = () => {
    onCloseModalMain()
    onOpenRegistUser()
  }
  const handleAsDonatur = () => {
    onCloseModalMain()
    onOpenRegistDonatur()
  }
  const handleCancelRegistUser = () => {
    onCloseRegistUser()
    onOpenModalMain()
  }
  const handleCancelRegistDonatur = () => {
    onCloseRegistDonatur()
    onOpenModalMain()
  }
  


  return (
    <>
      <Button onClick={onOpenModalMain} _hover='none'>Register</Button>

      {/* MODAL BASE/MAIN */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpenModalMain}
        onClose={onCloseModalMain}
        size='sm'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={'center'}>
            <Heading
              color={'#1DC9A1'} 
              fontSize={'2xl'}
              mb={'2'}
              >
                  Daftar
            </Heading>
            <Text   
              color={'gray'}
              fontSize={'sm'}
              >
                Ini cepat dan mudah.
            </Text>
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody mt={4} pb={6} textAlign={'center'}>
            
          <Button 
            onClick={handleAsUser}
            p='6'
            mt={'5'}
            width={'70%'}
            colorScheme='green' 
            fontSize='lg'
            > 
            Daftar sebagai Pengguna 
          </Button>

          <Text   
            color={'gray'}
            fontSize={'sm'}
            mt={'3'}
            mb={'3'}
            >
            atau
          </Text>

          <Button 
            onClick={handleAsDonatur}
            p='6'
            mb='3'
            width={'70%'}
            bg='#112B3C'
            color='white' 
            fontSize='lg'
            _hover={{ bg:'#0b1c28' }}
            _active={{ bg:'#060e14' }}
            > 
            Daftar sebagai Donatur </Button>
          </ModalBody>

          <ModalFooter textAlign={'center'}>
          <Text   
            color={'gray'}
            fontSize={'xs'}
            >
            Dengan mengklik Daftar, Anda menyetujui Ketentuan, Kebijakan Data dan Kebijakan Cookie kami.
          </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>


      {/* MODAL REGISTER USER */}
      <Modal isOpen={isOpenRegistUser} onClose={onCloseRegistUser} closeOnOverlayClick={false}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an account as User</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input placeholder='Username' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input placeholder='Password' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3}>
              Daftar
            </Button>
            <Button onClick={handleCancelRegistUser}>Batal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* MODAL REGISTER DONATUR */}
      <Modal isOpen={isOpenRegistDonatur} onClose={onCloseRegistDonatur} closeOnOverlayClick={false}>
      <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create an account as Donatur</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input placeholder='Username' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input placeholder='Password' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Full Name</FormLabel>
              <Input placeholder='Full Name' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Address</FormLabel>
              <Input placeholder='Address' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3}>
              Daftar
            </Button>
            <Button onClick={handleCancelRegistDonatur}>Batal</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}


export default RegisterModal