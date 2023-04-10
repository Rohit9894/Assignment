import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import CreateUserModal from "../components/CreateUserModal";
import UserCard from "../components/UserCard";
import Loading from "../assets/Loading";
import { HelpState } from "../context/Helprovider";
import { Link } from "react-router-dom";
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
function Users() {
  const { userData, userLoading } = HelpState();

  return (
    <div>
      <Flex w="100%" pt="70px">
        <Box w={["20%", "30%", "30%", "20%"]} display={["none", "block"]}>
          <Stack w="inherit" position={"fixed"} top="80px" left="10px" gap={4}>
            <CreateUserModal>Create New User</CreateUserModal>
            <Link to="/users/analytics">
              <Box {...style.sidebar}>Analytics</Box>
            </Link>
          </Stack>
        </Box>
        <Box m="auto" w={["90%", "70%", "60%", "40%"]}>
          {userLoading ? (
            <Loading />
          ) : userData.length === 0 ? (
            <Box py="40px" bg="white">
              <Heading textAlign={"center"}>Sorry</Heading>
              <Heading textAlign={"center"}>There is no post</Heading>
            </Box>
          ) : (
            <Box>
              {userData.map((item) => (
                <UserCard
                  key={item?._id}
                  name={item?.name}
                  email={item?.email}
                  bio={item?.bio}
                  userId={item?._id}
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

export default Users;
