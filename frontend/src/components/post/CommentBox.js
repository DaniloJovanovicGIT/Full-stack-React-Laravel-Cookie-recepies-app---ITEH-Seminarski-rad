import React from "react";
import "../../styles/SingleBP.css";
import {AiOutlineUser} from "react-icons/ai";
import axios from "axios";

function CommentBox({comment}) {

    function obrisiKomentar(id) {
        let url = 'http://localhost:8000/api/coffee-post-comment/' + id;
        let token = 'Bearer ' + window.sessionStorage.getItem('auth_token');
        axios.delete(url, {
            headers: {
                'Authorization': token
            }
        })
            .then((res) => {
                alert(res.data)
                window.location.reload()
            }).catch((e) => {
            console.log(e)
        })
    }

    return (
        <>
            <div
                className="d-flex "
                style={{height: "160%", border: "1px solid rgba(0, 0, 0, 0.25)"}}
            >
                <div className="flex-shrink-0">
                    <AiOutlineUser style={{marginLeft: "2rem"}}/>
                </div>
                <div className="ms-3">
                    <div className="fw-bold" style={{paddingBottom: "1em"}}>
                        <b>{comment.user_id == null ? '' : comment.user_id.name + " " + comment.user_id.lastname}</b>
                    </div>
                    <div className="d-grid flex-column">
                        {comment.comment_content}
                        {((comment.user_id != null && window.sessionStorage.getItem('user_id') == comment.user_id.id) ||
                            window.sessionStorage.getItem('user_type') == 'admin') ?
                            <button
                                onClick={() => obrisiKomentar(comment.id)}
                                style={{
                                    marginLeft: "-3.5em",
                                    marginTop: "1em",
                                    marginBottom: "1em",
                                    height: "60%",
                                    width: "65%",
                                    backgroundColor: " #17181b",
                                    color: "white",
                                    border: " 3 px solid var(--primary)",
                                    transition: "all 0.3s ease-out",
                                    borderRadius: "10px",
                                }}> Obrisi </button> : <></>}
                    </div>
                </div>
            </div>
            <br></br>
        </>
    );
}

export default CommentBox;
