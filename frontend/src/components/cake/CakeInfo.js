import "../../styles/Entity.css";
import {Button} from "../pageEssentials/Button";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

const CakeInfo = () => {
    function sacuvaj(e) {
        e.preventDefault()
        if (id.id !== null && id.id !== undefined) {
            axios.put('http://localhost:8000/api/cake/' + id.id, cake, {
                headers: {
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')
                }
            })
                .then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        alert(res.data.message)
                        window.location.href = '/cakes'
                    } else {
                        alert(res.data.error)
                    }
                }).catch((e) => {
                console.log(e)
            })
        } else {
            axios.post('http://localhost:8000/api/cake', cake, {
                headers: {
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')
                }
            })
                .then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        alert(res.data.message)
                        window.location.href = '/cakes'
                    } else {
                        alert(res.data.error)
                    }
                }).catch((e) => {
                console.log(e)
            })
        }
    }

    const [cake,setCake]=useState(null);
    const handleInput = (e) => {
        console.log(cake)
        e.persist();
        setCake({
            ...cake,
            [e.target.name]: e.target.value,
        });
    };

    let id = useParams();
    useEffect(() => {
        if (cake === null && id.id !== undefined) {
            axios.get('http://localhost:8000/api/cake/' + id.id)
                .then((res) => {
                    console.log(res.data)
                    setCake(res.data.cake)
                }).catch((e) => {
            })
        }
    })

    return (
        <>
            <div className="cake">
                <h2>Torta</h2>
                <div className="row">
                    <div className="column">
                        <label>Naziv</label>
                        <input type="text" name='cake_name' onChange={handleInput}
                               value={cake == null ? '' : cake.cake_name}/>

                        <label>Vrsta</label>
                        <input type="text" name="cake_sort" onChange={handleInput}
                               value={cake == null ? '' : cake.cake_sort}/>

                         </div>
                    <div className="column">
                    <label>Kratak opis</label>
                        <br></br>
                        <textarea name="description" onChange={handleInput}
                               value={cake == null ? '' : cake.description}/>
                   <br></br>
                        <label>Poreklo</label>
                        <input type="text" name="country_origin" onChange={handleInput}
                               value={cake == null ? '' : cake.country_origin}/>
                    </div>
                </div>
                <div className="btnInfo" id="changeUserInfo">
                <Button
                    className="btnUpdateCakeInfo"
                    buttonStyle="color"
                    buttonSize="small"
                    text="Sacuvaj"
                    onClick={sacuvaj}
                />

            </div>
            </div>
            
        </>
    );
};
export default CakeInfo;
