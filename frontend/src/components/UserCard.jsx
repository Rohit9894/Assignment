import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineEye, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import UpdateUserModal from "./UpdateUserModal";
import axios from "axios";
import { HelpState } from "../context/Helprovider";
import CreatePostModal from "./CreatePostModal";
function UserCard({ name, email, bio, userId }) {
  const { getData, Toast } = HelpState();
  function handleDelete(id) {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then((res) => {
        Toast("user deleted", "success");
        getData();
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Card maxW="full" mt="10px">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar color={"white"} background={"teal.500"} name={name} />

              <Box>
                <Heading size="md">{name}</Heading>
                <Text fontSize={"14px"}>{email}</Text>
              </Box>
            </Flex>
            <CreatePostModal userId={userId}>
              <Button colorScheme="blue">Create Post</Button>
            </CreatePostModal>
          </Flex>
        </CardHeader>
        {bio && <CardBody>{bio}</CardBody>}

        <hr></hr>
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          <Link to={`/users/${userId}`}>
            <Button
              _hover={{ color: "white", background: "blue" }}
              variant="ghost"
              leftIcon={<AiOutlineEye />}
            >
              Veiw
            </Button>
          </Link>
          <UpdateUserModal
            name1={name}
            email1={email}
            bio1={bio}
            userId={userId}
          >
            <Button
              _hover={{ color: "white", background: "green" }}
              variant="ghost"
              leftIcon={<BiEdit />}
            >
              Edit
            </Button>
          </UpdateUserModal>
          <Button
            onClick={() => handleDelete(userId)}
            _hover={{ color: "white", background: "red" }}
            variant="ghost"
            leftIcon={<AiFillDelete />}
          >
            Delete
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default UserCard;
