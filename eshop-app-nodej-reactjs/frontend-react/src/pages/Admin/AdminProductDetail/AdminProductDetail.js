import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../../../api";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Flex,
  Textarea,
  Alert,
} from "@chakra-ui/react";
import { message } from "antd";
import { FieldArray, Formik } from "formik";
import validationSchema from "./validations.js";
import AdminNav from "../AdminNav.js";

function ProductDetail() {
  const { product_id } = useParams();
  const nav = useNavigate();

  const [productData, setProductData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchProduct(product_id);
        setProductData(result);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [product_id]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (values, bag) => {
    message.loading({ content: "Loading...", key: "updatable" });

    try {
      await updateProduct(product_id, values);
      message.success({
        content: "Updated Product!",
        key: "updatable",
        duration: 2,
      });
      nav("/admin/products");
    } catch (e) {
      message.error({
        content: "Error! The product was not updated",
        key: "updatable",
        duration: 2,
      });
    }
  };

  return (
    <div>
      <>
        <AdminNav m={2} />
      </>
      <Text fontSize={"2xl"} fontWeight={800} textAlign={"center"} m={2}>
        Edit Product
      </Text>
      <Formik
        initialValues={{
          title: productData.title,
          price: productData.price,
          description: productData.description,
          photos: productData.photos,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({
          values,
          handleChange,
          handleSubmit,
          errors,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <>
            <Flex
              m={5}
              justifyContent="center"
              borderColor="gold"
              borderWidth={3}
              p={5}
              boxShadow="md"
              borderRadius="md">
              <form onSubmit={handleSubmit} style={{ width: "80%" }}>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    isInvalid={touched.title && errors.title}
                  />
                  {touched.title && errors.title && (
                    <Alert status="error" mt={2} w={"50%"}>
                      {errors.title}
                    </Alert>
                  )}
                </FormControl>

                <FormControl mt={5}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    isInvalid={touched.description && errors.description}
                  />
                  {touched.description && errors.description && (
                    <Alert status="error" mt={2} w={"50%"}>
                      {errors.description}
                    </Alert>
                  )}
                </FormControl>

                <FormControl mt={5}>
                  <FormLabel>Price</FormLabel>
                  <Input
                    name="price"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                    isInvalid={touched.price && errors.price}
                  />
                  {touched.price && errors.price && (
                    <Alert status="error" mt={2} w={"50%"}>
                      {errors.price}
                    </Alert>
                  )}
                </FormControl>

                <FormControl mt={5}>
                  <FormLabel>Photos</FormLabel>
                  <FieldArray
                    name="photos"
                    render={(arrayHelpers) => (
                      <div>
                        {values.photos &&
                          values.photos.map((photo, index) => (
                            <Box mb={5} key={index}>
                              <Input
                                name={`photos.${index}`}
                                value={photo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                disabled={isSubmitting}
                                w={"50%"}
                                isInvalid={touched.photos && errors.photos}
                              />
                              <Button
                                ml={2}
                                colorScheme="red"
                                onClick={() => arrayHelpers.remove(index)}>
                                Remove
                              </Button>
                            </Box>
                          ))}
                        <Button
                          colorScheme="blue"
                          onClick={() => arrayHelpers.push("")}>
                          Add a photo
                        </Button>
                      </div>
                    )}></FieldArray>
                  {touched.photos && errors.photos && (
                    <Alert status="error" mt={2} w={"50%"}>
                      {errors.photos}
                    </Alert>
                  )}
                </FormControl>

                <Button
                  colorScheme="green"
                  mt={5}
                  w={"full"}
                  type="submit"
                  isLoading={isSubmitting}>
                  Submit
                </Button>
              </form>
            </Flex>
          </>
        )}
      </Formik>
    </div>
  );
}

export default ProductDetail;
