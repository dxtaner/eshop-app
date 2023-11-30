import { useState, useEffect } from "react";
import { fetchOrders } from "../../../api";
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Box,
} from "@chakra-ui/react";
import AdminNav from "../AdminNav";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Box>
      <AdminNav />
      <Text fontSize="2xl" fontWeight={800} textAlign="center" m={2}>
        Orders
      </Text>
      <Table variant="simple" size="md" mx="auto">
        <TableCaption>Order Details</TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Items</Th>
            <Th>Address</Th>
            <Th>Date</Th>
            <Th>Total Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map((order) => (
            <Tr key={order._id}>
              <Td>{order.user.email}</Td>
              <Td>{order.items.map((item) => item.title).join(", ")}</Td>
              <Td>{order.address}</Td>
              <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
              <Td textAlign="center">
                {order.items.reduce(
                  (totalPrice, item) => totalPrice + item.price,
                  0
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default AdminOrders;
