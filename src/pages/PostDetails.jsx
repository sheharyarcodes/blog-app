import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/appwriteConfig";
import { Container, Spinner } from "../components";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

const PostDetails = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <Container className="py-10 md:px-30 lg:px-40 flex flex-col gap-2">
      <div className=" overflow-hidden rounded-sm w-full border-b-2 border-black relative">
        <img
          className="w-full h-full object-cover"
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt=""
        />

        {isAuthor && (
          <div className="absolute right-2 bottom-2 flex gap-2">
            <Link to={`/edit-post/${post.$id}`}>
              <Button size="sm">Edit</Button>
            </Link>
            <Button size="sm" variant="destructive" onClick={deletePost}>
              Delete
            </Button>
          </div>
        )}
      </div>

      <h2 className="bg-gray-200 w-fit rounded-full px-3 py-1 text-md font-semibold text-gray-700 capitalize ">
        {post.category}
      </h2>

      <h1 className="text-3xl font-bold">{post.title}</h1>

      <p className="">{post.content}</p>
    </Container>
  ) : (
    <Spinner></Spinner>
  );
};

export default PostDetails;
