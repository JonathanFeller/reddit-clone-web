import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { VoteSection } from "../components/VoteSection";
import {
  useDeletePostMutation,
  useMeQuery,
  usePostsQuery,
} from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as string | null,
  });
  const [{ data: postData, fetching }] = usePostsQuery({
    variables,
  });
  const [{ data: meData }] = useMeQuery();

  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !postData) {
    return <div>Unexpected error</div>;
  }

  return (
    <Layout>
      {fetching && !postData ? (
        <div>Loading...</div>
      ) : (
        <Stack spacing={8}>
          {postData!.posts.posts.map((p) =>
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
                  {meData?.me?.id !== p.creator.id ? null : (
                    <Flex flexDirection="column" justifyContent="space-between">
                      <NextLink
                        href="/post/edit/[id]"
                        as={`/post/edit/${p.id}`}
                      >
                        <IconButton
                          as={Link}
                          icon="edit"
                          aria-label="Edit Post"
                        />
                      </NextLink>
                      <IconButton
                        icon="delete"
                        aria-label="Delete Post"
                        onClick={() => {
                          deletePost({ id: p.id });
                        }}
                      />
                    </Flex>
                  )}
                </Flex>
              </Box>
            )
          )}
        </Stack>
      )}
      {postData && postData.posts.hasMore && (
        <Flex justifyContent="center">
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: postData.posts.posts[postData.posts.posts.length - 1].createdAt,
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
