import React from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from "../generated/graphql";
import gql from "graphql-tag";
import { ApolloCache } from "@apollo/client";

interface VoteSectionProps {
  post: PostSnippetFragment;
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });

  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          VoteStatue
        }
      `,
      data: { points: newPoints, voteStatus: value },
    });
  }
};

export const VoteSection: React.FC<VoteSectionProps> = ({ post }) => {
  const [vote, { loading }] = useVoteMutation();
  return (
    <Flex direction="column" alignItems="center">
      <IconButton
        onClick={() => {
          if (post.voteStatus === 1) return;
          vote({
            variables: { postId: post.id, value: 1 },
            update: (cache) => updateAfterVote(1, post.id, cache),
          });
        }}
        isLoading={loading}
        aria-label="Up"
        icon="chevron-up"
        size="sm"
        variantColor={post.voteStatus === 1 ? "green" : undefined}
      />
      {post.points}
      <IconButton
        onClick={() => {
          if (post.voteStatus === -1) return;
          vote({
            variables: { postId: post.id, value: -1 },
            update: (cache) => updateAfterVote(-1, post.id, cache),
          });
        }}
        isLoading={loading}
        aria-label="Down"
        icon="chevron-down"
        size="sm"
        variantColor={post.voteStatus === -1 ? "red" : undefined}
      />
    </Flex>
  );
};
