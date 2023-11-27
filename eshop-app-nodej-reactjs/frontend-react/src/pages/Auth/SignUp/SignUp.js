import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Alert,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import validationSchema from "./validations.js";
import { fetchRegister } from "../../../api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { login } = useAuth();
  const nav = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await fetchRegister({
          email: values.email,
          password: values.password,
        });

        login(registerResponse);
        nav("/profile");
      } catch (e) {
        bag.setErrors({ general: e.response.data.message });
      }
    },
  });

  return (
    <Flex align="center" justify="center" h="100vh">
      <Box
        maxW="md"
        w="full"
        p={8}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg">
        <Heading mb={4}>Sign Up</Heading>
        {formik.errors.general && (
          <Alert mb={3} status="error">
            {formik.errors.general}
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              fontWeight={800}
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              isInvalid={formik.touched.email && formik.errors.email}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              fontWeight={800}
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              isInvalid={formik.touched.password && formik.errors.password}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Password Confirm</FormLabel>
            <Input
              name="passwordConfirm"
              type="password"
              fontWeight={800}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirm}
              isInvalid={
                formik.touched.passwordConfirm && formik.errors.passwordConfirm
              }
            />
          </FormControl>
          <Button colorScheme="yellow" width="full" type="submit" mt={4}>
            Sign Up
          </Button>
        </form>
      </Box>
    </Flex>
  );
}

export default Signup;
