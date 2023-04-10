import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import CreatePostModal from "./CreatePostModal";
import CreateUserModal from "./CreateUserModal";

function MenuBar({ children }) {
  return (
    <div>
      <Menu mr="-20px" zIndex="111">
        <MenuButton>{children}</MenuButton>
        <MenuList>
          <CreateUserModal
            listItem={<MenuItem>Create User</MenuItem>}
          ></CreateUserModal>
          <CreatePostModal>
            <MenuItem>Create Post</MenuItem>
          </CreatePostModal>
          <Link to="/posts/analytics">
            <MenuItem>Post Analytics</MenuItem>
          </Link>
          <Link to="/users/analytics">
            <MenuItem>Users Anaytics</MenuItem>
          </Link>
        </MenuList>
      </Menu>
    </div>
  );
}

export default MenuBar;
