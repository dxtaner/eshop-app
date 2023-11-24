import Card from "../../components/Card/Card";
import { Flex, Grid, Button, Heading } from "@chakra-ui/react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../api";
import React from "react";

function Products() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage, pages) => {
      const morePagesExist = lastPage?.length >= 12;
      return morePagesExist ? pages.length + 1 : undefined;
    },
  });

  if (status === "loading") return "Loading...";

  if (status === "error") return `An error has occurred: ${error.message}`;

  return (
    <div>
      <Heading as="h2" mb="4" textAlign="center">
        Products
      </Heading>

      <Grid
        templateColumns={{
          base: "repeat(1, 3fr)",
          sm: "repeat(2, 3fr)",
          md: "repeat(3, 3fr)",
          lg: "repeat(4, 3fr)",
        }}
        gap={2}>
        {data &&
          data.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group.map((product) => (
                <Card key={product._id} product={product} />
              ))}
            </React.Fragment>
          ))}
      </Grid>
      <Flex mt="10" justifyContent="center">
        <Button
          onClick={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
          disabled={!hasNextPage || isFetchingNextPage}>
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </Button>
      </Flex>
    </div>
  );
}

export default Products;
