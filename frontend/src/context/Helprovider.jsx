import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useContext, createContext } from "react";

const HelpContext = createContext();
function Helprovider({ children }) {
  const [userData, setUserData] = useState([]);

  const [userLoading, setUserLoading] = useState(false);
  const [postData, setPostData] = useState([]);
  const [postLoading, setPostLoading] = useState(false);
  const toast = useToast();
  const getData = () => {
    setUserLoading(true);
    axios
      .get("https://clumsy-bat-sarong.cyclic.app/users")
      .then(({ data }) => {
        setUserLoading(false);
        setUserData(data);
      })
      .catch((err) => console.log(err));
  };
  const getPost = () => {
    setPostLoading(true);
    axios
      .get("https://clumsy-bat-sarong.cyclic.app/posts")
      .then(({ data }) => {
        setPostLoading(false);
        setPostData(data);
      })
      .catch((err) => console.log(err));
  };
  function Toast(title, status, des) {
    toast({
      title: title,
      description: des ? des : "",
      status: status,
      duration: 1000,
      isClosable: true,
      position: "bottom",
    });
  }

  useEffect(() => {
    getPost();
    getData();
  }, []);
  return (
    <div>
      <HelpContext.Provider
        value={{
          getData,
          userData,
          userLoading,
          getPost,
          postData,
          postLoading,
          Toast,
        }}
      >
        {children}
      </HelpContext.Provider>
    </div>
  );
}
export const HelpState = () => {
  return useContext(HelpContext);
};

export default Helprovider;
