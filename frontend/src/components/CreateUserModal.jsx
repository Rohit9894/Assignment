import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Img,
  FormLabel,
  Input,
  Button,
  Flex,
  Textarea,
} from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import { useState } from "react";
import axios from "axios";
import { HelpState } from "../context/Helprovider";

const style = {
  sidebar: {
    bg: "red.500",
    fontSize: "18px",
    p: "10px",
    w: "80%",
    borderRadius: "20px",
    textAlign: "center",
    color: "white",
    cursor: "pointer",
  },
  label: {
    mt: "10px",
    mb: "2px",
    fontWeight: "500",
  },
  input: {
    variant: "filled",
    border: "1px solid teal",
  },
};
const initValue = {
  name: "",
  email: "",
  bio: "",
};
export default function CreateUserModal({ children, listItem }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formState, setFormState] = useState(initValue);
  const { getData, Toast } = HelpState();
  function handleChange(e) {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }
  const { name, email, bio } = formState;
  function handleSubmit(onClose) {
    if (!name && !email) {
      return Toast("please fill the all fields", "warning");
    }
    axios
      .post("https://clumsy-bat-sarong.cyclic.app/users", formState)
      .then(({ data }) => {
        if (data.msg === "User already exist") {
          return Toast(data.msg, "warning");
        }
        if (data.msg === "Invalid Email") {
          return Toast(data.msg, "warning");
        }
        if (name.lenght > 50) {
          return Toast("name must contain less then 50 charcter");
        }
        if (bio.lenght > 50) {
          return Toast("bio must contain less then 200 charcter");
        }

        Toast("user created", "success");
        getData();
        onClose();
        setFormState(initValue);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {children ? (
        <Box {...style.sidebar} onClick={onOpen}>
          {children}
        </Box>
      ) : (
        <Box onClick={onOpen}>{listItem}</Box>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="red">Create User Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="20px">
            <Box>
              <Img h="60px" src={logo} alt="logo" m="auto" />
              <form>
                <FormLabel {...style.label}>Name</FormLabel>
                <Input
                  {...style.input}
                  name="name"
                  value={name}
                  required={true}
                  onChange={handleChange}
                />
                <FormLabel {...style.label}>Email</FormLabel>
                <Input
                  {...style.input}
                  name="email"
                  value={email}
                  required={true}
                  onChange={handleChange}
                />
                <FormLabel {...style.label}>Bio (optional)</FormLabel>
                <Textarea
                  {...style.input}
                  name="bio"
                  value={bio}
                  required={true}
                  onChange={handleChange}
                />
                <Flex justifyContent={"right"}>
                  <Button
                    onClick={() => handleSubmit(onClose)}
                    mt="20px"
                    px="20px"
                    colorScheme="blue"
                  >
                    Create User
                  </Button>
                </Flex>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
