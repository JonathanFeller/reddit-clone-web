import React from "react";
import NextLink from "next/link";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/core";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useApolloClient } from "@apollo/client";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const apolloClient = useApolloClient();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const { data } = useMeQuery();
  let body = null;

  if (!data?.me) {
    //Not logged in

    body = (
      <>
        <Button as={Link} mx={2}>
          Login
        </Button>
        <NextLink href="/login">
          <NextLink href="/register">
            <Link mx={2}>Register</Link>
          </NextLink>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <NextLink href="/create-post">
          <Button as={Link} mx={2}>
            Create Post
          </Button>
        </NextLink>
        <Box mx={2}>{data.me.username}</Box>
        <Button
          mx={2}
          variant="link"
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </>
    );
    //Logged in
  }

  return (
    <Flex bg="tan" p={4} justifyContent="center">
      <Flex flexGrow={1} justifyContent="space-between" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading>Reddit-Clone</Heading>
          </Link>
        </NextLink>
        <Flex alignItems="center">{body}</Flex>
      </Flex>
    </Flex>
  );
};
