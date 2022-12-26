import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Carousel from "../components/Carousel/Carousel";
import Loading from "../components/Loading/Loading";
import Trending from "../components/Trends/Trending";
import { imagesData } from "../utils/data";
import Navbar from "../components/Navbar/Navbar"

const Home = () => {
  const loading = useSelector((store) => store.pagesReducer.isLoading);
  const navigate = useNavigate();
  return (
    <div>
      <Navbar/> <br/>
      {loading ? (
        <Loading />
      ) : (
        <Box w="95%" m="auto">
          <Carousel />
          {/* <Trending /> */}
        </Box>
      )}

      <Box my={"10"}>
        <Stack spacing={"5"} mx={"9"} my={"6"}>
          <Heading textAlign={"left"}>WHAT ARE YOU SHOPPING ?</Heading>
          <Box gap="1rem">
            {imagesData.map((item) => (
              <Box
                h={"100%"}
                overflow="hidden"
                position={"relative"}
                gridTemplateColumns={[1, 2, 3]}
              >
                <Image
                  transition={"all ease 0.3s"}
                  objectFit={"cover"}
                  position={"relative"}
                  w="100%"
                  h={"60vh"}
                  _hover={{
                    transform: "scale(1.2)",
                    transformOrigin: "50% 50%",
                  }}
                  src={item.link}
                  alt={item.title}
                />
                <Text
                  position={"absolute"}
                  color={"teal"}
                  top={["260px", "230px", "220px", "230px", "270px"]}
                  left={["15px", "50px", "50px", "50px", "50px"]}
                  fontSize={["2xl", "3xl", "4xl", "5xl", "6xl"]}
                  fontWeight={"bold"}
                >
                  {item.product}
                </Text>
                <Button
                  onClick={() => navigate(item.route, { replace: true })}
                  position={"absolute"}
                  top={["300px", "270px", "270px", "300px", "350px"]}
                  left={["15px", "50px", "50px", "50px", "50px"]}
                  p={"1rem 4rem"}
                  mt={0}
                  border={"none"}
                  _hover={{ transition: "0,5s", bg: "black", color: "white" }}
                >
                  SHOP NOW
                </Button>
              </Box>
            ))}
          </Box>
        </Stack>
      </Box>
      <Box my={"10"}>
        <Stack
          spacing={"5"}
          mx={"7"}
          my={"6"}
          w="95%"
          m="auto"
          textAlign={"left"}
        >
          <Heading>APPAREL, ACCESSORIES & FOOTWEAR</Heading>
          <Text fontSize={["sm", "md", "lg", "xl"]}>
            2nd Shop officially entered the Vietnamese market at the end of 2022, with the aim of creating an intermediary classifieds channel, connecting buyers and sellers together with extremely simple and convenient transactions. , fast, safe, bring unexpected effects.
            Up to now, 2nd Shop is proud to be the most popular classifieds website in Vietnam. Thousands of bargains from clothes, fashion accessories, shoes are posted, for sale on 2nd Shop.
          </Text>
        </Stack>
        <Flex
          my={"10"}
          bg="#4fc3f7"
          color={"black"}
          p="2rem "
          justify={"center"}
          gap="2rem"
          display={"block"}
        >
          <Heading>JOIN 2ND SHOP AND GET 20% OFF</Heading>
          <Button
            my={"5"}
            bg="black"
            color="whitesmoke"
            p="1.5rem 2rem"
            border={"0px solid beige"}
            _hover={{
              background: "none",
              color: "teal",
              border: "1px solid black",
            }}
            onClick={() => navigate("/register")}
          >
            Logout
          </Button>
        </Flex>
      </Box>
    </div>
  );
};

export default Home;
