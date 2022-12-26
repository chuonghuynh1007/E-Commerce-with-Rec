import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const HomeDis = ({ item }) => {
  const navigate = useNavigate();
  const { prodName, color, gender, image } = item;
  const id = item._id;
  // const [img, setImg] = useState(image);
  const [fname, setFname] = useState("normal");
  var img = require(`../../img/image/${image}`);

  // const ChangeHoverImage = () => {
  //   setImg(images[1]);
  //   setFname("bold");
  // };
  // const OriginalImage = () => {
  //   setImg(images[0]);
  //   setFname("normal");
  // };

  return (
    <div key={id} 
    // onMouseEnter={ChangeHoverImage} 
    // onMouseLeave={OriginalImage}
    >
      <Box
        width={["95%", "80%", "80%", "80%"]}
        onClick={() => navigate(`/description/${id}`)}
      >
        <Box overflow={"hidden"} position={"relative"}>
          <Image className="imageAnimation" src={img} alt={"try"} />
        </Box>
        <Text fontWeight={fname}>{prodName}</Text>
        <Text>
          {color} || {gender}
        </Text>
      </Box>
    </div>
  );
};

// const handleDes = () => {
//   navigate(`/description/${id}`);
// };
