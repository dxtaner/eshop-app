import { Box, Image, Button, Heading, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useCart } from "../../contexts/CartContext";

function Card({ product }) {
  const { addToCart, items } = useCart();
  const findCartItem = items.find((item) => item._id === product._id);

  const handleCartButtonClick = () => {
    addToCart(product, findCartItem);
  };

  return (
    <Box
      borderWidth="1px"
      overflow="hidden"
      border="2px solid gray"
      boxShadow="md"
      background="linear-gradient(to right, #d4d5d6, #e4e5e6)"
      borderRadius="md"
      p="3"
      className="card"
      transition="all 0.3s ease"
      _hover={{ boxShadow: "lg" }}
      display="flex"
      flexDirection="column"
      alignItems="center">
      <Image
        src={product.photos[0]}
        alt="Product Image"
        loading="lazy"
        className="card-image"
        objectFit="cover"
        height="250px"
      />

      <Box p="6" textAlign="center">
        <Text fontSize="sm" color="gray.400" mb="2">
          {moment(product.createdAt).format("DD/MM/YYYY")}
        </Text>

        <Link to={`product/${product._id}`}>
          <Heading as="h4" size="md" fontWeight="800" lineHeight="tight" mb="2">
            {product.title}
          </Heading>
        </Link>

        <Text fontSize="lg" fontWeight="800" color="green.800">
          $ {product.price}
        </Text>
      </Box>

      <Button
        colorScheme={findCartItem ? "red" : "green"}
        variant="solid"
        onClick={handleCartButtonClick}
        className="card-button"
        w="100%">
        {findCartItem ? "Remove from cart" : "Add to cart"}
      </Button>
    </Box>
  );
}

export default Card;
