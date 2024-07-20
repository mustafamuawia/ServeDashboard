import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter,
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Select
} from '@chakra-ui/react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';

const ServiceProviders = () => {
  const [serviceProviders, setServiceProviders] = useState([]);
  const [services, setServices] = useState([]);
  const [currentServiceProvider, setCurrentServiceProvider] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: openAlert, onClose: closeAlert } = useDisclosure();
  const cancelRef = useRef();

  const [userId, setUserId] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [availability, setAvailability] = useState(true);
  const [rating, setRating] = useState(0);
  const [deleteServiceProviderId, setDeleteServiceProviderId] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchServiceProviders();
    fetchUsers();
    fetchServices();
  }, []);

  const fetchServiceProviders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/service-providers');
      setServiceProviders(response.data);
    } catch (error) {
      console.error('Error fetching service providers:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  const handleAddServiceProvider = async () => {
    const newServiceProvider = { user_id: userId, service_type: serviceType, availability, rating };

    try {
      await axios.post('http://localhost:8000/api/service-providers', newServiceProvider);
      fetchServiceProviders();
      closeModal();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert("Error: " + error.response.data.message);
      } else {
        console.error(error);
      }
    }
  };

  const handleEditServiceProvider = async () => {
    const serviceProvider = { service_type: serviceType, availability, rating };
    try {
      await axios.put(`http://localhost:8000/api/service-providers/${currentServiceProvider.provider_id}`, serviceProvider);
      fetchServiceProviders();
      closeModal();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        alert("Error: " + error.response.data.message);
      } else {
        console.error(error);
      }
    }
  };

  const openEditModal = (serviceProvider) => {
    setIsEdit(true);
    setCurrentServiceProvider(serviceProvider);
    setUserId(serviceProvider.user_id);
    setServiceType(serviceProvider.service_type);
    setAvailability(serviceProvider.availability);
    setRating(serviceProvider.rating);
    openModal();
  };

  const openAddModal = () => {
    setIsEdit(false);
    setUserId('');
    setServiceType('');
    setAvailability(true);
    setRating(0);
    openModal();
  };

  const handleDeleteServiceProvider = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/service-providers/${deleteServiceProviderId}`);
      fetchServiceProviders();
      closeAlert();
    } catch (error) {
      console.error('Error deleting service provider:', error);
    }
  };

  const confirmDelete = (id) => {
    setDeleteServiceProviderId(id);
    openAlert();
  };

  return (
    <Box dir="rtl" textAlign="right" mt="8" p="8">
      <Button colorScheme="teal" mt="4" onClick={openAddModal}>إضافة مزود خدمة</Button>

      <Table variant="simple" mt="4">
        <Thead>
          <Tr>
            <Th>اسم مقدم الخدمة</Th>
            <Th>نوع الخدمة</Th>
            <Th>التوافر</Th>
            <Th>التقييم</Th>
            <Th>الإجراءات</Th>
          </Tr>
        </Thead>
        <Tbody>
          {serviceProviders.map((serviceProvider) => (
            <Tr key={serviceProvider.provider_id}>
              <Td>{serviceProvider.user ? serviceProvider.user.name : 'غير متوفر'}</Td>
              <Td>{serviceProvider.service_type}</Td>
              <Td>{serviceProvider.availability ? 'متاح' : 'غير متاح'}</Td>
              <Td>
                <StarRatings
                  rating={serviceProvider.rating}
                  starRatedColor="gold"
                  numberOfStars={5}
                  name='rating'
                  starDimension="20px"
                  starSpacing="2px"
                />
              </Td>
              <Td display="flex" justifyContent="flex-start" gap="2">
                <Button colorScheme="yellow" size="sm" onClick={() => openEditModal(serviceProvider)}>تعديل</Button>
                <Button colorScheme="red" size="sm" ml="2" onClick={() => confirmDelete(serviceProvider.provider_id)}>حذف</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? 'تعديل مزود خدمة' : 'إضافة مزود خدمة'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="userId" isRequired>
              <FormLabel>اسم المستخدم</FormLabel>
              <Select value={userId} onChange={(e) => setUserId(e.target.value)}>
                <option value="">اختر مستخدم</option>
                {users.map((user) => (
                  <option key={user.user_id} value={user.user_id}>
                    {user.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="serviceType" isRequired>
              <FormLabel>نوع الخدمة</FormLabel>
              <Select value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                <option value="">اختر خدمة</option>
                {services.map((service) => (
                  <option key={service.service_id} value={service.service_name}>
                    {service.service_name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="availability" isRequired>
              <FormLabel>التوافر</FormLabel>
              <Select value={availability} onChange={(e) => setAvailability(e.target.value === 'true')}>
                <option value={true}>متاح</option>
                <option value={false}>غير متاح</option>
              </Select>
            </FormControl>
            <FormControl id="rating">
              <FormLabel>التقييم</FormLabel>
              <StarRatings
                rating={rating}
                starRatedColor="gold"
                numberOfStars={5}
                name='rating'
                starDimension="30px"
                starSpacing="5px"
                changeRating={(newRating) => setRating(newRating)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" onClick={isEdit ? handleEditServiceProvider : handleAddServiceProvider}>
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
            حذف مزود الخدمة
          </AlertDialogHeader>
          <AlertDialogBody>
            هل أنت متأكد أنك تريد حذف هذا المزود؟ هذه العملية لا يمكن التراجع عنها.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={closeAlert}>
              إلغاء
            </Button>
            <Button colorScheme="red" onClick={handleDeleteServiceProvider} ml={3}>
              حذف
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default ServiceProviders;
