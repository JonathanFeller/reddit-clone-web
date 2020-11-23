import React from "react";
import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { useGetPostFromUrl } from "../../../utils/useGetPostFromUrl";
import { useUpdatePostMutation } from "../../../generated/graphql";
import { useRouter } from "next/router";
import { withApollo } from "../../../utils/withApollo";

export const EditPost = ({}) => {
  const router = useRouter();

  const {
    postId,
    query: { data, loading },
  } = useGetPostFromUrl();
  const [updatePost] = useUpdatePostMutation();

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
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          await updatePost({ variables: { id: postId, ...values } });
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Title" label="Title" />
            <Box mt={4}>
              <InputField
                name="text"
                placeholder="Text..."
                label="Body"
                textarea
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              variantColor="teal"
              isLoading={isSubmitting}
            >
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withApollo({ ssr: false })(EditPost);
