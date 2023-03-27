import { useFormik } from "formik";
import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { logInSchema } from "../validation/schemas";
import { useNavigate } from "react-router-dom";
import decrydata from "../utils/Decrypation";
import { toast } from "react-hot-toast";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
 
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

const initialValues = {
  email: "",
  password: "",
};

function LogIn() {

  
  const navigate = useNavigate();
  useEffect(()=>{
    if(JSON.parse(localStorage.getItem("isactive"))){
      navigate("/product")
    }
  },[navigate])
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: logInSchema,
    onSubmit: (values) => {
      /* Getting the data from local storage and parsing it into an array. */
      const userData = JSON.parse(localStorage.getItem("Users")) || [];

      /* Checking the email and password from the local storage and comparing it with the values
      entered by the user. */
      const filterdata = userData.some(
        (items) =>
          items.email === values.email &&
          decrydata(items.password) === values.password
      );

      if (filterdata) {
        const updateData = userData.map((item) => {
          if (item.email === values.email) {
            localStorage.setItem("isactive" , true)
            return {
              ...item,
              isLogin: true,
            };
          } else {
            return {
              ...item,
              isLogin: false,
            };
          }
        });
        toast.success("successfully logIn")
        localStorage.setItem("Users",JSON.stringify(updateData))
        navigate("/")
      } else {
        toast.error("Invalid Credemtails");
      }
    },
  });

  return (
    <>
      
        <Form className="form m-auto " onSubmit={formik.handleSubmit}>

          <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>

            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email"  
             name="email"
             placeholder="Enter email"
             onBlur={formik.handleBlur}
             onChange={formik.handleChange}
             value={formik.values.email}/>
            </FormControl>
            {formik.touched.email && formik.errors.email ? (
              <p className="errors">{formik.errors.email}</p>
            ) : null}

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password"  
             name="password"
             placeholder="Password"
             onBlur={formik.handleBlur}
             onChange={formik.handleChange}
             value={formik.values.password}/>
            </FormControl>
            {formik.touched.password && formik.errors.password ? (
              <p className="errors">{formik.errors.password}</p>
            ) : null}

            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                {/* <Link color={'blue.400'}>Forgot password?</Link> */}
              </Stack>

              <Button
                type="submit"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Submit
              </Button>


          <Stack pt={6}>
              <Text align={'center'}>
                Don't have account? <Link to={"/signup"} color={'blue.400'}>SignUp</Link>
              </Text>
            </Stack>

            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
        </Form>
     
    </>
  );
}

export default LogIn;
