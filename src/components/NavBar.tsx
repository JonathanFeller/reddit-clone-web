import React from "react";
import NextLink from "next/link";

import { Box, Flex, Link, Button } from "@chakra-ui/core";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data }] = useMeQuery();
  let body = null;

  if (!data?.me) {
    //Not logged in

    body = (
      <>
        <NextLink href="/login">
          <Link m="0 4px">Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link m="0 4px">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box m="0 4px">{data.me.username}</Box>
        <Button m="0 4px" variant="link">
          Logout
        </Button>
      </Flex>
    );
    //Logged in
  }

  return (
    <Flex bg="tomato" p={4} justifyContent="flex-end">
      {body}
    </Flex>
  );
};
