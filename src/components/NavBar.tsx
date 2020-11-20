import React from "react";
import NextLink from "next/link";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";
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
      <Flex alignItems="center">
        <NextLink href="/create-post">
          <Button as={Link} mx={2}>
            Create Post
          </Button>
        </NextLink>
        <Box mx={2}>{data.me.username}</Box>
        <Button
          mx={2}
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
    <Flex bg="tan" p={4} justifyContent="space-between" alignItems="center">
      <NextLink href="/">
        <Link>
          <Heading>Reddit-Clone</Heading>
        </Link>
      </NextLink>
      {body}
    </Flex>
  );
};
