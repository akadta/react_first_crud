import React from "react";
import { useState } from "react";

const genders = [
  {
    id: 1,
    name: "male",
  },
  {
    id: 2,
    name: "female",
  },
  {
    id: 3,
    name: "other",
  },
];

const testitems = [
  {
    id : 1 ,
    name : "shiras",
    gender: "male",
    age: "24"
  }
]

function App() {
  const [items, setItems] = useState(testitems);

  function Itemstore(item) {
    setItems((items) => [...items, item]);
  }
  function ItemDelete(id){
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function ItemUpdate(id , updatename){
    setItems((items)=> items.map((item) => item.id === id ?
  {...item, name : updatename} : item
  ));
  }

  return (
    <div className="container mt-5">
      <h1>Hello world</h1>
      <Form itemstore={Itemstore} />
      <Table items={items} itemdelete={ItemDelete} itemupdate={ItemUpdate} />
    </div>
  );
}

function Form({ itemstore }) {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  function handlesubmit(e) {
    e.preventDefault();

    const id = Date.now();
    const formdata = new FormData(e.target);
    const name = formdata.get("name");
    const gender = formdata.get("gender");
    const age = formdata.get("age");
    if (!name || !gender || !age) {
      alert("need to fill all fields");
      return;
    }

    const Newitems = { id, name, gender, age };
    itemstore(Newitems);

    e.target.reset();
  }

  return (
    <div className="mt-4">
      <form action="" onSubmit={handlesubmit}>
        <div className="">
          <div>
            <label htmlFor="" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name ..."
              name="name"
            />
          </div>
          <div>
            <label htmlFor="" className="form-label">
              Gender
            </label>
            <select name="gender" id="" className="form-select">
              <option value="">SELECT</option>
              {genders.map((gender) => (
                <option value={gender.name} key={gender.id}>
                  {gender.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="" className="form-label">
              Age
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter name ..."
              name="age"
            />
          </div>
          <div className="d-flex mt-3 justify-content-center">
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Table({ items , itemdelete ,itemupdate }) {

  
  const [ updatename, setUpdateName ] = useState("");

  function Namechange(e){
    setUpdateName(e.target.value)
  }

    const [ getItem , setGetitem ] = useState({});

    function currentitem(item){
setGetitem(item);
setUpdateName(item.name);
    }

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Age</th>
            <th className="text-danger">Action</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <Rows item={item} itemdelete={itemdelete} key={item.id} currentitem={currentitem} />
          ))}
        </tbody>
      </table>

                      <UpdateModal getitem ={getItem}
                       itemupdate={itemupdate}
                        namechange={Namechange}
                      updatename ={updatename}
                      />

    </div>
  );
}

function Rows({ item , itemdelete ,currentitem}) {
  //const gender = genders.find((g) => g.id === Number(item.gender)) ?. name;


  return (
    <>
      <tr>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.gender}</td>
        <td>{item.age}</td>
        <td>
          <button className="btn btn-danger"
          onClick={()=>{
            if(window.confirm("Are u sure u want delete "+ item.name)){
              itemdelete(item.id);
            }
          }}
          >Delete</button>
          <button
          className="btn btn-warning ms-3 " 
          data-bs-toggle="modal"
          data-bs-target="#update"
          onClick={() => currentitem(item)}
          >Edit</button>

        </td>
      </tr>


    </>
  );
}

function UpdateModal({getitem , itemupdate,namechange,updatename}){



  function handleupdatesubmit(e){
    e.preventDefault();
  }

  return(
     <div className="modal fade" id="update">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-head">
                  <div className="modal-title">
                    <h3>hey</h3>
                  </div>
                </div>
                <div className="modal-body">
                  <form action="" onSubmit={handleupdatesubmit}>
                    <input type="text" value={updatename}
                    onChange={namechange}
                    />
                    <div>
                      <button className="btn btn-primary"
                      onClick={()=> itemupdate(getitem.id , updatename )}
                      >
                        Update
                      </button>
                    </div>
                    </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-danger" data-bs-dismiss="modal">close</button>
                </div>
              </div>
            </div>

          </div>
    
  )
}
export default App;
