import React, { useEffect, useState } from "react";
import PostCard from "../components/postcard/PostCard";
import service from "../appwrite/conf";
import Container from "../components/container/Container";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts([]).then((post) => {
      if (post) {
        setPosts(post.documents);
      }
    });
  }, []);

  if(posts.length===0){
    return <div>
        <h1>no post </h1>
    </div>
  }
  return <Container>
        {  posts.map((post)=>(
        <div>
            <PostCard {...post}/>
        </div>
    ))}
  </Container>;
}

export default Home;
