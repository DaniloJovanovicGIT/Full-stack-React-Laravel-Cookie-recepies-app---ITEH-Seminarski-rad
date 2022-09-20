import React from "react";
import {AiOutlineCalendar, AiOutlineUser, AiOutlineEye} from "react-icons/ai";
import {Button} from "../pageEssentials/Button";
import {Link} from "react-router-dom";

function Post({post}) {
    return (
        <>
            <div className="post">
                <div className="postInfo">
                    <div className="postTitle1">
                    <img class="img-fluid rounded" src="https://img.freepik.com/premium-vector/bakery-shop-logo-ideas-design-vector_434503-122.jpg?w=740" alt="sajadslaks" />

                        <Link to={'/singleBP/' + post.id}>{post.title}</Link>
                    </div>

                    <p className="postDate" style={{marginLeft: -200 + "px"}}>
                        <AiOutlineUser style={{marginLeft: "2rem"}}/>
                        {post.user_id.name}
                        <AiOutlineCalendar style={{marginLeft: "2em"}}/>
                        {(new Date(post.updated_at)).toLocaleDateString()}
                    </p>
                </div>
                <p className="postDesc">Kategorija: {post.category_id.name}</p>
            </div>
        </>
    );
}

export default Post;
