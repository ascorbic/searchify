import {
  Stack,
  Input,
  FormControl,
  FormLabel,
  Text,
  Progress,
  HStack,
  InputRightElement,
  Spinner,
  InputGroup,
} from "@chakra-ui/react";
import { GatsbyImage } from "gatsby-plugin-image";
import React, { useState } from "react";
import { useQuery } from "urql";
import { getShopifyImage } from "../components/hooks";

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

const ProductsQuery = `
  query($query: String!) {
    products(first: 20, query: $query) {
      edges {
        node {
          title
          id
          images(first: 1) {
            edges {
              node {
                originalSrc
                width
                height
                altText
              }
            }
          }
        }
      }
    }
  }
`;

// markup
const IndexPage = () => {
  const [searchValue, setSearchValue] = useState("");
  const [result, reexecuteQuery] = useQuery({
    query: ProductsQuery,
    variables: { query: searchValue },
    pause: !searchValue,
  });

  const { data, fetching, error } = result;
  return (
    <main style={pageStyles}>
      <title>Home Page</title>

      <Stack spacing={3}>
        <FormControl id="search">
          <FormLabel>Search</FormLabel>
          <InputGroup>
            <InputRightElement pointerEvents="none">
              {fetching && <Spinner />}
            </InputRightElement>
            <Input
              placeholder="T-shirt"
              size="lg"
              value={searchValue}
              onInput={(event) => setSearchValue(event.currentTarget.value)}
            />
          </InputGroup>
        </FormControl>
        {data && (
          <>
            {data?.products?.edges?.map(({ node }) => (
              <HStack key={node.id}>
                <GatsbyImage
                  image={getShopifyImage({
                    image: node.images.edges[0].node,
                    width: 50,
                    height: 50,
                    backgroundColor: "rebeccapurple",
                  })}
                  alt={node.title}
                />
                <Text>{node.title}</Text>
              </HStack>
            ))}
          </>
        )}
      </Stack>
    </main>
  );
};

export default IndexPage;
