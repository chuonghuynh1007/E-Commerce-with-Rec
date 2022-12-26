import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { getRecommend } from "../../redux/PagesReducer/action";
import { getData } from "../../redux/DataReducer/action";
import { HomeDis } from "../HomeDisplay/HomeDisplay";
import { getLocalData } from "../../utils/localStorage";
const Trending = ({ reccommendImg }) => {
  const dispatch = useDispatch();
  const products = useSelector((store) => store.dataReducer.products);
  const recD = useSelector((store) => store.pagesReducer.recD);
  // recD.splice(0,recD.length);
  // var recArray = products;
  const recImage = String(getLocalData("image"));
  // if(recD.find(o => String(o) === String(recImage).slice(0,-4))) recD.splice(0,recD.length);
  console.log("Recommend image: ", recImage);
  useEffect(() => {
    const rec = JSON.stringify(recImage);
    if(recImage) dispatch(getRecommend(rec));
    console.log(recD);
  }, [dispatch, recD?.length]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(getData());
    }
    // if(recD?.length > 0 && products.length > 0){
    //   for (var i = 0; i < recArray.length; i++) {
    //     if(!recD.find(o => String(o) === String(recArray[i].image).slice(0,-4))){
    //       recArray.splice(i,1);
    //       i-=1;
    //     }
    //   }
    // }
  }, [dispatch, products.length]);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
      <Box border="1px solid beige">
        <Heading align={"left"}> TOP PICS FOR YOU</Heading>
        <Slider {...settings}>
          {recD.length>0 && products.map((item) => {
              if(recD.find(o => String(o) === String(item.image).slice(0,-4))) return <HomeDis key={item.key} item={item} />;
            })}
          {/* {recArray.forEach((item, i) => {
              console.log("Item",item);
              return <HomeDis key={item.id} item={item} />;
            })} */}
        </Slider>
      </Box>
    </div>
  );
};

export default Trending;
