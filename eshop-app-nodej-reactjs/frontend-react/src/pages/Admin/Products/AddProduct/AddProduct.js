import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../../../api";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Textarea,
  Flex,
} from "@chakra-ui/react";
import { message } from "antd";
import AdminNav from "../../AdminNav.js";
// import validationSchema from "./validations.js";

function getRandomPhotoUrl() {
  const width = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
  const height = Math.floor(Math.random() * (500 - 200 + 1)) + 200;
  return `https://picsum.photos/${width}/${height}`;
}

function generateRandomProduct() {
  const title = `Product ${Math.floor(Math.random() * 1000)}`;
  const price = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

  // Daha uzun bir description metni oluşturucu
  const generateRandomDescription = () => {
    const sentences = [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ];

    const randomSentences = Array.from({ length: 5 }, () => {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      return sentences[randomIndex];
    });

    return randomSentences.join(" ");
  };

  const description = generateRandomDescription();

  const photos = Array.from({ length: 3 }, getRandomPhotoUrl);

  return {
    title,
    price,
    description,
    photos,
  };
}

function AddProduct() {
  const nav = useNavigate();

  const [formData, setFormData] = useState(generateRandomProduct());

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleArrayChange = (index, value) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos[index] = value;
    setFormData({
      ...formData,
      photos: updatedPhotos,
    });
  };

  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos.splice(index, 1);
    setFormData({
      ...formData,
      photos: updatedPhotos,
    });
  };

  const handleAddPhoto = () => {
    setFormData({
      ...formData,
      photos: [...formData.photos, getRandomPhotoUrl()],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct({
        title: formData.title,
        price: formData.price.toString(),
        description: formData.description,
        photos: JSON.stringify(formData.photos),
      });
      message.success({
        content: "Product Created!",
        key: "create",
        duration: 2,
      });
      nav("/admin/products");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        message.error({
          content: "Error creating product: " + errors.title,
          key: "create",
          duration: 2,
        });
      } else {
        console.error("Error creating product:", error);
        message.error({
          content: "Error! The product was not added",
          key: "updatable",
          duration: 2,
        });
      }
    }
  };

  return (
    <div>
      <>
        <AdminNav m={2} />
      </>
      <Text fontSize={"2xl"} fontWeight={800} textAlign={"center"} m={2}>
        Add Product
      </Text>
      <Flex
        m={5}
        justifyContent="center"
        borderColor="gold"
        alignItems={"center"}
        borderWidth={3}
        p={5}
        boxShadow="md"
        borderRadius="md">
        <form onSubmit={handleSubmit} style={{ width: "80%" }}>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={5}>
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={5}>
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl mt={5}>
            <FormLabel>Photos</FormLabel>
            {formData.photos.map((photo, index) => (
              <Box mb={5} key={index}>
                <Input
                  name={`photos.${index}`}
                  value={photo}
                  onChange={(e) => handleArrayChange(index, e.target.value)}
                  w={"50%"}
                />
                <Button
                  ml={2}
                  colorScheme="red"
                  onClick={() => handleRemovePhoto(index)}>
                  Remove
                </Button>
              </Box>
            ))}
            <Button colorScheme="blue" onClick={handleAddPhoto}>
              Add a photo
            </Button>
          </FormControl>

          <Button colorScheme="green" mt={5} w={"full"} type="submit">
            Submit
          </Button>
        </form>
      </Flex>
    </div>
  );
}

export default AddProduct;
