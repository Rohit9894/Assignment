import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

function Loading() {
  return (
    <div>
      <Stack>
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
        <Skeleton height="200px" />
      </Stack>
    </div>
  );
}

export default Loading;
