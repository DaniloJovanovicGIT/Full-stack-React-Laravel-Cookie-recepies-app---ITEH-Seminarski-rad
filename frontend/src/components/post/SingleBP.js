import React, {useEffect, useState} from "react";
import "../../styles/SingleBP.css";
import CommentBox from "./CommentBox";
import {useParams} from "react-router-dom";
import axios from "axios";

function SingleBP() {
    let id = useParams();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);
    useEffect(() => {
        if (post === null) {
            axios.get('http://localhost:8000/api/coffee-post/' + id.id)
                .then((res) => {
                    console.log(res.data)
                    setPost(res.data.post)
                    setComments(res.data.comments);
                }).catch((e) => {
            })
        }
    })

    const handleInput = (e) => {
        e.persist();
        setComment({
            ...comment,
            [e.target.name]: e.target.value,
        });
    };

    const [comment, setComment] = useState(null);

    function sacuvajKomentar(e) {
        e.preventDefault()
        axios.post('http://localhost:8000/api/coffee-post-comment', {
            post_id: id.id,
            comment_content: comment.comment_content
        }, {
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')
            }
        })
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    alert(res.data.message)
                    window.location.reload()
                } else {
                    alert(res.data.error)
                }
            }).catch((e) => {
            console.log(e)
        })
    }

    return (
        <>
            {post === null ? <></> : <div className="container mt-4">
                <div className="row">
                    <div className="col-lg-11">
                        <article>
                            <header className="mb-4">
                                <h1 className="fw-bolder ">{post.title}</h1>
                                <div className="text-muted fst-italic mb-2">

                                    Postavljeno {(new Date(post.created_at)).toLocaleDateString()} Postavio {post.user_id.name} {post.user_id.lastname}
                                </div>
                                <p className="badge bg-dark text-decoration-none link-light">
                                    Kategorija: {post.category_id.name}
                                </p>
                            </header>
                            <section className="mb-8">
                                <p className="fs-5 mb-4">
                                    {post.post_content}
                                </p>
                            </section>
                            {post.coffee_id == null ? <></> : <section className="mb-8">
                                <p className="fs-5 mb-4">
                                    Naziv kafe: {post.coffee_id.coffee_name}
                                </p>
                                <p className="fs-5 mb-4">
                                    Vrsta kafe: {post.coffee_id.coffee_sort}
                                </p>
                                <p className="fs-5 mb-4">
                                    Opis kafe: {post.coffee_id.description}
                                </p>
                                <p className="fs-5 mb-4">
                                    Zemlja porekla: {post.coffee_id.country_origin}
                                </p>
                            </section>}
                        </article>
                        <section className="mb-5" style={{paddingBottom: 200 + "px"}}>
                            <div className="card bg-light">
                                <div className="card-body">
                                    {window.sessionStorage.getItem('auth_token') == null ? <></> : <>
                                        <form className="mb-4">
                    <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Ostavite komentar i pridruzi se diskusiji!"
                        onChange={handleInput}
                        name="comment_content"
                    />
                                            <button
                                                className=" col-lg-2 offset-lg-10"
                                                style={{
                                                    marginTop: 1 + "em",
                                                    backgroundColor: " #17181b",
                                                    color: "white",
                                                    border: " 3 px solid var(--primary)",
                                                    transition: "all 0.3s ease-out",
                                                }}
                                                type='button'
                                                onClick={sacuvajKomentar}
                                            >Potvrdi
                                            </button>
                                        </form>
                                    </>}
                                    <div>
                                        {comments === null ? <></> : comments.map((comment) => (
                                            <CommentBox key={comment.id} comment={comment}/>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>}
        </>
    );
}

export default SingleBP;
