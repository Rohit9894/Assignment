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
  Text,
} from "@chakra-ui/react";
import logo from "../assets/logo.svg";
import { useState } from "react";
import axios from "axios";
import { HelpState } from "../context/Helprovider";

const style = {
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

export default function UpdateUserModal({
  name1,
  bio1,
  email1,
  userId,
  children,
}) {
  const { getData, Toast } = HelpState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formState, setFormState] = useState({
    name: name1,
    email: email1,
    bio: bio1,
  });
  function handleChange(e) {
    const { name, value } = e.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  }
  const { name, email, bio } = formState;
  function handleSubmit(id) {
    axios
      .put(`https://clumsy-bat-sarong.cyclic.app/users/${id}`, formState)
      .then((res) => {
        Toast("post updated", "success");
        getData();
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="red">Update User Form</ModalHeader>
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
                <FormLabel {...style.label}>
                  Email{" "}
                  <Text color="red" display={"inline"} ml="10px">
                    (You Cannot Change Email)
                  </Text>
                </FormLabel>
                <Input
                  {...style.input}
                  name="email"
                  value={email}
                  required={true}
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
                    onClick={() => handleSubmit(userId)}
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
