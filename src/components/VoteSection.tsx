import React from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface VoteSectionProps {
  post: PostSnippetFragment;
}

export const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const [{ fetching }, vote] = useVoteMutation();
  return (
    <Flex direction="column" alignItems="center">
      <IconButton
        onClick={() => {
          if (post.voteStatus === 1) return;
          vote({ postId: post.id, value: 1 });
        }}
        isLoading={fetching}
        aria-label="Up"
        icon="chevron-up"
        size="sm"
        variantColor={post.voteStatus === 1 ? "green" : undefined}
      />
      {post.points}
      <IconButton
        onClick={() => {
          if (post.voteStatus === -1) return;
          vote({ postId: post.id, value: -1 });
        }}
        isLoading={fetching}
        aria-label="Down"
        icon="chevron-down"
        size="sm"
        variantColor={post.voteStatus === -1 ? "red" : undefined}
      />
    </Flex>
  );
};
