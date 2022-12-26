import {
  Avatar,
  Box,
  Flex,
  Heading,
  Icon,
  // Spacer,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import portfolio from "../../img/portfolio.png";
import { BsGithub, BsLinkedin } from "react-icons/bs";
// import { GiCondorEmblem } from "react-icons/gi";
import { Link } from "react-router-dom";
const Footer = () => {
  const [isLargerThan] = useMediaQuery("(min-width: 768px)");
  const [isSmallerThan] = useMediaQuery("(min-width: 468px)");

  return (
    <div className="Footer">
      <Box
        bg="#525252"
        color="whitesmoke"
        height={isSmallerThan ? "40vh" : "40vh"}
        pt="3rem"
        lineHeight="2.5rem"
      >
        <Flex
          justify={"space-evenly"}
          width={["100%", "100%", "100%", "100%"]}
          textAlign={isSmallerThan ? "left" : "center"}
          fontSize={["sm", "md", "md", "md"]}
          flexDirection={isSmallerThan ? "row" : "column"}
        >
          <Box as={Flex} flexDirection="column">
            <Heading>Product</Heading>
            <Text as={Link} to="/allproducts?gender=MEN">Apparel Collection</Text>
            <Text as={Link} to="/allproducts?gender=WOMEN">Accessories Collection</Text>
            <Text as={Link} to="/allproducts?category=shoes" >Footwear Collection</Text>
            <Text as={Link} to="/allproducts?category=clothes">Clothes Collection</Text>
          </Box>

          {isSmallerThan ? (
            <Box>
              <Heading>Support</Heading>
              <Text>Help Center</Text>
              <Text>Customer Service</Text>
              <Text>Shipping</Text>
              <Text>Warranty Policy</Text>
            </Box>
          ) : null}

          {isLargerThan ? (
            <Box>
              <Heading>2nd Shop</Heading>
              <Text>About Us</Text>
              <Text>Privacy Policy</Text>
              <Text>Service</Text>
              <Text>2nd Shop Blog</Text>
            </Box>
          ) : null}
          <Box mt="1rem" display={"flex"} gap="1rem" justifyContent={"center"}>
            <a
              href="https://www.linkedin.com/"
              target={"_blank"}
              rel="noreferrer"
            >
              <Icon w={9} h={9} my="1rem" as={BsLinkedin} />
            </a>
            <a
              href="https://github.com/"
              target={"_blank"}
              rel="noreferrer"
            >
              <Icon w={9} h={9} my="1rem" as={BsGithub} />
            </a>
            {/* <a
              href="#"
              target={"_blank"}
              rel="noreferrer"
            >
              <Avatar w={10} h={10} my="1rem" bg="white" src={portfolio} />
            </a> */}
          </Box>
        </Flex>
      </Box>
    </div>
  );
};

export default Footer;
