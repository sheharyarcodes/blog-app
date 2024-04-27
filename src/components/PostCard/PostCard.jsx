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
  return (
    <Link to={`/post/${$id}`}>
      <Card className="w-[320px] overflow-hidden h-[320px]">
        <CardContent className="w-full p-0 pb-4 flex flex-col gap-1 h-full">
          <img
            className="h-2/3 mb-4 w-full object-cover"
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
          />
          <h2 className="bg-gray-200 w-fit rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mx-2 capitalize ">
            {category}
          </h2>
          <CardTitle className="mx-2">{title.slice(0, 20)}...</CardTitle>
          <CardDescription className="mx-2">
            {content.slice(0, 42)}...
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;
