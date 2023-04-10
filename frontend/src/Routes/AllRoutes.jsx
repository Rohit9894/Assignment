import React from "react";
import { Route, Routes } from "react-router-dom";
import Users from "./Users";
import Posts from "./Posts";
import SinglePage from "./SinglePage";
import SinglePostPage from "./SinglePostPage";
import UserAnalytics from "./UserAnalytics";
import PostAnalytics from "./PostAnalytics";

function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/analytics" element={<UserAnalytics />} />
        <Route path="posts/analytics" element={<PostAnalytics />} />
        <Route path="/users/:id" element={<SinglePage />} />
        <Route path="/posts/:id" element={<SinglePostPage />} />
      </Routes>
    </div>
  );
}

export default AllRoutes;
