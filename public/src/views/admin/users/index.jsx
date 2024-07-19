import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Select, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:8000/api/users');
    setUsers(response.data);
  };

  const handleAddUser = async () => {
    const newUser = { name, email, phone, address, user_type: userType };
  
    try {
      await axios.post('http://localhost:8000/api/users', newUser);
      fetchUsers();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data); // Log the error response for debugging
        alert("Error: " + error.response.data.message); // Display a user-friendly message
      } else {
        console.error(error);
      }
    }
  };
  

  const handleEditUser = async (id) => {
    const user = { name, email, phone, address, user_type: userType };
    await axios.put(`http://localhost:8000/api/users/${id}`, user);
    fetchUsers();
  };

  const handleDeleteUser = async (id) => {
    await axios.delete(`http://localhost:8000/api/users/${id}`);
    fetchUsers();
  };

  return (
    <Box dir="rtl" textAlign="right" display="flex" mt="8" p="8">
      <Box flex="1" mr="4">
        <FormControl id="name" isRequired>
          <FormLabel>الاسم</FormLabel>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>البريد الإلكتروني</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>
        <FormControl id="phone">
          <FormLabel>الهاتف</FormLabel>
          <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </FormControl>
        <FormControl id="address">
          <FormLabel>العنوان</FormLabel>
          <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        </FormControl>
        <FormControl id="userType" isRequired>
          <FormLabel>نوع المستخدم</FormLabel>
          <Select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="Customer">عميل</option>
            <option value="Service Provider">مقدم خدمة</option>
            <option value="Admin">مدير</option>
          </Select>
        </FormControl>
        <Button mt="4" colorScheme="teal" onClick={handleAddUser}>إضافة مستخدم</Button>
      </Box>

      <Box flex="1">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>الاسم</Th>
              <Th>البريد الإلكتروني</Th>
              <Th>الهاتف</Th>
              <Th>العنوان</Th>
              <Th>نوع المستخدم</Th>
              <Th>الإجراءات</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user.user_id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.phone}</Td>
                <Td>{user.address}</Td>
                <Td>{user.user_type}</Td>
                <Td display="flex" justifyContent="space-between">
                  <Button colorScheme="yellow" size="sm" onClick={() => handleEditUser(user.user_id)}>تعديل</Button>
                  <Button colorScheme="red" size="sm" ml="2" onClick={() => handleDeleteUser(user.user_id)}>حذف</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Users;
