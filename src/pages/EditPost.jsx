import appwriteService from "@/appwrite/appwriteConfig";
import { Container, PostForm } from "@/components";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <Container>
      <PostForm post={post} />
    </Container>
  ) : null;
};

export default EditPost;
