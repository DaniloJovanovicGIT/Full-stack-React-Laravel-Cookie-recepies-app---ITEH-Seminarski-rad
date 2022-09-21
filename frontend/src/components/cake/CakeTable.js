import {useEffect, useState} from "react";
import "../../styles/Entity.css";
import axios from "axios";
import {Link} from "react-router-dom";

const CakeTable = () => {
    function deleteCake(id) {
        let url = 'http://localhost:8000/api/cake/' + id;
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


    const [cakes,setCakess] = useState(null);
    useEffect(() => {
        console.log("All posts"+123)
        if (cakes === null) {
            axios.get('http://localhost:8000/api/cake')
                .then((res) => {
                    setCakess(res.data.cakes)
                }).catch((e) => {
            })
        }
    }, [cakes])
    return (
        <>
            <div className="cakeTable">
                <div className="cakeTableHeader">
                    <h2>Torte</h2>
                    <Link className="btnAddCake" to='/cake'>
                        Dodaj novu tortu
                    </Link>
                </div>

                <table  className="table">
                    <thead>
                    <tr id="tableCol">
                        <td>Naziv</td>
                        <td>Vrsta</td>
                        <td>Poreklo</td>
                        <td>Kratak opis</td>
                        <td>Kreator</td>
                        <td>Kreirano</td>
                        <td>Promenjeno</td>
                        <td>Obrisi</td>
                        <td>Izmeni</td>
                    </tr>
                    </thead>
                    <tbody id="tableBody">
                    {cakes == null ? <></> : cakes.map((k) => (
                        <tr key={k.id}>
                            <td>{k.cake_name} </td>
                            <td>{k.cake_sort}</td>
                            <td>{k.vegan}</td>
                            <td>{k.description}</td>
                            <td>{k.user_id.name}</td>
                            <td>{new Date(k.created_at).toLocaleDateString()}</td>
                            <td>{new Date(k.updated_at).toLocaleDateString()}</td>
                            <td>
                                <button className="btnDeleteCake" onClick={()=>deleteCake(k.id)}>
                                    Obrisi
                                </button>
                            </td>
                            <td>
                                <Link
                                    className="btnUpdateCake"
                                    to={'/cake/'+k.id}
                                >Izmeni</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </>
    );
};
export default CakeTable;
