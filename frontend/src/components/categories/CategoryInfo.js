import "../../styles/Entity.css";
import {useState} from "react";
import axios from "axios";

const CategoryInfo = () => {

    function sacuvajKategoriju(e) {
        e.preventDefault()
        axios.post('http://localhost:8000/api/category', categoryInput, {
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')
            }
        })
            .then((res) => {
                console.log(res.data)
                window.alert(res.data.message)

                if (res.data.success) {
                    window.location.href='/categories'
                }

            }).catch((e) => {
            console.log(e)
            window.alert(e.message + '\nProveri unos ')
        })
    }

    const [categoryInput, setCategory] = useState({
        name: "",
        slug: "",

    });

    const handleInput = (e) => {
        e.persist();
        setCategory({
            ...categoryInput,
            [e.target.name]: e.target.value,
        });


    };

    return (
        <>
            <div className="coffee">
                <form onSubmit={sacuvajKategoriju}>
                    <h1>Dodavanje kategorije</h1>
                    <div className="row">
                        <div className="column">
                            <label>Naziv</label>
                            <input type="text" name="name" placeholder="" onChange={handleInput}/>
                        </div>
                        <div className="column">
                            <label>Skracenica</label>
                            <input type="text" name="slug" placeholder="" onChange={handleInput}/>
                        </div>
                        <div className="column" >
                            <button className="publish-btn" type='submit'>Dodaj kategoriju</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default CategoryInfo;
