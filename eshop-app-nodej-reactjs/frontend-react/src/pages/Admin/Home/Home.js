import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import AdminNav from "../AdminNav";

function AdminHome() {
  return (
    <div>
      <AdminNav />
      <Box
        p={8}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="lg"
        mx="auto"
        bgGradient="linear(to-r, gray.300, gray.200)">
        <Heading mb={4} textAlign="center" color="teal.600">
          Admin Dashboard
        </Heading>
        <Text fontSize="lg" textAlign="center">
          Welcome to the admin dashboard. Here, you can efficiently manage
          orders and products using the navigation menu.
        </Text>
      </Box>
    </div>
  );
}

export default AdminHome;
