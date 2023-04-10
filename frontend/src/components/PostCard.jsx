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
  Image,
} from "@chakra-ui/react";
import React from "react";
import { BiEdit } from "react-icons/bi";
import {
  AiOutlineEye,
  AiFillDelete,
  AiOutlineLike,
  AiOutlineDislike,
} from "react-icons/ai";
import { Link } from "react-router-dom";

import axios from "axios";
import { HelpState } from "../context/Helprovider";
import UpdatePostModal from "./UpdatePostModal";

function PostCard({ name, content, postId, like }) {
  const { getPost, Toast } = HelpState();
  function handleDelete(id) {
    axios
      .delete(`https://clumsy-bat-sarong.cyclic.app/posts/${id}`)
      .then((res) => {
        Toast("post deleted", "success");
        getPost();
      })
      .catch((err) => console.log(err));
  }
  function handleLike(id, num) {
    console.log(id, num);
    axios
      .post(`https://clumsy-bat-sarong.cyclic.app/posts/${id}/like`, {
        likes: num,
      })
      .then((res) => getPost())
      .catch((err) => console.log(err));
  }
  function handleDisLike(id, num) {
    axios
      .post(`https://clumsy-bat-sarong.cyclic.app/posts/${id}/unlike`, {
        likes: num,
      })
      .then((res) => getPost())
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Card maxW="full" mt="10px" bg="#b7dee9">
        <CardHeader>
          <Flex spacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Avatar />
              <Box>
                <Heading size="md">{name}</Heading>
              </Box>
            </Flex>
            <Link to={`/posts/${postId}`}>
              <Button
                color={"white"}
                bg="blue"
                _hover={{ color: "white", background: "blue" }}
                variant="ghost"
                leftIcon={<AiOutlineEye />}
              >
                Veiw
              </Button>
            </Link>
          </Flex>
        </CardHeader>

        {content && (
          <CardBody>
            <Text fontSize={"16px"} fontWeight={"500"}>
              {content}
            </Text>
          </CardBody>
        )}
        <Image
          objectFit="cover"
          h="200px"
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Chakra UI"
        />

        <hr></hr>
        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "86px",
            },
          }}
        >
          <Button
            _hover={{ color: "white", background: "blue" }}
            variant="ghost"
            leftIcon={<AiOutlineLike />}
            onClick={() => handleLike(postId, like + 1)}
          >
            {like}
          </Button>

          <Button
            _hover={{ color: "white", background: "red" }}
            variant="ghost"
            leftIcon={<AiOutlineDislike />}
            onClick={() => handleDisLike(postId, like - 1)}
          >
            Dislike
          </Button>
          <UpdatePostModal content1={content} postId={postId}>
            <Button
              _hover={{ color: "white", background: "green" }}
              variant="ghost"
              leftIcon={<BiEdit />}
            >
              Edit
            </Button>
          </UpdatePostModal>
          <Button
            onClick={() => handleDelete(postId)}
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

export default PostCard;
