import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import appwriteService from "@/appwrite/appwriteConfig";
import { Container, PostCard, Spinner } from "@/components";
import { useSelector } from "react-redux";

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const { searchQuery } = useParams();
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!authStatus) setResults([]);
  }, [authStatus]);

  useEffect(() => {
    appwriteService.getAllPosts().then((posts) => {
      if (posts) {
        const newPosts = posts.documents;
        const filteredResults = newPosts.filter((post) =>
          post.title.toLowerCase().includes(searchQuery.replaceAll("-", " "))
        );

        setResults(filteredResults.reverse());
      }
    });
  }, [searchQuery]);

  return (
    <Container className="flex flex-wrap gap-4 py-10">
      {!authStatus && (
        <h1 className="mx-auto font-bold text-4xl">Login to see posts.</h1>
      )}

      {results.length > 0 ? (
        results?.map((item) => <PostCard key={item.$id} {...item} />)
      ) : (
        <Spinner></Spinner>
      )}
    </Container>
  );
};

export default SearchResults;
