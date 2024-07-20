import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td, Modal,
  ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure,
  AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter,
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper
} from '@chakra-ui/react';
import axios from 'axios';

const Services = () => {
  const [services, setServices] = useState([]);
  const [currentService, setCurrentService] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const { isOpen: isModalOpen, onOpen: openModal, onClose: closeModal } = useDisclosure();
  const { isOpen: isAlertOpen, onOpen: openAlert, onClose: closeAlert } = useDisclosure();
  const cancelRef = useRef();

  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [deleteServiceId, setDeleteServiceId] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const response = await axios.get('http://localhost:8000/api/services');
    setServices(response.data);
  };

  const handleAddService = async () => {
    const newService = { service_name: serviceName, description, price };

    try {
      await axios.post('http://localhost:8000/api/services', newService);
      fetchServices();
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

  const handleEditService = async () => {
    const service = { service_name: serviceName, description, price };
    await axios.put(`http://localhost:8000/api/services/${currentService.service_id}`, service);
    fetchServices();
    closeModal();
  };

  const openEditModal = (service) => {
    setIsEdit(true);
    setCurrentService(service);
    setServiceName(service.service_name);
    setDescription(service.description);
    setPrice(service.price);
    openModal();
  };

  const openAddModal = () => {
    setIsEdit(false);
    setServiceName('');
    setDescription('');
    setPrice(0); // Default to 0 when adding
    openModal();
  };

  const handleDeleteService = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/services/${deleteServiceId}`);
      fetchServices();
      closeAlert();
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = (id) => {
    setDeleteServiceId(id);
    openAlert();
  };

  return (
    <Box dir="rtl" textAlign="right" mt="8" p="8">
      <Button colorScheme="teal" mt="4" onClick={openAddModal}>إضافة خدمة</Button>

      <Table variant="simple" mt="4">
        <Thead>
          <Tr>
            <Th>اسم الخدمة</Th>
            <Th>الوصف</Th>
            <Th>السعر</Th>
            <Th>الإجراءات</Th>
          </Tr>
        </Thead>
        <Tbody>
          {services.map((service) => (
            <Tr key={service.service_id}>
              <Td>{service.service_name}</Td>
              <Td>{service.description}</Td>
              <Td>{service.price}</Td>
              <Td display="flex" justifyContent="flex-start" gap="2">
                <Button colorScheme="yellow" size="sm" onClick={() => openEditModal(service)}>تعديل</Button>
                <Button colorScheme="red" size="sm" ml="1"  onClick={() => confirmDelete(service.service_id)}>حذف</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEdit ? 'تعديل خدمة' : 'إضافة خدمة'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="serviceName" isRequired>
              <FormLabel>اسم الخدمة</FormLabel>
              <Input value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
            </FormControl>
            <FormControl id="description">
              <FormLabel>الوصف</FormLabel>
              <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormControl>
            <FormControl id="price" isRequired>
              <FormLabel>السعر</FormLabel>
              <NumberInput 
                value={price} 
                onChange={(value) => setPrice(value)} 
                min={0}
                precision={2}
                step={0.01}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="teal" onClick={isEdit ? handleEditService : handleAddService}>
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
            حذف الخدمة
          </AlertDialogHeader>
          <AlertDialogBody>
            هل أنت متأكد أنك تريد حذف هذه الخدمة؟ هذه العملية لا يمكن التراجع عنها.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={closeAlert}>
              إلغاء
            </Button>
            <Button colorScheme="red" onClick={handleDeleteService} ml={3}>
              حذف
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default Services;
