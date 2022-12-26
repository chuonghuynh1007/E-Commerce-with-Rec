import React, { useReducer,useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Editable,
  EditablePreview,
  EditableTextarea,
  Spinner,
  useToast,
  Radio, RadioGroup, SelectField
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/AuthReducer/action";
import {
  checkCharacter,
  checkEmail,
  checkMobile,
  checkPassword,
  checkSignupForm,
  setToast,
} from "../components/Other/CheckProperty";
import TutorialDataService from "../api/allAPI";

const initialState = {
  name: "",
  email: "",
  password: "",
  phone: "",
  confirm: "",
  gender: "Men",

  // description: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "gender":
      return { ...state, gender: action.payload };
    case "phone":
      return { ...state, phone: action.payload };
    case "confirm":
      return { ...state, confirm: action.payload };
    default:
      return state;
  }
};

const Signup = () => {
  // const [value, setValue] = React.useState('1')
  const [state, setState] = useReducer(reducer, initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const loading = useSelector((store) => store.AuthReducer.isLoading);
  const [eye, setEye] = useState(false);
  const handleEye = () => {
    setEye((prev) => !prev);
  };
  const signupHandle = () => {
    const isEmpty = checkSignupForm(state);
    if (!isEmpty.status) {
      return setToast(toast, isEmpty.message, "error");
    }
    const isCharacter = checkCharacter(state.name);
    if (!isCharacter.status) {
      return setToast(toast, isCharacter.message, "error");
    }
    const isEmail = checkEmail(state.email);
    if (!isEmail.status) {
      return setToast(toast, isEmail.message, "error");
    }
    const isPassword = checkPassword(state.password);
    if (!isPassword.status) {
      return setToast(
        toast,
        "Password must contain these things:",
        "error",
        3000,
        isPassword.message
      );
    }
    const isMobile = checkMobile(state.phone);
    if (!isMobile.status) {
      setToast(toast, isMobile.message, "error");
      return isMobile.status;
    }
    // try{
    //   TutorialDataService.signin(state).then((response) => {
    //     // this.setState({
    //     //   id: response.data.id,
    //     //   title: response.data.title,
    //     //   description: response.data.description,
    //     //   published: response.data.published,

    //     //   submitted: true
    //     // });
    //     console.log(response.data.data);
    //     navigate("/", { replace: true });
    //   })
    // } catch(e) {
    //     console.log(e);
    //   };
    dispatch(register(state, toast)).then((r) => {
      navigate("/home", { replace: true});
    });
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.100", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading
            textTransform={"uppercase"}
            fontSize={"4xl"}
            textAlign={"center"}
          >
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          // boxShadow={"lg"}
          p={8}
          // maxW={"800px"}
        >
          <Stack spacing={4} maxW="900px">
            <HStack>
              <Box  >
                <FormControl id="Name" isRequired>
                  <FormLabel >Name</FormLabel>
                  <Input 
                    htmlSize={4} width='400px'
                    type="text"
                    value={state.name}
                    onChange={(e) =>
                      setState({ type: "name", payload: e.target.value })
                    }
                  />
                </FormControl>
              </Box>
              {/* <Box>
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    value={state.username}
                    onChange={(e) =>
                      setState({ type: "username", payload: e.target.value })
                    }
                  />
                </FormControl>
              </Box> */}
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={state.email}
                onChange={(e) =>
                  setState({ type: "email", payload: e.target.value })
                }
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={eye ? "text" : "password"}
                  value={state.password}
                  onChange={(e) =>
                    setState({ type: "password", payload: e.target.value })
                  }
                />
                <InputRightElement h={"full"}>
                  <Button onClick={handleEye} variant={"ghost"}>
                    <ViewIcon />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="confirm" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={eye ? "text" : "confirm"}
                  value={state.confirm}
                  onChange={(e) =>
                    setState({ type: "confirm", payload: e.target.value })
                  }
                />
                <InputRightElement h={"full"}>
                  <Button onClick={handleEye} variant={"ghost"}>
                    <ViewIcon />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Box>
              <FormControl id="phone" isRequired>
                <FormLabel>Phone</FormLabel>
                <Input
                  type="number"
                  value={state.phone}
                  onChange={(e) =>
                    setState({ type: "phone", payload: e.target.value })
                  }
                />
              </FormControl>
            </Box>


            
            <Box>
              <FormControl id="gender" isRequired>
                <FormLabel>Gender</FormLabel>
                <RadioGroup defaultValue='Men'
                  value={state.gender}
                  onChange={
                    (val) =>
                    setState({ type: "gender", payload: val })
                  }
                  >
                  <Stack spacing={4} direction='row'>

                    <Radio value='Men'>Men</Radio>
                    <Radio value='Women'>Women</Radio>
                  </Stack>
                  {/* <div>{state.gender}</div> */}
                  {/* <div>
                    <input type="radio" name="radio" id="radio1" value="Men" onChange={(e) => this.radioChange(e)} /> Men
                    <input type="radio" name="radio" id="radio2" value="Women" onChange={(e) => this.radioChange(e)} /> Women
                  </div> */}

                </RadioGroup>

              </FormControl>
            </Box>

            

            {/* document.getElementById("gender").addEventListener("input", () => console.log(document.getElementById("gender").value)); */}

            
            {/* <Box>
              <FormLabel>Image</FormLabel>
              <Editable
                color={"darkgrey"}
                placeholder="Paste Link..."
                align={"left"}
              >
                <EditablePreview />
                <EditableTextarea
                  value={state.description}
                  onChange={(e) =>
                    setState({ type: "description", payload: e.target.value })
                  }
                />
              </Editable>
            </Box> */}
            
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"black"}
                color={"whitesmoke"}
                _hover={{
                  bg: "none",
                  color: "black",
                  border: "1px solid black",
                }}
                onClick={signupHandle}
              >
                {loading ? <Spinner /> : "Sign up"}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?
                <RouterLink to="/login" color={"blue.400"}>
                  Login
                </RouterLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Signup;
