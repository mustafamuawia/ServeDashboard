import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import DefaultAuth from 'layouts/auth/Default';

function Register() {
  const navigate = useHistory();
  const { colorMode } = useColorMode();
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = useColorModeValue('gray.400', 'gray.500');
  const inputTextColor = useColorModeValue('gray.700', 'gray.200');
  const labelColor = useColorModeValue('gray.700', 'gray.200');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      if (response.data.message === 'Admin registered successfully') {
        navigate.push('/auth/sign-in');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('Registration failed');
    }
  };

  return (
    <DefaultAuth>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minH="100vh"
      >
        <Flex
          direction="column"
          w={{ base: '100%', md: '420px' }}
          p={8}
          background={useColorModeValue('white', 'gray.800')}
          borderRadius="15px"
          boxShadow="lg"
          textAlign="center"
          mb={8} // Margin bottom to push footer down
        >
          <Heading color={textColor} fontSize="36px" mb="10px">
            إنشاء حساب
          </Heading>
          <Text mb="36px" color={textColorSecondary} fontWeight="400" fontSize="md">
            املأ النموذج أدناه لإنشاء حساب!
          </Text>
          <FormControl>
            <FormLabel fontSize="sm" fontWeight="500" color={labelColor} mb="8px">
              الاسم
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              type="text"
              placeholder="محمد علي"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              color={inputTextColor}
            />
            <FormLabel fontSize="sm" fontWeight="500" color={labelColor} mb="8px">
              البريد الإلكتروني
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              color={inputTextColor}
            />
            <FormLabel fontSize="sm" fontWeight="500" color={labelColor}>
              كلمة المرور
            </FormLabel>
            <Input
              isRequired={true}
              fontSize="sm"
              placeholder="8 أحرف على الأقل"
              mb="24px"
              size="lg"
              type="password"
              variant="auth"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              color={inputTextColor}
            />
            <FormLabel fontSize="sm" fontWeight="500" color={labelColor}>
              تأكيد كلمة المرور
            </FormLabel>
            <Input
              isRequired={true}
              fontSize="sm"
              placeholder="8 أحرف على الأقل"
              mb="24px"
              size="lg"
              type="password"
              variant="auth"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              color={inputTextColor}
            />
            {error && (
              <Text color="red.500" mb="24px">
                {error}
              </Text>
            )}
            <Button fontSize="sm" variant="brand" fontWeight="500" w="100%" h="50" mb="24px" onClick={handleRegister}>
              تسجيل
            </Button>
          </FormControl>
        </Flex>
        <Box as="footer" textAlign="center">
          <Text color={textColorSecondary} fontSize="sm">
            © {new Date().getFullYear()} Your Company. All Rights Reserved.
          </Text>
        </Box>
      </Flex>
    </DefaultAuth>
  );
}

export default Register;
