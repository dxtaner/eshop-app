import React, { useState, useEffect } from "react";
import AdminNav from "./AdminNav.js";
import { Box, Image } from "@chakra-ui/react";

function Admin() {
  const [randomImage, setRandomImage] = useState("");

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await fetch("https://picsum.photos/800/400");
        setRandomImage(response.url);
      } catch (error) {
        console.error("Error fetching random image:", error);
      }
    };

    fetchRandomImage();
  }, []);

  return (
    <>
      <AdminNav />
      <Box p={8} maxW="4xl" mx="auto">
        {randomImage && (
          <Image
            src={randomImage}
            alt="Random Image"
            mb={4}
            borderRadius="md"
            boxShadow="md"
          />
        )}
      </Box>
    </>
  );
}

export default Admin;
