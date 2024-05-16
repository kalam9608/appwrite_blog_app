import React, { useEffect, useState } from "react";
import Container from "../components/container/Container";
import PostCard from "../components/postcard/PostCard";
import service from "../appwrite/conf";

function AllPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  return (
    <Container>
      {posts.map((post) => (
        <div>
          <PostCard post={post} />
        </div>
      ))}
    </Container>
  );
}

export default AllPosts;
