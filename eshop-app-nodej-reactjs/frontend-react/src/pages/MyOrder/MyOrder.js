import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  List,
  ListItem,
  Text,
  Link,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import the CSS for react-confirm-alert
import { fetchMyOrders, deleteOrder } from "../../api";

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const toast = useToast();

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const userOrders = await fetchMyOrders();
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchUserOrders();
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      confirmAlert({
        title: "Confirm Deletion",
        message: "Are you sure you want to delete this order?",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              await deleteOrder(orderId);

              // If you want to update the state (setOrders) after successful deletion, uncomment the following line:
              setOrders((prevOrders) =>
                prevOrders.filter((order) => order._id !== orderId)
              );

              toast({
                title: "Order Deleted",
                description: "Your order has been successfully deleted.",
                status: "success",
                duration: 3000,
                isClosable: true,
              });
            },
          },
          {
            label: "No",
            onClick: () => {
              // Do nothing or add any specific behavior for "No" button click
            },
          },
        ],
      });
    } catch (error) {
      console.error("Error deleting order:", error);

      toast({
        title: "Error",
        description: "An error occurred while deleting your order.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={6} align="center" p={8} maxW="4xl" mx="auto">
      <Heading textAlign="center" fontSize="3xl">
        My Orders
      </Heading>
      {orders.length === 0 ? (
        <Text>No orders found.</Text>
      ) : (
        orders.map((order) => (
          <Box
            key={order._id}
            borderRadius="lg"
            border="1px solid gray"
            background="gray.100"
            p={4}
            boxShadow="lg"
            textAlign="left"
            w="100%">
            <Text fontWeight="800" mb={2}>
              My Products:
            </Text>
            <List styleType="disc" ml={4} mb={2}>
              {order.items.map((item) => (
                <ListItem key={item._id}>
                  <Link
                    href={`/product/${item._id}`}
                    m={2}
                    textDecoration="underline">
                    {item.title}
                  </Link>
                </ListItem>
              ))}
            </List>
            <Text fontWeight="300" mb={2}>
              Address: {order.address}
            </Text>
            <Text fontWeight="300" mb={2}>
              Date: {new Date(order.createdAt).toLocaleDateString()}
            </Text>
            <Text fontWeight="800" mt={4}>
              Total Price: $
              {order.items.reduce((total, item) => total + item.price, 0)}
            </Text>
            <Button
              mt={4}
              colorScheme="red"
              onClick={() => handleDeleteOrder(order._id)}>
              Delete Order
            </Button>
          </Box>
        ))
      )}
    </VStack>
  );
}

export default MyOrder;
