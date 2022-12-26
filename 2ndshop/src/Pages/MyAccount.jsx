import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
const MyAccount = () => {
  const profileData = useSelector((state) => state.AuthReducer?.profileData);
  return (
    <div>
      <Box
        m="2rem"
        className="myaccount"
        h={"100vh"}
        bgImage={"linear-gradient(skyblue,royalblue)"}
      >
        <Heading w={"80%"} m={"auto"} className="heading">
          Hi! {profileData.length !== 0 ? profileData.name : "User"}! Thank you
          for visiting my website! My name is Huynh Phuoc Khai Chuong and I hope you like
          my Website.
        </Heading>
        <Flex
          alignItems={"center"}
          alignContent={"center"}
          h={"50vh"}
          w={"50%"}
          m={"auto"}
          my={"5"}
        >
          <Heading className="heading"> Follow Me : </Heading>
          <Flex justifyContent={"space-evenly"}>
            <Box>
              <Text>
                Github
                <a href="https://github.com/chuonghuynh1007" alt={"102190304"}>
                  <AiFillGithub fontSize={"45px"} />
                </a>
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Text fontSize={"30px"} color="white">
          Have A Great Day!
        </Text>
      </Box>
    </div>
  );
};

export default MyAccount;
