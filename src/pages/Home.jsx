import appwriteService from "@/appwrite/appwriteConfig";
import { Container, PostCard, Spinner } from "@/components";
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

  useEffect(() => {
    if (!authStatus) setPosts([]);
  }, [authStatus]);

  return (
    <Container className="flex justify-center flex-wrap gap-4 py-10">
      {!authStatus && (
        <h1 className="mx-auto font-bold text-4xl">Login to see posts.</h1>
      )}

      {posts.length > 0 ? (
        posts?.map((item) => <PostCard key={item.$id} {...item} />)
      ) : (
        <Spinner></Spinner>
      )}
    </Container>
  );
};

export default Home;
