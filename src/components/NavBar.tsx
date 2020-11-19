import React from "react";
import NextLink from "next/link";
import { Box, Button, Flex, Link } from "@chakra-ui/core";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
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
        <Button
          m="0 4px"
          variant="link"
          onClick={() => logout()}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );
    //Logged in
  }

  return (
    <Flex bg="tan" p={4} justifyContent="flex-end">
      {body}
    </Flex>
  );
};
