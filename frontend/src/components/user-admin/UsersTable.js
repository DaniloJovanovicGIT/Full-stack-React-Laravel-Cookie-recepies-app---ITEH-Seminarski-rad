import {useEffect, useState} from "react";
import "../../styles/Entity.css";
import {Link} from "react-router-dom";
import axios from "axios";

const UsersTable = () => {


    function deleteUser(id) {
        let url = 'http://localhost:8000/api/user/' + id;
        let token = 'Bearer ' + window.sessionStorage.getItem('auth_token');
        axios.delete(url, {
            headers: {
                'Authorization': token
            }
        }).then((res) => {
            alert(res.data)
            window.location.reload()
        }).catch((e) => {
            console.log(e)
        })
    }


    const [users, setUsers] = useState(null);

    useEffect(() => {
        if (users === null) {
            axios.get('http://localhost:8000/api/user', {
                headers: {
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')
                }
            }).then((res) => {
                if (res.data.success) {
                    console.log(res.data)
                    setUsers(res.data.users)
                } else {
                    alert(res.data.error);
                }
            }).catch((e) => {
                console.log(e)
            })
        }
    })

    return (
        <>
            <div className="coffeeTable">
                <div className="coffeeTableHeader">
                    <h2>Korisnici</h2>
                    <Link className="btnAddCoffee" to='/user'>
                        Dodaj novog korisnika
                    </Link>
                </div>

                <table className="table">
                    <thead>
                    <tr id="tableCol">
                        <td>Ime</td>
                        <td>Prezime</td>
                        <td>Email</td>
                        <td>Korisnicka uloga</td>
                        <td>Kreirano</td>
                        <td>Promenjeno</td>
                        <td>Obrisi</td>
                        <td>Izmeni</td>
                    </tr>
                    </thead>
                    <tbody id="tableBody">
                    {users == null ? <></> : users.map((u) => (
                        <tr key={u.id}>
                            <td>{u.name} </td>
                            <td>{u.lastname}</td>
                            <td>{u.email}</td>
                            <td>{u.user_role_id.role_name}</td>
                            <td>{new Date(u.created_at).toLocaleDateString()}</td>
                            <td>{new Date(u.updated_at).toLocaleDateString()}</td>
                            <td>
                                <button className="btnDeleteCoffee" onClick={() => deleteUser(u.id)}>obrisi</button>
                            </td>
                            <td>
                                <Link className="btnUpdateCoffee" to={'/user/' + u.id}>izmeni</Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </>
    );
};
export default UsersTable;
