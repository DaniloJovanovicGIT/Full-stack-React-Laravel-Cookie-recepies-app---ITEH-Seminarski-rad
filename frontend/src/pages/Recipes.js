import "../styles/Admin.css";
import {AiOutlineSearch} from "react-icons/ai";
import {useState} from "react";
import axios from "axios";

const Recipes = () => {

    const [input, setInput] = useState(
        {'pretraga': ''}
    );
    const handleInput = (e) => {
        e.persist();
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const [recipe, setRecipe] = useState(null);

    function traziRecept() {
        axios.get('https://api.api-ninjas.com/v1/recipe?query=' + input.pretraga, {
            headers: {
                'X-Api-Key': 'G0hLtdLsUGneZELkk97aSg==Tn5AtvIH94tQPKPD'
            }
        })
            .then((res) => {
                console.log(res)
                setRecipe(res.data)
            }).catch((e) => {
        })
    }

    return (
        <div className='container-Admin'>
            <div className='main'>
                <h2>Pronađi recept za sebe</h2>
                <div className="topbar">
                    <div className="search">
                        <label>
                            <input type="text" name='pretraga' onChange={handleInput} placeholder="Pretraži"/>
                            <div className="srch">
                                <button className="btnSearch" onClick={traziRecept}><AiOutlineSearch size={35}/>
                                </button>

                            </div>
                        </label>
                    </div>
                </div>
                <div className="Rcardbox">
                    {recipe == null ? <></> : recipe.map((r) => (
                        <div className="Rcard" key={r.title}>
                            <div>
                                <div className="RcardName"><h2>{r.title}</h2></div>
                            </div>
                            <div>
                                <div className="RcardName">{r.instructions}</div>
                            </div>
                            <div>
                                <div className="RcardName">{r.ingredients}</div>
                            </div>
                            <div>
                                <div className="RcardName">{r.servings}</div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Recipes;