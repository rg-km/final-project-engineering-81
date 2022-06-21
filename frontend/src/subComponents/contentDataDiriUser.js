import React from 'react'

import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Button,
    Input,
    Heading,
  } from '@chakra-ui/react'
import { Formik, Field, Form } from "formik";



const validateName = (value) => {
    let error
    let hasNumber = /\d/;

    if (!value) {
      error = 'Name is required'
    } else if (hasNumber.test(value)) {
      error = "Really! Your name contain number? 😱"
    }
    return error
}

const RenderFormBiodata = () => {
    return (
        <Formik
        initialValues={{ name: 'Sasuke', address: 'Konoha' }}
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
                    BIODATA PENGGUNA
                </Heading>
                <Field name='name' validate={validateName} >
                    {({ field, form }) => (
                    <FormControl isInvalid={form.errors.name && form.touched.name}>
                        <FormLabel htmlFor='name' >Nama Lengkap</FormLabel>
                        <Input {...field} id='name' placeholder='name' />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                    )}
                </Field>

                <Field name='address' >
                    {({ field }) => (
                    <FormControl>
                        <FormLabel htmlFor='address' mt='6'>Alamat</FormLabel>
                        <Input {...field} id='address' placeholder='address' />
                    </FormControl>
                    )}
                </Field>

                <Field name='yayasan' >
                    {({ field }) => (
                    <FormControl>
                        <FormLabel htmlFor='yayasan' mt='6'>Yayasan (Opsional)</FormLabel>
                        <Input {...field} id='yayasan' placeholder='yayasan' />
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
const contentDataDiriUser = () => {
    
    return (
        <>
        <RenderFormBiodata />
        </>
    )
}

export default contentDataDiriUser