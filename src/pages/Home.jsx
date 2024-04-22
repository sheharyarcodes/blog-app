import appwriteService from "@/appwrite/appwriteConfig";
import { Container, PostCard } from "@/components";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getAllPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <Container>
      home
      {posts?.map((item) => {
        <div key={item.$id}>
          <PostCard {...item} />
        </div>;
      })}
    </Container>
  );
};

export default Home;
