import { useFormik } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import { editeSchema } from "../validation/schemas";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
 
  HStack,
  
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import Header from "./common/Header";
import LogOut from "./LogOut";

function EditeProfile() {
  const userData = JSON.parse(localStorage.getItem("Users")) || [];

  /* Finding the user that is logged in. */
  const logindata = userData.find((user) => user.isLogin === true) || [];

  const initialValues = {
    firstname: logindata.firstname,
    lastname: logindata.lastname,
    contact: logindata.contact,
    email: logindata.email,
  };

  // const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: editeSchema,
    onSubmit: (values) => {

      /* Filtering out all the users that are not logged in. */
      const useremail = userData.filter((item) => item.isLogin === false);


      /* Updating the user data. */
      const updateData = userData.map((item) => {
        if (item.isLogin === true) {
          if (useremail.some((item) => item.email === values.email)) {
            toast.error("email already  log in");
            return {
              ...item,
            };

          } else {
            toast.success("Profile successfully")
            return {
              ...item,
              firstname: values.firstname,
              lastname: values.lastname,
              contact: values.contact,
              email: values.email,
            };
          }
        } else {
          return {
            ...item,
          };
        }
      });

      localStorage.setItem("Users", JSON.stringify(updateData));
    },
  });

  return (
    <>
      <Header />
      <div className="container ">
        <Form className="form m-auto" onSubmit={formik.handleSubmit}>
          <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
              <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                  Update Profile
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                  to enjoy all of our cool features ✌️
                </Text>
              </Stack>

              <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <Stack spacing={4}>

                  <HStack>
                    <Box>
                      <FormControl id="firstname" isRequired>
                        <FormLabel>First Name</FormLabel>
                        <Input type="text"
                          name="firstname"
                          placeholder="First Name"
                          onChange={formik.handleChange}
                          value={formik.values.firstname}
                          onBlur={formik.handleBlur} />
                      </FormControl>
                      {formik.touched.firstname && formik.errors.firstname ? (
                        <p className="errors">{formik.errors.firstname}</p>
                      ) : null}
                    </Box>
                    <Box>
                      <FormControl id="lastname">
                        <FormLabel>Last Name</FormLabel>
                        <Input type="text"
                          name="lastname"
                          placeholder="Last Name"
                          onChange={formik.handleChange}
                          value={formik.values.lastname}
                          onBlur={formik.handleBlur} />
                      </FormControl>
                      {formik.touched.lastname && formik.errors.lastname ? (
                        <p className="errors">{formik.errors.lastname}</p>
                      ) : null}
                    </Box>
                  </HStack>


                  <FormControl id="contact" isRequired>
                    <FormLabel>Contact number</FormLabel>
                    <Input type="text"
                      name="contact"
                      placeholder="contact number"
                      onChange={formik.handleChange}
                      value={formik.values.contact}
                      onBlur={formik.handleBlur} />
                  </FormControl>
                  {formik.touched.contact && formik.errors.contact ? (
                    <p className="errors">{formik.errors.contact}</p>
                  ) : null}

                  <FormControl id="email" isRequired>
                    <FormLabel>Email address</FormLabel>
                    <Input type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={formik.handleChange}
                      value={formik.values.email} />
                  </FormControl>
                  {formik.touched.email && formik.errors.email ? (
                    <p className="errors">{formik.errors.email}</p>
                  ) : null}

                
                    <Stack
                      direction={{ base: 'column', sm: 'row' }}
                      align={'start'}
                      justify={'space-between'}>
                      <LogOut />
                      <Link to={"/upadatepass"} color={'blue.400'}>Update Password?</Link>
                    </Stack>

                    <Stack spacing={10} pt={2}>
                      <Button
                        type="submit"
                        loadingText="Submitting"
                        size="lg"
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                          bg: 'blue.500',
                        }}>
                        submit
                      </Button>
                    </Stack>
                  </Stack>
              </Box>
            </Stack>
          </Flex>
        </Form>
      </div >
    </>
  );
}

export default EditeProfile;
