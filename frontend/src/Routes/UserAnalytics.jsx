import { Box, Flex, Heading } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UserCard from "../components/UserCard";

function UserAnalytics() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [data, setData] = useState([]);
  const getCount = () => {
    axios
      .get("https://clumsy-bat-sarong.cyclic.app/analytics/users")
      .then(({ data }) => {
        setTotalUsers(data.count);
      })
      .catch((err) => console.log(err));
  };
  const getData = () => {
    axios
      .get("https://clumsy-bat-sarong.cyclic.app/analytics/users/top-active")
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
            w={["90%", "50%"]}
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
              <Heading>Total Users</Heading>
              <Heading textAlign={"center"}>{totalUsers}</Heading>
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
                  <UserCard
                    key={item._id}
                    name={item.name}
                    email={item.email}
                    bio={item.bio}
                    userId={item._id}
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

export default UserAnalytics;
