import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Flex } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

const Navbar = () => {
  const { loggedIn, user } = useAuth();
  const { items } = useCart();

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align="center"
      justify="space-between"
      px={{ base: 4, md: 20 }}
      py={2}
      bg="whitesmoke"
      boxShadow="0 2px 5px rgba(0, 0, 0, 0.1)">
      <Flex
        spacing={{ base: 2, md: 0 }}
        direction={{ base: "row", md: "row" }}
        align="center">
        <Box fontSize="1.7rem" fontWeight="900" m={2} p={1}>
          <Link to="/">E-Shop</Link>
        </Box>
        <Box m={3} fontWeight="500">
          <Link to="/">Products</Link>
        </Box>
        <Box m={3} fontWeight="500">
          <Link to="/about">About</Link>
        </Box>
      </Flex>

      <Flex align="center">
        {user?.role === "admin" && (
          <Link to="/admin">
            <Button
              bgColor="#cbdd54"
              color="#ffffff"
              border="none"
              p="10px 15px"
              borderRadius="12px"
              cursor="pointer"
              transition="background-color 0.3s ease"
              _hover={{ bgColor: "#085a0e" }}
              mr={4}>
              Admin
            </Button>
          </Link>
        )}

        {loggedIn ? (
          <>
            {items.length > 0 && (
              <Link to="/cart">
                <Button
                  bgColor="#cbdd54"
                  color="#ffffff"
                  border="none"
                  p="10px 15px"
                  borderRadius="12px"
                  cursor="pointer"
                  transition="background-color 0.3s ease"
                  _hover={{ bgColor: "#085a0e" }}
                  mr={4}>
                  Cart ({items.length})
                </Button>
              </Link>
            )}
            <Link to="/profile">
              <Button
                bgColor="#cbdd54"
                color="#ffffff"
                border="none"
                p="10px 15px"
                borderRadius="12px"
                cursor="pointer"
                transition="background-color 0.3s ease"
                _hover={{ bgColor: "#085a0e" }}>
                Profile
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/signin">
              <Button
                bgColor="#cbdd54"
                color="#ffffff"
                border="none"
                p="10px 15px"
                borderRadius="12px"
                cursor="pointer"
                transition="background-color 0.3s ease"
                _hover={{ bgColor: "#085a0e" }}
                mr={4}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                bgColor="#cbdd54"
                color="#ffffff"
                border="none"
                p="10px 15px"
                borderRadius="12px"
                cursor="pointer"
                transition="background-color 0.3s ease"
                _hover={{ bgColor: "#085a0e" }}>
                Register
              </Button>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
