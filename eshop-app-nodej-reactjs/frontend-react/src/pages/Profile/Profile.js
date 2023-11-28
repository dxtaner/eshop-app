import React from "react";
import { Box, Button, Heading, List, ListItem, Text } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const handleLogout = async () => {
    logout(() => nav("/"));
  };

  return (
    <Box p={8} maxW="4xl" mx="auto">
      <Heading mb={4} textAlign="center" fontSize="3xl">
        My Profile
      </Heading>
      <Box
        borderRadius="lg"
        border="1px solid gray"
        background="gray.100"
        p={4}
        boxShadow="lg"
        textAlign="left">
        <List spacing={3}>
          <ListItem>
            <Text fontWeight="800">User ID:</Text> {user._id}
          </ListItem>
          <ListItem>
            <Text fontWeight="800">Email:</Text> {user.email}
          </ListItem>
          <ListItem>
            <Text fontWeight="800">Role:</Text> {user.role}
          </ListItem>
          <ListItem>
            <Link to="/my-orders">
              <Button colorScheme="blue" variant="link">
                My Orders
              </Button>
            </Link>
          </ListItem>
        </List>
      </Box>

      <Button
        mt={8}
        colorScheme="red"
        variant="solid"
        onClick={handleLogout}
        width="full">
        Logout
      </Button>
    </Box>
  );
}

export default Profile;
