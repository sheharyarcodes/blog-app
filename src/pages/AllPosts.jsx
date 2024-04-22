import appwriteService from "@/appwrite/appwriteConfig";
import { Container, PostCard } from "@/components";
import React, { useEffect, useState } from "react";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <Container className="flex flex-wrap gap-4 py-10">
      {posts?.map((item) => (
        <PostCard key={item.$id} {...item} />
      ))}
    </Container>
  );
};

export default AllPosts;
