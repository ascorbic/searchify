import * as React from "react";
import { createClient, Provider } from "urql";

const client = createClient({
  url: `${process.env.GATSBY_SHOPIFY_STORE}api/2021-01/graphql.json`,
  fetchOptions: {
    headers: {
      "X-Shopify-Storefront-Access-Token":
        process.env.GATSBY_SHOPIFY_STOREFRONT_TOKEN,
    },
  },
});

export const wrapRootElement = ({ element }) => {
  return <Provider value={client}>{element}</Provider>;
};
