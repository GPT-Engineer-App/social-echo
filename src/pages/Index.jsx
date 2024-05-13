import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, IconButton, Input, Stack, Text, VStack, Textarea, useToast } from "@chakra-ui/react";
import { FaFacebook, FaThumbsUp, FaRegComment, FaRocket } from "react-icons/fa";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const toast = useToast();

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) {
      toast({
        title: "Error",
        description: "Post content cannot be empty.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newPost = {
      id: posts.length + 1,
      content: newPostContent,
      likes: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const handleLike = (postId) => {
    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });
    setPosts(updatedPosts);
  };

  return (
    <Container maxW="container.md" py={4}>
      <Flex mb={6} justifyContent="space-between" alignItems="center">
        <IconButton icon={<FaFacebook />} size="lg" colorScheme="facebook" aria-label="Facebook Icon" />
        <Text fontSize="2xl" fontWeight="bold">
          Mini Facebook
        </Text>
        <Box> {/* Placeholder for additional nav items */} </Box>
      </Flex>

      <VStack spacing={4}>
        <FormControl>
          <FormLabel htmlFor="post-content">Create Post</FormLabel>
          <Textarea id="post-content" value={newPostContent} onChange={(e) => setNewPostContent(e.target.value)} placeholder="What's on your mind?" />
          <Button mt={2} leftIcon={<FaRocket />} colorScheme="blue" onClick={handlePostSubmit}>
            Post
          </Button>
        </FormControl>

        {posts.map((post) => (
          <Box key={post.id} p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Text mb={2}>{post.content}</Text>
            <Stack direction="row" spacing={4}>
              <IconButton icon={<FaThumbsUp />} aria-label="Like post" onClick={() => handleLike(post.id)} />
              <IconButton icon={<FaRegComment />} aria-label="Comment on post" />
              <Text fontSize="sm">{post.likes} Likes</Text>
            </Stack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
