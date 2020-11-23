import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/core";
import { Layout } from "../../components/Layout";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { EditDeletePostButtons } from "../../utils/EditDeletePostButtons";

export const Post = ({}) => {
  const {
    query: { data, loading },
  } = useGetPostFromUrl();

  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Wow, such empty</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex justifyContent="space-between">
        <Heading mb={4}>{data.post.title}</Heading>
        <Flex justifyContent="space-between" width={100}>
          <EditDeletePostButtons
            id={data.post.id}
            creatorId={data.post.creator.id}
          />
        </Flex>
      </Flex>
      <Box>{data?.post?.text}</Box>
    </Layout>
  );
};

export default Post;
