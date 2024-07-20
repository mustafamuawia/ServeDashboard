import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Select, Table, Thead, Tbody, Tr, Th, Td, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter
} from '@chakra-ui/react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: openAlert, onClose: closeAlert } = useDisclosure();
  const cancelRef = useRef();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [userType, setUserType] = useState('Customer'); // Default to "Customer"
  const [deleteUserId, setDeleteUserId] = useState(null);

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
      closeModal();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data); // Log the error response for debugging
        alert("Error: " + error.response.data.message); // Display a user-friendly message
      } else {
        console.error(error);
      }
    }
  };

  const handleEditUser = async () => {
    const user = { name, email, phone, address, user_type: userType };
    await axios.put(`http://localhost:8000/api/users/${currentUser.user_id}`, user);
    fetchUsers();
    closeModal();
  };

  const openEditModal = (user) => {
    setIsEdit(true);
    setCurrentUser(user);
    setName(user.name);
    setEmail(user.email);
    setPhone(user.phone);
    setAddress(user.address);
    setUserType(user.user_type);
    openModal();
  };

  const openAddModal = () => {
    setIsEdit(false);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setUserType('Customer'); // Default to "Customer" when adding
    openModal();
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${deleteUserId}`);
      fetchUsers();
      closeAlert();
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = (id) => {
    setDeleteUserId(id);
    openAlert();
  };

  return (
    <Box dir="rtl" textAlign="right" mt="8" p="8">
      <Button colorScheme="teal" mt="4" onClick={openAddModal}>إضافة مستخدم</Button>

      <Table variant="simple" mt="4">
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
                <Button colorScheme="yellow" size="sm" onClick={() => openEditModal(user)}>تعديل</Button>
                <Button colorScheme="red" size="sm" ml="2" onClick={() => confirmDelete(user.user_id)}>حذف</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? 'تعديل مستخدم' : 'إضافة مستخدم'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" onClick={isEdit ? handleEditUser : handleAddUser}>
              {isEdit ? 'تعديل' : 'إضافة'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={closeAlert}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            حذف المستخدم
          </AlertDialogHeader>
          <AlertDialogBody>
            هل أنت متأكد أنك تريد حذف هذا المستخدم؟ هذه العملية لا يمكن التراجع عنها.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={closeAlert}>
              إلغاء
            </Button>
            <Button colorScheme="red" onClick={handleDeleteUser} ml={3}>
              حذف
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default Users;
