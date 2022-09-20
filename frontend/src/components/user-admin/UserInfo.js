import "../../styles/Entity.css";
import {Button} from "../pageEssentials/Button";
import axios from "axios";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


const UserInfo = () => {


    const [roles, setRoles] = useState(null);
    useEffect(() => {
        if (roles === null) {
            axios.get('http://localhost:8000/api/user-role', {
                headers: {
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')
                }
            })
                .then((res) => {
                    console.log(res.data.roles)
                    setRoles(res.data.roles)
                }).catch((e) => {
            })
        }
    })


    function sacuvajKorisnika(e) {
        e.preventDefault()
        if (id.id !== null && id.id !== undefined) {
            axios.put('http://localhost:8000/api/user/' + id.id, user, {
                headers: {
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')
                }
            })
                .then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        window.alert(res.data.message)
                        window.location.href = '/users'
                    } else {
                        window.alert(res.data.error)
                    }
                }).catch((e) => {
                console.log(e)
            })
        } else {
            axios.post('http://localhost:8000/api/register-bez-tokena', user, {
                headers: {
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')
                }
            })
                .then((res) => {
                    console.log(res)
                    if (res.data.success) {
                        window.alert(res.data.message)
                        window.location.href = '/users'
                    } else {
                        window.alert(res.data.error)
                    }
                }).catch((e) => {
                console.log(e)
            })
        }
    }


    const [user, setUser] = useState(null);
    const handleInput = (e) => {
        console.log(user)
        console.log(roles)
        e.persist();
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    let id = useParams();
    useEffect(() => {
        if (user === null && id.id !== undefined) {
            axios.get('http://localhost:8000/api/user/' + id.id, {
                headers: {
                    'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token')
                }
            })
                .then((res) => {
                    console.log(res.data)
                    if (res.data.success) {
                        setUser(res.data.user)
                    } else {
                        window.alert(res.data.error)
                        return window.location.href = '/';
                    }
                }).catch((e) => {
            })
        }
    })


    return (
        <>
           
            <div className="coffee">
            <h3>Izmena profila</h3>
                <div className="row">
                    <div className="column">
                        <label>Ime</label>
                        <input type="text" name='name' onChange={handleInput}
                               value={user == null ? '' : user.name}/>

                        <label>Prezime</label>
                        <input type="text" name='lastname' onChange={handleInput}
                               value={user == null ? '' : user.lastname}/>

                        <label>Email</label>
                        <input type="text" name='email' onChange={handleInput}
                               value={user == null ? '' : user.email}/>
                    </div>
                    <div className="column">
                        <label>Sifra</label>
                        <input type="password" name='password' onChange={handleInput}/>

                        {window.sessionStorage.getItem('user_type') !== 'admin' ? <></> :
                            <>    <label>Korisnicka uloga</label>
                                <div className="in">
                                    <select name='user_role_id' onChange={handleInput}>
                                        {roles == null ? <></> : roles.map((role) => (
                                            <option key={role.id} value={role.id}>{role.role_name}</option>
                                        ))}
                                    </select>
                                </div>
                            </>}
                    </div>
                </div>
                <div className="btnInfo" id="changeUserInfo">
                <Button
                    className="btnUpdateCoffeeInfo"
                    buttonStyle="color"
                    buttonSize="small"
                    text="Sacuvaj"
                    onClick={sacuvajKorisnika}
                />
            </div>
            </div>
           
        </>
    );
};
export default UserInfo;
