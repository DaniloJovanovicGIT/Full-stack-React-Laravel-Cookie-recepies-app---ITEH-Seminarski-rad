import React, {useEffect, useState} from "react";
import "../../styles/Posts.css";
import Post from "./Post";
import axios from "axios";

const AllPosts = () => {
  const [posts,setPosts] = useState(null);
  useEffect(() => {
      console.log("All posts"+123)
    if (posts === null) {
      axios.get('http://localhost:8000/api/coffee-post')
          .then((res) => {
            setPosts(res.data.posts)
          }).catch((e) => {
      })
    }
  })
  return (
    <>
      <div className="allcards">
        {posts===null?<></>:
            posts.map((post) => (
                <Post post={post} key={post.id} />
            ))}
      </div>
    </>
  );
};
export default AllPosts;
