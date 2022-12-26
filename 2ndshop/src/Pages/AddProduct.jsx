import {
    Box,
    Heading,
    // Image,
    Button,
    Divider,
    HStack,
    Input,
    VStack,
    Stack,
    FormControl,
    FormLabel,
    Radio, RadioGroup,
    Checkbox, CheckboxGroup,
    Spinner
  } from "@chakra-ui/react";

  import {React, useState} from "react";
  import { useSelector } from "react-redux";
  import Navbar from "../components/Navbar/Navbar";
  import DataService from "../api/allAPI";
import { useNavigate } from "react-router-dom";
import { getLocalData } from "../utils/localStorage";
//   import WishListShow from "../components/wishlist/WishListShow";
  
  export const AddProduct = ({
    isLargerThan,
    FormSubmit,
    onChange,
  }) => {
    const navigate = useNavigate()
    // const initialState = {
    //   prodName:"",
    //   color:"ĐMM",
    //   gender:"",
    //   cate:"",
    //   price:"",
    //   size:"",
    //   image: "",
    // }

    // const [state, setState] = useState(initialState)
    var [prodName, setProdName] = useState('')
    var [color, setColor] = useState('')
    var [gender, setGender] = useState('')
    var [cate, setCate] = useState('')
    var [price, setPrice] = useState('')
    var [size, setSize] = useState('')
    var [imgName, setImgName] = useState('')
    var [selectedImage, setSelectedImage] = useState(null);
    var [addButton, setAddButton] = useState('ADD PRODUCT')
    FormSubmit = (e) =>{
      e.preventDefault();
      
      setAddButton(<Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='lg'
      />)
      const formData = new FormData();
      formData.append(
        "uploadImg",
        selectedImage,
        selectedImage.name
      );
      // formData.append("name", imgName);
      // console.log(formData.get("uploadImg"))
      // console.log(formData.get("uploadImg").name);
      var data = {
        text:{
          email: getLocalData("userInfo"),
          prodName: prodName,
          color: color,
          gender: gender,
          cate: cate,
          price: price,
          size: size,
          image: selectedImage.name
        },
        imgData: formData
      };
      console.log(data);
      DataService.addProduct(data)
      .then((r) => {
        console.log(r.data);
        // navigate("http://localhost:3000/", { replace: true });
      })
      .catch(err => {
        console.log(err);
        navigate("/", { replace: true });
      });


    }
    // var onFileUpload = () => {
    //   // Create an object of formData
    //   const formData = new FormData();
    //   // Update the formData object
    //   formData.append(
    //     "uploadImg",
    //     selectedImage,
    //     selectedImage.name
    //   );
    //   // Details of the uploaded file
    //   console.log(selectedImage);
    //   // Request made to the backend api
    //   // Send formData object
    //   axios.post("/product/addProdImg", formData)
    //   .then(function(res) {
    //     console.log(res.data);
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
    // };
    return (
      <div>
         <Navbar/> 
        
         <Box width={["95%", "90%", "35%", "35%"]}  m="auto" min-h="100vh">
        <form p="3rem" onSubmit={FormSubmit}>
            <Heading align={"center"} my={"5"}>
                ADD PRODUCT

            </Heading>

            <HStack spacing={"10"} my={"5"}>
                {/* <div>{state.prodName}</div> */}
                <Input
                // value={prodName}
                onChange={(e)=> setProdName(e.target.value)}
                type="text"
                name="prodname"
                placeholder="Name Product*"
                />
                {/* <Input
                onChange={onChange}
                type="text"
                name="lastName"
                placeholder="Color*"
                /> */}
                {/* <div>{prodName}</div> */}
            </HStack>

            <Box my={"5"}>
              <FormControl id="colortype" isRequired>
                <FormLabel>Colortype</FormLabel>

                    <RadioGroup defaultValue='Beige'
                    value={color}
                    onChange = {setColor}
                    >
                    <Stack spacing={6} direction='row'>
                        <Radio value='Beige'>Beige</Radio>
                        <Radio value='Black'>Black</Radio>
                        <Radio value='Blue'>Blue</Radio>
                        <Radio value='Brown'>Brown</Radio>
                        <Radio value='Green'>Green</Radio>
                        <Radio value='Grey'>Grey</Radio>
                    </Stack>

                    <Stack spacing={7} direction='row'>
                        <Radio value='Pink'>Pink</Radio>
                        <Radio value='Purple'>Purple</Radio>
                        <Radio value='Red'>Red</Radio>
                        <Radio value='Silver'>Silver</Radio>
                        <Radio value='White'>White</Radio>
                        <Radio value='Yellow'>Yellow</Radio>

                    </Stack>
                    </RadioGroup>
                    {/* <div>{state.color}</div> */}
              </FormControl>
            </Box>
            
            <Box my={"5"}>
                <FormControl id="gender" isRequired>
                    <FormLabel>Gender</FormLabel>

                    <RadioGroup defaultValue='Men' 
                    value={gender}
                    onChange = {setGender}
                    >
                        <Stack spacing={4} direction='row'>
                            <Radio value='Men'>Men</Radio>
                            <Radio value='Women'>Women</Radio>

                        </Stack>
                    </RadioGroup>
                </FormControl>
            </Box>
            
            <Box>
                <FormControl id="category" isRequired>
                    <FormLabel>Category</FormLabel>

                        <RadioGroup defaultValue='Apparel'
                           value={cate}
                          onChange = {setCate}
                        >
                        <Stack spacing={4} direction='row'>
                            <Radio value='Apparel'>Apparel</Radio>
                            <Radio value='Accessories'>Accessories</Radio>
                            <Radio value='Footwear'>Footwear</Radio>

                        </Stack>
                        </RadioGroup>
                </FormControl>
            </Box>

            <HStack spacing={"10"} my={"5"}>
                <Input
                // value={price}
                onChange={(e)=> setPrice(e.target.value)}
                type="text"
                name="original_price"
                placeholder="Original Price*"
                />
            </HStack>

            <Box>
                <FormControl id="size" isRequired>
                    <FormLabel>Size</FormLabel>
                        <RadioGroup colorScheme='blue' defaultValue='Small'
                           value={size}
                          onChange = {setSize}
                        >
                            <Stack spacing={[1, 5]} direction={['column', 'row']}>
                                <Radio value='Small'>Small</Radio>
                                <Radio value='Medium'>Medium</Radio>
                                <Radio value='Large'>Large</Radio>
                            </Stack>
                        </RadioGroup>
                </FormControl>
            </Box>

          {/* <VStack spacing={"10"} my={"10"}>
            <Input
              onChange={onChange}
              type="file"
              accept="image/*"
              name="addressLine1"
              placeholder="IMAGE*"
            />    
          </VStack> */}

            <Box spacing={"10"} my={"5"}>
                <FormControl id="mobile" isRequired>
                  <FormLabel>Upload a Product Image</FormLabel>
                  {selectedImage && (
                  <div>
                      <img alt="not fount" width={"500px"} src={URL.createObjectURL(selectedImage)} />
                      {/* <br /> */}
                      <button onClick={()=>{
                        setSelectedImage(null)
                        setImgName('')
                      }}>Remove</button>
                  </div>
                  )}

                <input
                    type="file"
                    accept="image/*"
                    name="myImage"
                    onChange={(e) => {
                      console.log(e.target.files[0].name);
                      setImgName( e.target.files[0].name)
                      setSelectedImage(e.target.files[0]);
                    }}
                />
                </FormControl>
            </Box>

          <Divider />
          
          <Button
            mt="2rem"
            width={["95%", "90%", "80%", "80%"]}
            my={"4"}
            bg={isLargerThan ? "black" : "grey"}
            color="whitesmoke"
            p="1.5rem 2rem"
            border={"3px solid beige"}
            _hover={{
              background: "none",
              color: "teal",
              border: "1px solid black",
            }}
            // onClick={onFileUpload}
            type="submit"
          >
            {addButton}
          </Button>
        </form>
      </Box>


      </div>
    );
  };
  
export default AddProduct;