import React from "react";
import Posts from "../components/post/SelectedPosts.js";
import Galery from "../components/addition/Galery.js";
import "../styles/Start.css";
import Footer from "../components/navigation/Footer.js";

const Home = () => {
  return (
    <>
      <Galery />
      <Posts />
      <Footer/>

    </>
  );
};

export default Home;
