import { useFormik } from "formik";
import React from "react";
import Form from "react-bootstrap/Form";
import { toast } from "react-hot-toast";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

import { forgatePassSchema } from "../validation/schemas";
import encrypass from "../utils/Encrypation";
import Header from "./common/Header";
import decrydata from "../utils/Decrypation";


const initialValues = {
  password: "",
  new_password: "",
  confirm_password: "",
};

function ForgatePass() {
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: forgatePassSchema,
    onSubmit: (values) => {


      /* A template literal. It allows you to write multi-line strings and string interpolation (i.e.
      inject variables in a string). */
      const userData = JSON.parse(localStorage.getItem("Users")) || [];

      const userPass = userData.find((item) => item.isLogin === true)

      /* Updating the password of the user who is logged in. */
      const newUser = userData.map((item) => {
        if (item.isLogin === true) {
          if (decrydata(userPass.password) === values.password) {
            if (values.password !== values.new_password) {
              toast.success("password Update successfully")
              return {
                ...item,
                password: encrypass(values.new_password)
              }
            } else {
              toast.error("current and new password same");
            }
          } else {
            toast.error("Current Password Invalid")
          }
        } else {
          return item
        }
        // toast.error("Invalid Credentails");
        return item
      })

      localStorage.setItem("Users", JSON.stringify(newUser))


    },
  });
  return (
    <>
      <Header />
      <Form className="form m-auto " onClick={formik.handleSubmit}>
        <Flex
          minH={'100vh'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('gray.50', 'gray.800')}>
          <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}>
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Update password
            </Heading>


            <FormControl id="password" isRequired>
              <FormLabel>Current Password</FormLabel>
              <Input type="password"

                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Current Password"
              />
            </FormControl>
            {formik.touched.password && formik.errors.password ? (
              <p className="errors">{formik.errors.password}</p>
            ) : null}

            <FormControl id="new_password" isRequired>
              <FormLabel>New Password</FormLabel>
              <Input type="password"

                name="new_password"
                value={formik.values.new_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="New Password"
              />
            </FormControl>
            {formik.touched.new_password && formik.errors.new_password ? (
              <p className="errors">{formik.errors.new_password}</p>
            ) : null}

            <FormControl id="confirm_password" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password"

                name="confirm_password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Confirm Password"
              />
            </FormControl>
            {formik.touched.confirm_password && formik.errors.confirm_password ? (
              <p className="errors">{formik.errors.confirm_password}</p>
            ) : null}
            <Stack spacing={6}>
              <Button
                type="button"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Submit
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </Form>
    </>
  );
}

export default ForgatePass;
