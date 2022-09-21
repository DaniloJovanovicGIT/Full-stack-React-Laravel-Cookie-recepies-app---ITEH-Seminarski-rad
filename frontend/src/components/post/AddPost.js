import "../../styles/AddPost.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";

const AddPost = () => {

    const [categories, setCategories] = useState(null);
    const [cakes, setCoffees] = useState(null);

    useEffect(() => {
        if (cakes === null) {
            axios.get('http://localhost:8000/api/cake')
                .then((res) => {
                    setCoffees(res.data.cakes)
                }).catch((e) => {

            })
        }
    });

    useEffect(() => {

        if (categories === null) {
            axios.get('http://localhost:8000/api/category')
                .then((res) => {
                    setCategories(res.data.categories)
                }).catch((e) => {

            })
        }
    })


    const handleInput = (e) => {
        console.log(postInput)
        e.persist();
        setPostInput({
            ...postInput,
            [e.target.name]: e.target.value,
        });
    };

    let id = useParams();
    const [postInput, setPostInput] = useState(null);
    useEffect(() => {
        if (postInput === null && id.id !== undefined) {
            axios.get('http://localhost:8000/api/cake-post/' + id.id)
                .then((res) => {
                    console.log(res.data)
                    setPostInput(res.data.post)
                }).catch((e) => {
            })
        }
    })


    function sacuvajPost(e) {
        e.preventDefault()
        console.log(postInput)
        if (id.id !== null && id.id !== undefined) {
            axios.put('http://localhost:8000/api/cake-post/' + id.id, postInput, {
                headers: {
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')
                }
            })
                .then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        alert(res.data.message)
                        window.location.href = '/posts'
                    } else {
                        alert(res.data.error)
                    }
                }).catch((e) => {
                console.log(e)
            })
        } else {
            axios.post('http://localhost:8000/api/cake-post', postInput, {
                headers: {
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')
                }
            })
                .then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        alert(res.data.message)
                        window.location.href = '/posts'
                    } else {
                        alert(res.data.error)
                    }
                }).catch((e) => {
                console.log(e)
            })
        }
    }

    return (
        <div>

            <div className="blog">
                <form onSubmit={sacuvajPost}>
                    <input
                        type="text"
                        name="title"
                        className="title"
                        placeholder="Naslov novog članka..."
                        onChange={handleInput}
                        value={postInput == null ? '' : postInput.title}

                    />

                    <textarea
                        className="article"
                        name='post_content'
                        placeholder="Počnite da pišete ovde..."
                        onChange={handleInput}
                        value={postInput == null ? '' : postInput.post_content}
                    />
                    <div>
                        <label id="addPostLabel">Izaberi kategoriju </label>
                        <select name='category_id' onChange={handleInput}
                                value={postInput == null || postInput.category_id == null ? '' : postInput.category_id.id}>
                            <option value=''>Odaberi</option>
                            {categories == null ? <></> : categories.map((kategorija) => (
                                <option key={kategorija.id} value={kategorija.id}>{kategorija.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label id="addPostLabel">Izaberi kolac   </label>
                        <select name='cake_id' onChange={handleInput}
                                value={postInput == null || postInput.cake_id == null ? '' : postInput.cake_id.id}>
                            <option value>Nema</option>
                            {cakes == null ? <></> : cakes.map((cake) => (
                                <option key={cake.id} value={cake.id}>{cake.cake_name}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        className="publish-btn"
                        type='submit'
                    >Potvrdi
                    </button>
                </form>
            </div>
        </div>
    );
};
export default AddPost;
