import React, { useRef, useState } from "react";
import { useCart } from "../../contexts/CartContext";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Grid,
  Heading,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { postOrder } from "../../api";
import { useToast } from "@chakra-ui/react";

function Cart() {
  const { items, removeFromCart, emptyCart } = useCart();
  const total = items.reduce((acc, item) => acc + item.price, 0);
  const toast = useToast();

  const [address, setAddress] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef();

  const handleSubmitForm = async () => {
    try {
      const itemIds = items.map((item) => item._id);

      const orderData = {
        address: address,
        items: JSON.stringify(itemIds),
      };

      await postOrder(orderData);

      emptyCart();
      onClose();

      toast({
        title: "Order Submitted",
        description: "Your order has been successfully submitted!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error submitting order:", error);

      toast({
        title: "Error",
        description: "An error occurred while submitting your order.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={10}>
      {items.length === 0 && <Alert status="warning">Cart is empty</Alert>}

      <Heading as="h2" mb="4" textAlign="center">
        Card
      </Heading>

      {items.length > 0 && (
        <>
          <Grid
            templateColumns={{
              base: "repeat(1, 3fr)",
              sm: "repeat(2, 3fr)",
              md: "repeat(3, 3fr)",
              lg: "repeat(4, 3fr)",
            }}
            gap={4}>
            {items.map((item) => (
              <Box
                key={item._id}
                mb={5}
                mr={5}
                border="1px solid gray"
                background="linear-gradient(to right, #d4d5d6, #e4e5e6)"
                p={4}
                borderRadius="md"
                boxShadow="md"
                display="flex"
                flexDirection="column"
                alignItems="center">
                <Link to={`/product/${item._id}`}>
                  <Image
                    src={item.photos[0]}
                    alt="cart item"
                    htmlWidth={250}
                    loading="lazy"
                    borderRadius="md"
                    mb={3}
                  />
                  <Text fontSize={18} fontWeight="800" p={2} textAlign="center">
                    {item.title}
                  </Text>
                  <Text
                    fontSize={24}
                    fontWeight="800"
                    color="green.800"
                    textAlign="center">
                    $ {item.price}
                  </Text>
                </Link>

                <Button
                  mt={3}
                  size="md"
                  colorScheme="red"
                  onClick={() => removeFromCart(item._id)}>
                  Remove from cart
                </Button>
              </Box>
            ))}
          </Grid>

          <Box mt={5} fontSize={18} fontWeight="900">
            <Text fontSize={22}>Total: $ {total}</Text>
          </Box>

          <Button mt={2} size="md" colorScheme="green" onClick={onOpen}>
            Order
          </Button>

          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderRadius="md">
              <ModalHeader fontSize="2xl" fontWeight="bold" textAlign="center">
                Confirm Your Order
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel fontSize="lg" fontWeight="bold">
                    Delivery Address
                  </FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Enter your delivery address"
                    value={address}
                    onChange={({ target }) => setAddress(target.value)}
                    size="lg"
                    borderRadius="md"
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter justifyContent="center">
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={handleSubmitForm}
                  mr={4}>
                  Place Order
                </Button>
                <Button
                  size="lg"
                  onClick={onClose}
                  variant="outline"
                  borderColor="blue.500">
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
}

export default Cart;
