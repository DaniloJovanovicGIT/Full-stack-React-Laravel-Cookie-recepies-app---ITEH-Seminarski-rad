import {useEffect, useState} from "react";
import "../../styles/Entity.css";
import axios from "axios";
import {Link} from "react-router-dom";

const CoffeeTable = () => {
    function deleteCoffee(id) {
        let url = 'http://localhost:8000/api/coffee/' + id;
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


    const [coffees,setCoffeess] = useState(null);
    useEffect(() => {
        console.log("All posts"+123)
        if (coffees === null) {
            axios.get('http://localhost:8000/api/coffee')
                .then((res) => {
                    setCoffeess(res.data.coffees)
                }).catch((e) => {
            })
        }
    }, [coffees])
    return (
        <>
            <div className="coffeeTable">
                <div className="coffeeTableHeader">
                    <h2>Kafe</h2>
                    <Link className="btnAddCoffee" to='/coffee'>
                        Dodaj novu kafu
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
                    {coffees == null ? <></> : coffees.map((k) => (
                        <tr key={k.id}>
                            <td>{k.coffee_name} </td>
                            <td>{k.coffee_sort}</td>
                            <td>{k.country_origin}</td>
                            <td>{k.description}</td>
                            <td>{k.user_id.name}</td>
                            <td>{new Date(k.created_at).toLocaleDateString()}</td>
                            <td>{new Date(k.updated_at).toLocaleDateString()}</td>
                            <td>
                                <button className="btnDeleteCoffee" onClick={()=>deleteCoffee(k.id)}>
                                    Obrisi
                                </button>
                            </td>
                            <td>
                                <Link
                                    className="btnUpdateCoffee"
                                    to={'/coffee/'+k.id}
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
export default CoffeeTable;
