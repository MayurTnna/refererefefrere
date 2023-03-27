import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import { signUpSchema } from "../validation/schemas";
import { Link, useNavigate } from "react-router-dom";
import encrypass from "../utils/Encrypation";
import { toast } from "react-hot-toast";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  // Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


const initialValues = {
  firstname: "",
  lastname: "",
  contact: "",
  email: "",
  password: "",
  confirm_password: "",
};

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [conShowPassword, setconShowPassword] = useState(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {

      /* Getting the data from local storage and storing it in temp variable. */
      const temp = JSON.parse(localStorage.getItem("Users")) || [];


      const encry = encrypass(values.password);

      const encryData = [
        ...temp,
        {
          firstname: values.firstname,
          lastname: values.lastname,
          contact: values.contact,
          email: values.email,
          password: encry,
        },
      ];

      /* Checking if the email already exists in the local storage. */
      const userEmail = temp.some((item) => item.email === values.email);

      if (userEmail) {
        toast.error("Email already exists ");
      } else {
        toast.success("successfully signUp");
        localStorage.setItem("Users", JSON.stringify(encryData));
        navigate("/login");
      }
    },
  });

  return (
    <>

      <Form onSubmit={formik.handleSubmit}>
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}

        >

          <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
            <Stack align={'center'}>
              <Heading fontSize={'4xl'} textAlign={'center'}>
                Sign up
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

                <FormControl isRequired>
                  <FormLabel>Contact Number</FormLabel>
                  <Input type="text"
                    name="contact"
                    id="contact"
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
                    value={formik.values.email}
                    onBlur={formik.handleBlur} />
                </FormControl>
                {formik.touched.email && formik.errors.email ? (
                  <p className="errors">{formik.errors.email}</p>
                ) : null}

                <FormControl id="password" isRequired


                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur} />
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                {formik.touched.password && formik.errors.password ? (
                  <p className="errors">{formik.errors.password}</p>
                ) : null}



                <FormControl id="confirm_password" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input type={conShowPassword ? 'text' : 'password'} 
                  name="confirm_password"
                  placeholder="Confirm Password"
                  onChange={formik.handleChange}
                  value={formik.values.confirm_password}
                  onBlur={formik.handleBlur}/>
                    <InputRightElement h={'full'}>
                      <Button
                        variant={'ghost'}
                        onClick={() =>
                          setconShowPassword((conShowPassword) => !conShowPassword)
                        }>
                        {conShowPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                {formik.touched.confirm_password &&
                  formik.errors.confirm_password ? (
                  <p className="errors">{formik.errors.confirm_password}</p>
                ) : null}




                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    type="submit"
                    size="lg"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}>
                    Sign up
                  </Button>
                </Stack>

                <Stack pt={6}>
                  <Text align={'center'}>
                    Already a user? <Link to={"/login"} color={'blue.400'}>Login</Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex >
      </Form>
    </>
  );
}

export default SignUp;
