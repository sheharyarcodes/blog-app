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
    <Container>
      <div>
        {posts.map((item) => {
          <div key={item.$id}>
            <PostCard {...item} />
          </div>;
        })}
      </div>
    </Container>
  );
};

export default AllPosts;
