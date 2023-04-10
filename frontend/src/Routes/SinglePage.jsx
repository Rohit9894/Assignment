import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Heading } from "@chakra-ui/react";
import UserCard from "../components/UserCard";
function SinglePage() {
  const [data, setData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://clumsy-bat-sarong.cyclic.app/users/${id}`)
      .then(({ data }) => setData(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div>
      <Box pt="70px" w={["90%", "50%"]} m="auto">
        <Heading>{data.name}</Heading>
        <UserCard
          name={data.name}
          email={data.email}
          bio={data.bio}
          userId={data._id}
        />

        <Box my="20px">
          <Link to="/users">
            <Button colorScheme="blackAlpha">Go Back</Button>
          </Link>
        </Box>
      </Box>
    </div>
  );
}

export default SinglePage;
