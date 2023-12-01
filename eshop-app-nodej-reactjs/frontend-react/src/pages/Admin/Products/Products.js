import { useEffect, useState, useRef } from "react";
import {
  Text,
  Button,
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
  IconButton,
  useToast,
  Box,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Link, Link as RouterLink } from "react-router-dom";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { fetchProducts, deleteProduct } from "../../../api";
import AdminNav from "../AdminNav";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);
  const toast = useToast();

  const fetchProductData = async (pageParam) => {
    try {
      const data = await fetchProducts({ pageParam });
      setProducts(data);
      console.log(data.length);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData(currentPage);
  }, [currentPage]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDelete = async (productId) => {
    try {
      onOpen();
      setSelectedProductId(productId);
    } catch (error) {
      console.error("Error opening delete confirmation dialog:", error);
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      await deleteProduct(selectedProductId);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== selectedProductId)
      );
      toast({
        title: "Product Deleted",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "An error occurred while deleting the product.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      onClose();
      setSelectedProductId(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box mx="auto" maxW="1200px" p="4">
      <AdminNav />

      <Flex justifyContent="space-between" mb={5} alignItems="center">
        <Text fontSize="2xl" fontWeight={800}>
          Products
        </Text>
        <Link to="/admin/products/add">
          <Button colorScheme="teal">Add a product</Button>
        </Link>
      </Flex>

      <Table variant="simple" width="100%">
        <Tbody>
          {products.map((product) => (
            <Tr key={product._id}>
              <Td>
                <Link as={RouterLink} to={`/product/${product._id}`}>
                  <Box as="span" textDecoration="underline">
                    {product.title}
                  </Box>
                </Link>
              </Td>
              <Td>{product.price}</Td>
              <Td>{`${new Date(
                product.createdAt
              ).toLocaleDateString()} ${new Date(
                product.createdAt
              ).toLocaleTimeString()}`}</Td>

              <Td>
                <Link
                  as={RouterLink}
                  to={`/admin/products/product/${product._id}`}>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="yellow"
                    aria-label="Edit"
                    mr={2}
                  />
                </Link>
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  aria-label="Delete"
                  onClick={() => handleDelete(product._id)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Flex justifyContent="center" mt={5}>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          mr={2}>
          Previous
        </Button>
        <Button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={products.length < perPage || products.length === 0}>
          Next
        </Button>
      </Flex>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Product
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure you want to delete this product? This action is
            irreversible.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDeleteConfirmed} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default AdminProducts;
