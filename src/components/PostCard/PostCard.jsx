import React from "react";
import appwriteService from "@/appwrite/appwriteConfig";
import { Card } from "../ui/card";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, content, featuredImage, category }) => {
  const { getFilePreview } = appwriteService();
  return (
    <Link to={`/post/${$id}`}>
      <Card className="">
        <img className="" src={getFilePreview(featuredImage)} alt={title} />
        <h2 className="">{title}</h2>
        <h3 className="">{category}</h3>
        <p className="">{content}</p>
      </Card>
      ;
    </Link>
  );
};

export default PostCard;
