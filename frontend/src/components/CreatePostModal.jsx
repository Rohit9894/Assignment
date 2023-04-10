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
  Button,
  Flex,
  Textarea,
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

export default function CreatePostModal({ userId, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getPost, Toast } = HelpState();
  const [content, setContent] = useState("");
  function handleSubmit(onClose) {
    if (!content) {
      return Toast("please type something", "warning");
    }
    if (content.length > 300) {
      return Toast("content must be containg less than 300 character");
    }
    axios
      .post("https://clumsy-bat-sarong.cyclic.app/posts", {
        content,
        user_id: userId,
      })
      .then((res) => {
        Toast("post created", "success");
        getPost();

        onClose();
        setContent("");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="red">Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="20px">
            <Box>
              <Img h="60px" src={logo} alt="logo" m="auto" />
              <form>
                <FormLabel {...style.label}>Content</FormLabel>
                <Textarea
                  {...style.input}
                  name="bio"
                  value={content}
                  required={true}
                  onChange={(e) => setContent(e.target.value)}
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
