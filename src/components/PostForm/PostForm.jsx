import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { InputComponent, SelectComponent } from "..";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "@/appwrite/appwriteConfig";
import TextareaComponent from "../Textarea/TextareaComponent";
import { v4 as uuid } from "uuid";

const PostForm = ({ post }) => {
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.$id || "",
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
        const imageFile = data.image[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (imageFile) {
          appwriteService.deleteFile(post.featuredImage);
        }

        const databasePost = await appwriteService.updatePost(post.$id, {
          ...data,
          featuredImage: imageFile ? imageFile.$id : undefined,
        });

        if (databasePost) {
          navigate(`/post/${databasePost.$id}`);
        }
      } else {
        const imageFile = await appwriteService.uploadFile(data.image[0]);

        if (imageFile) {
          const fileId = imageFile.$id;
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
      console.log("postForm component:" + error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.trim().toLowerCase().replace(/ /g, "-");
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

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form
      onSubmit={handleSubmit(handlePost)}
      className="max-w-2xl flex flex-col mx-auto py-20 gap-4"
    >
      {post && (
        <div className="w-full mb-4">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-lg w-full"
          />
        </div>
      )}

      <InputComponent
        placeholder="Title"
        label="Title:"
        type="text"
        className=""
        {...register("title", {
          required: true,
        })}
      />

      <InputComponent
        placeholder="Slug"
        label="Slug:"
        type="text"
        className=""
        {...register("slug", {
          required: true,
        })}
        onInput={(e) => {
          setValue("slug", slugTransform(e.currentTarget.value), {
            shouldValidate: true,
          });
        }}
      />

      <TextareaComponent
        label="Content:"
        {...register("content", { required: true })}
      />

      <div className="flex justify-between">
        <InputComponent
          placeholder="Choose an image"
          label="Featured Image:"
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        <SelectComponent
          options={options}
          label="Category"
          placeholder="Select a category"
          {...register("category", { required: true })}
        />
      </div>

      <Button type="submit" className={`w-full ${post && "bg-green-500"}`}>
        {post ? "Update" : "Submit"}
      </Button>
    </form>
  );
};

export default PostForm;
