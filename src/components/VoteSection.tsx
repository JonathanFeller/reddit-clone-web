import React from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import { PostSnippetFragment } from "../generated/graphql";

interface VoteSectionProps {
  post: PostSnippetFragment;
}

export const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  return (
    <Flex direction="column" alignItems="center">
      <IconButton aria-label="Up" icon="chevron-up" size="xs" />
      {post.points}
      <IconButton aria-label="Down" icon="chevron-down" size="xs" />
    </Flex>
  );
};
