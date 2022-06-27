import React from 'react'

import {
    FormControl,
    FormLabel,
    Button,
    Input,
    Heading,
    InputGroup,
    InputRightElement,
  } from '@chakra-ui/react'
import { Formik, Field, Form } from "formik";
import useAccountStore from '../store/accountStore';


const RenderFormAkun = () => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const account = useAccountStore().account

    return (
        <Formik
        // initialValues={{ username: 'contohAkun123', password: 'contoh' }}
        onSubmit={(values, actions) => {
            setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            actions.setSubmitting(false)
            }, 1000)
        }}
        >

        {(props) => (
            <Form>
                <Heading
                    color={'#1DC9A1'} 
                    fontSize={'2xl'}
                    mb={'10'}
                >
                    AKUN SAYA
                </Heading>
                <Field name='username' >
                    {({ field }) => (
                    <FormControl>
                        <FormLabel htmlFor='username' >Email</FormLabel>
                        <Input {...field} id='username' placeholder='username' value={account.email?account.email:''}/>
                    </FormControl>
                    )}
                </Field>

                <Field name='password' >
                    {({ field }) => (
                    <FormControl>
                        <FormLabel htmlFor='password' mt='6'>Password</FormLabel>
                        <InputGroup size='md'>
                            <Input {...field} 
                            id='password' pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password' 
                            value={account.password?account.password:''}
                            />

                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        
                    </FormControl>
                    )}
                </Field>

                <Button
                    mt={12}
                    colorScheme='green'
                    isLoading={props.isSubmitting}
                    type='submit'
                >
                    Submit
                </Button>
            </Form>
        )}
        </Formik>
    )
}

// MAIN COMPONENT
const contentAkunUser = () => {
    
    return (
        <>
        <RenderFormAkun />
        </>
    )
}

export default contentAkunUser