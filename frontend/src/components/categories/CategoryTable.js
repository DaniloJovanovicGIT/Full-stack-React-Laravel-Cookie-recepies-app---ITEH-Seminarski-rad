import {useEffect, useState} from "react";
import "../../styles/Entity.css";
import axios from "axios";
import {Link} from "react-router-dom";

const CategoryTable = () => {

    function deleteCategory(id_category) {
        let url = 'http://localhost:8000/api/category/' + id_category;
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

    const [categories, setCategories] = useState(null);

    useEffect(() => {

        if (categories === null) {
            axios.get('http://localhost:8000/api/category')
                .then((res) => {
                    setCategories(res.data.categories)

                }).catch((e) => {

            })
        }

    }, [categories])

    return (
        <>
            <div className="coffeeTable">
                <div className="coffeeTableHeader">
                    <h2>Kategorije</h2>

                    <Link className="btnAddCoffee" to='/newCategory'>Dodaj novu kategoriju</Link>
                    <br/>
                </div>

                <table className="table">
                    <thead>
                    <tr id="tableCol">
                        <td>Naziv</td>
                        <td>Skracenica</td>
                        <td>Kreirano</td>
                        <td>Promenjeno</td>
                        <td>Obrisi</td>
                    </tr>
                    </thead>
                    <tbody id="tableBody">
                    {categories == null ? <></> : categories.map((k) => (
                        <tr key={k.id}>
                            <td>{k.name} </td>
                            <td>{k.slug}</td>
                            <td>{new Date(k.created_at).toLocaleDateString()}</td>
                            <td>{new Date(k.updated_at).toLocaleDateString()}</td>
                            <td>
                                <button className="btnDeleteCoffee" onClick={() => deleteCategory(k.id)}>
                                    obrisi
                                </button>
                            </td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </>
    );
};
export default CategoryTable;
