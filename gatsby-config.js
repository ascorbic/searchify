require("dotenv").config();

module.exports = {
  siteMetadata: {
    title: "Searchify",
  },
  plugins: [
    "@chakra-ui/gatsby-plugin",
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
  ],
};
