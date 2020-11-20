import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { VoteSection } from "../components/VoteSection";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as string | null,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>Unexpected error</div>;
  }

  return (
    <Layout>
      <Flex mb={5} alignContent="center" justifyContent="space-between">
        <Heading>Reddit clone</Heading>
        <NextLink href="/create-post">
          <Link>Create Post</Link>
        </NextLink>
      </Flex>
      {fetching && !data ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Flex flexGrow={1}>
                <VoteSection post={p} />
                <Flex direction="column" ml={2} flexGrow={1}>
                  <Flex flexGrow={1} justifyContent="space-between">
                    <NextLink href="/post/id" as={`/post/${p.id}`}>
                      <Link>
                        <Heading>{p.title}</Heading>
                      </Link>
                    </NextLink>
                    <Text>Posted by {p.creator.username}</Text>
                  </Flex>
                  <Text>{p.textSnippet}</Text>
                </Flex>
              </Flex>
            </Box>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore && (
        <Flex justifyContent="center">
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            my={8}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
