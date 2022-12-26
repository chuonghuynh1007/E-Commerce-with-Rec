import { Box, Flex, HStack, Icon, Image, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveLocalData, getLocalData } from "../../utils/localStorage";
// import { AiOutlineStar } from "react-icons/ai";
// import { StarIcon } from "@chakra-ui/icons";

const ProductDis = ({ item }) => {
  const navigate = useNavigate();
  const { prodName, color, gender, image, discount } = item;
  const id = item._id;
  // const [img, setImg] = useState(images[0]);
  const img = require(`../../img/image/${image}`);
  const handleDes = () => {
    console.log(getLocalData("image"));
    localStorage.removeItem("image");
    saveLocalData("image", image);
    console.log(getLocalData("image"));
    navigate(`/description/${id}`);
  };
  // const ChangeHoverImage = () => {
  //   setImg(images[0]);
  // };
  // const OriginalImage = () => {
  //   setImg(images[0]);
  // };

  // console.log(""images[1]);
  return (
    <div>
      <Box
        key={id}
        width={"95%"}
        m="auto"
        // onMouseEnter={ChangeHoverImage}
        // onMouseLeave={OriginalImage}
        onClick={handleDes}
        my={"3"}
      >
        <Box overflow={"hidden"} position={"relative"}>
          <Image className="imageAnimation" alt={prodName} src={img}/>
        </Box>
        <Box
          textAlign={"left"}
          color={"darkgrey"}
          fontSize={["xs", "sm", "md", "md"]}
        >
          <Text>{prodName}</Text>
          <Text>{gender}</Text>
          <Text>{color}</Text>
        </Box>
        <Flex
          justify={"left"}
          gap={"2rem"}
          fontWeight={"medium"}
          align={"center"}
        >
          {/* <Text as={Flex} alignItems={"center"}  fontSize={["xs", "sm", "md", "md"]}>
            <Icon as={StarIcon} color="yellow.500" /> : {rating}
          </Text> */}
          {/* <Text fontSize={["xs", "sm", "md", "md"]}>Review : ({reviews}) </Text> */}
        </Flex>
        <HStack justify={"left"}>
          <Text fontWeight={"semibold"} fontSize={["sm", "md", "lg", "xl"]}>
            {discount} VND
          </Text>
        </HStack>
      </Box>
    </div>
  );
};

export default ProductDis;
