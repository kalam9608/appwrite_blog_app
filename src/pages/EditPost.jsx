import React, { useState } from "react";
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import service from "../appwrite/conf";
import PostCard from "../components/postcard/PostCard";

function EditPost() {
  const [posts, setPosts] = useState([]);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    }
  }, [slug.navigate]);

  return posts ? (
    <Container>
      {posts.map((post) => (
        <div>
          <PostCard post={post} />
        </div>
      ))}
    </Container>
  ) : null;
}

export default EditPost;
