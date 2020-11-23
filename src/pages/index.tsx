import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { VoteSection } from "../components/VoteSection";
import { PostsQuery, usePostsQuery } from "../generated/graphql";
import { EditDeletePostButtons } from "../utils/EditDeletePostButtons";

const Index = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 15,
      cursor: null,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    return (
      <div>
        <div>Unexpected error</div>
        <div>{error?.message}</div>
      </div>
    );
  }

  return (
    <Layout>
      {loading && !data ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Box key={p.id} p={5} shadow="md" borderWidth="1px">
                <Flex flexGrow={1}>
                  <VoteSection post={p} />
                  <Flex direction="column" mx={2} flexGrow={1}>
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
                  <Flex flexDirection="column" justifyContent="space-between">
                    <EditDeletePostButtons id={p.id} creatorId={p.creator.id} />
                  </Flex>
                </Flex>
              </Box>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore && (
        <Flex justifyContent="center">
          <Button
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables!.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                },
              });
            }}
            isLoading={loading}
            my={8}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default Index;
