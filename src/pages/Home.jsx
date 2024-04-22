import appwriteService from "@/appwrite/appwriteConfig";
import { Container, PostCard } from "@/components";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    appwriteService.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <Container className="flex flex-wrap gap-4 py-10">
      {!authStatus && (
        <h1 className="mx-auto font-bold text-4xl">Login to see posts.</h1>
      )}
      {posts?.map((item) => (
        <PostCard key={item.$id} {...item} />
      ))}
    </Container>
  );
};

export default Home;
