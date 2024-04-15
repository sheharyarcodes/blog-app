import React from "react";
import appwriteService from "@/appwrite/appwriteConfig";
import {
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

const PostCard = ({ $id, title, content, featuredImage, category }) => {
  const { getFilePreview } = appwriteService();
  return (
    <Link to={`/post/${$id}`}>
      <Card className="">
        <CardContent>
          <img className="" src={getFilePreview(featuredImage)} alt={title} />
          <CardTitle className="">{title}</CardTitle>
          <h2 className="">{category}</h2>
          <CardDescription className="">{content}</CardDescription>
        </CardContent>
      </Card>
      ;
    </Link>
  );
};

export default PostCard;
