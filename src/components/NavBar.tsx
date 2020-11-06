import React from "react";

import { Flex, Link } from "@chakra-ui/core";
import NextLink from "next/link";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex bg="tomato" p={4} justifyContent="flex-end">
      <NextLink href="/login">
        <Link p="0 4px">Login</Link>
      </NextLink>
      <NextLink href="/register">
        <Link p="0 4px">Register</Link>
      </NextLink>
    </Flex>
  );
};
