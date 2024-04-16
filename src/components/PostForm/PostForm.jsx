import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputComponent, SelectComponent } from "..";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "@/appwrite/appwriteConfig";
import { Textarea } from "../ui/textarea";
import { v4 as uuid } from "uuid";

const PostForm = ({ post }) => {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      slug: post?.slug || "",
      category: post?.category || "",
    },
  });

  const options = [
    "Lifestyle",
    "Science",
    "Education",
    "Finance",
    "Health & Fitness",
    "Personal Development",
  ];

  const handlePost = async (data) => {
    try {
      if (post) {
        const imageFile = data.image[0] ? appwriteService.uploadFile : null;
        if (imageFile) {
          appwriteService.deleteFile(post.featuredImage);
        }

        const databasePost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: imageFile ? imageFile : undefined,
        });

        if (databasePost) {
          navigate(`/post/${databasePost.$id}`);
        }
      } else {
        const imageFile = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;

          const newPost = await appwriteService.createPost({
            ...data,
            userId: userData.$id,
          });

          if (newPost) {
            navigate(`/post/${newPost.$id}`);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return (
        value
          .trim()
          .toLocaleLowerCase()
          .replace(/^[a-zA-Z\d]+/g, "") + uuid()
      );
    } else {
      return "";
    }
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title, { shouldValidate: true }));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(handlePost)} className="">
      <InputComponent
        placeholder="Title"
        label="Title:"
        type="text"
        className=""
        {...register("title", {
          required: true,
        })}
      />

      <div>
        <label>Content:</label>
        <Textarea />
      </div>

      {post && (
        <div className="w-full mb-4">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-lg"
          />
        </div>
      )}

      <InputComponent
        placeholder="Choose an image"
        label="Featured Image:"
        type="file"
        className=""
        accept="image/png, image/jpg, image/jpeg, image/gif"
        {...register("image", { required: !post })}
      />
      {/* error: there might be a featuredImage instead of image */}

      <SelectComponent
        options={options}
        label="Category:"
        placeholder="Select a category"
        className=""
        {...register("category", { required: true })}
      />

      <Button type="submit" bgColor={post && "bg-green-500"} className="w-full">
        {post ? "Update" : "Submit"}
      </Button>
    </form>
  );
};

export default PostForm;
