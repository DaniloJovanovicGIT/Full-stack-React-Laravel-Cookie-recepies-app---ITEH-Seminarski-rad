import React, {useEffect} from "react";
import "../../styles/Posts.css";
import Post from "./Post";
import { useState } from "react";
import Sidebar from "../addition/Sidebar.js";
import axios from "axios";

function SelectedPosts() {
  const [posts,setPosts] = useState(null);
  useEffect(() => {
      console.log("Selected"+123)
         if (posts === null) {
        axios.get('http://localhost:8000/api/cake-post-newest')
            .then((res) => {
              setPosts(res.data.posts)
              console.log(res.data)
            }).catch((e) => {
        })
      }
  })
  return (
    <>
      <div className="home">
        <div className="selectedcards">
          {posts===null?<></>:
              posts.map((post) => (
              <Post post={post} key={post.id} />
          ))}
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default SelectedPosts;
