import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api";
import { Box, Text, Button } from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from "react-image-gallery";
import { useCart } from "../../contexts/CartContext";

function ProductDetail() {
  const { addToCart, items } = useCart();
  const { product_id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ["product", product_id],
    queryFn: () => fetchProduct(product_id),
  });

  if (isLoading) return <Text>Loading...</Text>;

  if (error) return <Text>An error has occurred: {error.message}</Text>;

  const images = data.photos.map((url) => ({ original: url, thumbnail: url }));
  const findCartItem = items.find((item) => item._id === data._id);

  return (
    <Box
      textAlign="center"
      m={3}
      p={4}
      border="2px solid gray"
      boxShadow="md"
      background="linear-gradient(to right, #d4d5d6, #e4e5e6)"
      borderRadius="md">
      <Text as="h2" fontSize="2xl" fontWeight="800" mb={2}>
        {data.title}
      </Text>

      <Text color="gray.500" fontSize="sm" mb={4}>
        {moment(data.createdAt).format("DD/MM/YYYY")}
      </Text>

      <Text fontSize="2xl" fontWeight={500} mb={6}>
        {data.description}
      </Text>

      <Box m={5}>
        <ImageGallery items={images} />
      </Box>
      <Button
        colorScheme={findCartItem ? "red" : "green"}
        onClick={() => addToCart(data, findCartItem)}
        marginBottom={4}>
        {findCartItem ? "Remove from cart" : "Add to cart"}
      </Button>
    </Box>
  );
}

export default ProductDetail;
