import {useEffect, useState} from "react";
import "../../styles/Entity.css";
import axios from "axios";
import {Link} from "react-router-dom";

const PostTable = () => {
  function deletePost(id) {
    let url = 'http://localhost:8000/api/coffee-post/' + id;
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


  const [posts,setPosts] = useState(null);
  useEffect(() => {
    if (posts === null) {
      axios.get('http://localhost:8000/api/coffee-post')
          .then((res) => {
            setPosts(res.data.posts)
          }).catch((e) => {
      })
    }
  })



  return (
    <>
      <div className="coffeeTable">
        <div className="coffeeTableHeader">
          <h2>Clanci</h2>
          <Link className="btnAddCoffee" to={"/addPost/"} > Dodaj novi clanak</Link>
        </div>

        <table className="table" style={{ marginTop: "5px" }}>
          <thead>
            <tr id="tableCol">
              <td>Naslov</td>
              <td>Sadrzaj</td>
              <td>Kategorija</td>
              <td>Kafa</td>
              <td>Autor</td>
              <td>Kreirano</td>
              <td>Promenjeno</td>
              <td>Obrisi</td>
              <td>Pogledaj</td>
              <td>Izmeni</td>
            </tr>
          </thead>
          <tbody id="tableBody">
            {posts==null?<></>:posts.map((p) => (
                <tr key={p.id}>
                  <td>{p.title} </td>
                  <td>{p.post_content.substring(0, 20)}...</td>
                  <td>{p.category_id.name}</td>
                  <td>{p.coffee_id!==null?p.coffee_id.coffee_name:''}</td>
                  <td>{p.user_id.name}</td>
                  <td>{new Date(p.created_at).toLocaleDateString()}</td>
                  <td>{new Date(p.updated_at).toLocaleDateString()}</td>
                  <td>
                    <button className="btnDeleteCoffee" onClick={()=>deletePost(p.id)}>Obrisi</button>
                  </td>
                  <td>
                    <Link className="btnUpdateCoffee" to={"/singleBP/"+p.id}>Pogledaj</Link>
                  </td>
                  <td>
                   <Link className="btnUpdateCoffee" to={"/addPost/"+p.id} >Izmeni</Link>
                  </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  );
};
export default PostTable;
