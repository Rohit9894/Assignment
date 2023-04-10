import { Button, Flex, HStack, Img, Text } from "@chakra-ui/react";
import React from "react";

import logo from "../assets/logo.svg";
import { NavLink } from "react-router-dom";
import { RiMessage2Fill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import MenuBar from "./MenuBar";

function Navbar() {
  const activeStyle = {
    color: "blue",
  };
  return (
    <div>
      <Flex
        w="100%"
        position={"fixed"}
        zIndex={99}
        px="20px"
        h="60px"
        bg="teal.300"
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Flex alignItems={"center"}>
          <Img h="50px" src={logo} alt="logo" />
          <Flex ml={["25px", "80px"]} gap={["10px", "30px"]}>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              <HStack>
                <RiMessage2Fill size={"20px"} />{" "}
                <Text fontSize={"18px"}>Posts</Text>
              </HStack>
            </NavLink>

            <NavLink
              to="/users"
              style={({ isActive }) => (isActive ? activeStyle : null)}
            >
              <HStack>
                <FaUserCircle size={"20px"} />
                <Text fontSize={"18px"}>Users</Text>
              </HStack>
            </NavLink>
          </Flex>
        </Flex>
        <MenuBar>
          <Button mr={["10px", "40px"]}>
            <RxHamburgerMenu />
          </Button>
        </MenuBar>
      </Flex>
    </div>
  );
}

export default Navbar;
