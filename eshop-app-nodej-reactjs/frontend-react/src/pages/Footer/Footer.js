import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";

function Footer() {
  return (
    <Box
      as="footer"
      p="4"
      mt="8"
      borderTop="1px"
      background={"gray.200"}
      borderColor="gray.200"
      textAlign="center">
      <Text fontSize="md" color="gray.700" fontWeight={700}>
        © {new Date().getFullYear()} My Awesome Website. All rights reserved.
      </Text>
      <Text fontSize="md" color="gray.700" fontWeight={700} mt="2">
        Created with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        by{" "}
        <Link
          color="blue.500"
          href="https://github.com/dxtaner"
          target="_blank">
          dxtaner
        </Link>
      </Text>
    </Box>
  );
}

export default Footer;
