import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";

import PostCard from "../components/PostCard";
function SinglePostPage() {
  const [data, setData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://clumsy-bat-sarong.cyclic.app/posts/${id}`)
      .then(({ data }) => setData(data))
      .catch((err) => console.log(err));
  }, [id]);
  console.log(data);
  return (
    <div>
      <Box pt="70px" w={["90%", "50%"]} m="auto">
        {/* <Heading>{data.user name}</Heading> */}
        <PostCard
          content={data.content}
          like={data.likes}
          name={data?.user_id?.name}
        />

        <Box my="20px">
          <Link to="/posts">
            <Button colorScheme="blackAlpha">Go Back</Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default SinglePostPage;
