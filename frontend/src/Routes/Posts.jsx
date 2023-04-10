import { Box, Flex, Heading, Stack } from "@chakra-ui/react";

import Loading from "../assets/Loading";
import { HelpState } from "../context/Helprovider";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
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
};
function Posts() {
  const { postData, postLoading } = HelpState();
  return (
    <div>
      <Flex pt="70px">
        <Box w={["20%", "30%", "30%", "20%"]} display={["none", "block"]}>
          <Stack w="inherit" position={"fixed"} top="80px" left="10px" gap={4}>
            <Link to="/users">
              <Box {...style.sidebar}>Create New Post</Box>
            </Link>
            <Link to="/posts/analytics">
              <Box {...style.sidebar}>Analytics</Box>
            </Link>
          </Stack>
        </Box>
        <Box m="auto" w={["90%", "70%", "60%", "40%"]}>
          {postLoading ? (
            <Loading />
          ) : postData.length === 0 ? (
            <Box py="40px" bg="white">
              <Heading textAlign={"center"}>Sorry</Heading>
              <Heading textAlign={"center"}>There is no post</Heading>
            </Box>
          ) : (
            <Box>
              {postData.map((item) => (
                <PostCard
                  key={item?._id}
                  name={item?.user_id?.name}
                  content={item?.content}
                  postId={item?._id}
                  like={item?.likes}
                />
              ))}
            </Box>
          )}
        </Box>
        <Box w="40%" display={["none", "none", "none", "block"]}></Box>
      </Flex>
    </div>
  );
}

export default Posts;
