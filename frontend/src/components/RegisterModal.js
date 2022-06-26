import React, { useContext, useEffect } from 'react'
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
    Heading,
    Alert,
    AlertIcon,
  } from '@chakra-ui/react'
import { useState } from 'react'
import { register } from '../api/account'
import Login from './Login'
import { SessionContext } from '../context/SessionContext'
import { useNavigate } from 'react-router-dom'
import '../styles/Modal.css'


const RegisterModal = () => {
  const { isOpen: isOpenModalMain, onOpen: onOpenModalMain, onClose:onCloseModalMain } = useDisclosure()
  const { isOpen: isOpenRegistUser, onOpen: onOpenRegistUser, onClose:onCloseRegistUser } = useDisclosure()
  const { isOpen: isOpenRegistDonatur, onOpen: onOpenRegistDonatur, onClose:onCloseRegistDonatur } = useDisclosure()
  
  const [registerValue, setRegisterValue] = useState({})
  const [role, setRole] = useState('')

  const [succes, setSucces] = useState('')
  const [error, setError] = useState('')

  const handleAsUser = () => {
    onCloseModalMain()
    onOpenRegistUser()
    setRole('user')
  }
  const handleAsDonatur = () => {
    onCloseModalMain()
    onOpenRegistUser()
    setRole('donatur')
  }
  const handleCancelRegistUser = () => {
    onCloseRegistUser()
    onOpenModalMain()
    setRole('')
    setRegisterValue({})
  }

  const handleOnChange = (e) =>{
    const { name, value } = e.target
    setRegisterValue((prevValue) => ({
      ...prevValue,
      [name] : value,
    }))
    setError('')
  }

  const handleRegisterSubmit = async event =>{
    event.preventDefault()
    registerValue.Role = role;

    const postRegister = await register(registerValue)

    if(postRegister.data.error){
      // console.log(postRegister);
      setError(postRegister.data.error)
    } else if(postRegister.status == 200){
      setSucces('Register Berhasil')
      // console.log(postRegister);
    }
  }
  
  useEffect(()=>{
    if(succes){
      setRole('')
      setRegisterValue({})
      setSucces()
      setError()
    }
  }, [succes])

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
          <ModalHeader>
            Create an account as User
              {succes?
                <>
                  <Alert status='success'>
                    <AlertIcon/>
                    {succes}
                  </Alert>
                </>
              :''}
              {error?
                <>
                <Alert status='error'>
                  <AlertIcon />
                  {error}
                </Alert>
                </>
                :''
              }
          </ModalHeader>
          <ModalCloseButton />
          {/* START FORM */}
          <form 
          onSubmit={handleRegisterSubmit}
          >
            <ModalBody pb={6}>

              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input 
                type='text'
                placeholder='Name'
                name='Name'
                value={registerValue.Name?registerValue.Name:''}
                onChange={handleOnChange}
                />
              </FormControl>
              
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input 
                type='email'
                placeholder='Email'
                name='Email'
                value={registerValue.Email?registerValue.Email:''}
                onChange={handleOnChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input 
                type='password'
                placeholder='Password' 
                name='Password'
                value={registerValue.Password?registerValue.Password:''}
                onChange={handleOnChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='green' mr={3}
              type='submit'
              >
                Daftar
              </Button>
              <Button onClick={handleCancelRegistUser}>Batal</Button>
            </ModalFooter>
          </form>
          {/* END FORM */}
        </ModalContent>
      </Modal>
    </>
  )
}


export default RegisterModal