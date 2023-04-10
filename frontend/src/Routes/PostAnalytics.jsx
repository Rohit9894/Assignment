import { Box, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

function PostAnalytics() {
  const [totalPosts, setTotalPosts] = useState(0);
  const [data, setData] = useState([]);
  const getCount = () => {
    axios
      .get("https://clumsy-bat-sarong.cyclic.app/analytics/posts")
      .then(({ data }) => {
        setTotalPosts(data.count);
      })
      .catch((err) => console.log(err));
  };
  const getData = () => {
    axios
      .get("https://clumsy-bat-sarong.cyclic.app/analytics/posts/top-liked")
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getCount();
    getData();
  }, []);
  console.log(data);
  return (
    <div>
      <Box pt="70px">
        <Flex
          flexDirection={["column", "row"]}
          w={["90%", "80%", "90%", "80%"]}
          m="auto"
        >
          <Flex
            w={["100%", "50%"]}
            h={["100px", "90vh"]}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              bg="blackAlpha.500"
              position={"fixed"}
              color="white"
              zIndex={11}
              p="10px"
            >
              <Heading>Total Posts</Heading>
              <Heading textAlign={"center"}>{totalPosts}</Heading>
            </Box>
          </Flex>
          <Box w={["100%", "50%"]}>
            {data.length === 0 ? (
              <Box py="40px" bg="white">
                <Heading textAlign={"center"}>Sorry</Heading>
                <Heading textAlign={"center"}>There is no post</Heading>
              </Box>
            ) : (
              <Box>
                {data?.map((item) => (
                  <PostCard
                    key={item._id}
                    name={item?.user_id?.name}
                    content={item.content}
                    postId={item._id}
                    like={item.likes}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
    </div>
  );
}

export default PostAnalytics;
