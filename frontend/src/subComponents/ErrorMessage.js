import { Box, Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import React from 'react';
// import { Box, Alert, AlertIcon, AlertDescription } from '@chakra-ui/core';

export default function ErrorMessage({ message }) {
  return (
    <Box>
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
    
  );
}