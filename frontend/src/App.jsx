import {useEffect,useState} from "react";
import "./App.css";

function App(){

const [items,setItems]=useState([]);
const [search, setSearch] = useState(""); //search state
const [sort, setSort] = useState(""); // sort state
const [editingId,setEditingId] = useState(null);

const [form,setForm]=useState({
 name:"",
 brand:"",
 purchase_date:"",
 expiration_date:"",
 location:"",
 owner:""
});


function loadItems(){

fetch("http://localhost:5000/items")
.then(res=>res.json())
.then(data=>setItems(data));

}


useEffect(()=>{
loadItems();
},[]);



function addItem(e){

e.preventDefault();


fetch("http://localhost:5000/items",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(form)

})
.then(res=>res.json())
.then(()=>{
loadItems();

setForm({
name:"",
brand:"",
purchase_date:"",
expiration_date:"",
location:"",
owner:""
});

});

}

function editItem(item){
  setEditingId(item.id);

  setForm({
    name:item.name,
    brand:item.brand,
    purchase_date:item.purchase_date?.split("T")[0],
    expiration_date:item.expiration_date?.split("T")[0],
    location:item.location,
    owner:item.owner
  });
}

function updateItem(e){

e.preventDefault();


fetch(
`http://localhost:5000/items/${editingId}`,
{
method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(form)

})
.then(res=>res.json())
.then(()=>{
  
loadItems();

setEditingId(null);

setForm({
name:"",
brand:"",
purchase_date:"",
expiration_date:"",
location:"",
owner:""
});

});

}

function deleteItem(id){

fetch(
`http://localhost:5000/items/${id}`,
{
method:"DELETE"
}
)
.then(()=>{
loadItems();
});

}

let filteredItems = items.filter(item =>
  item.name.toLowerCase().includes(search.toLowerCase())
);


if(sort === "name"){

filteredItems.sort((a,b)=>
a.name.localeCompare(b.name)
);

}


if(sort === "expiration"){

filteredItems.sort((a,b)=>
new Date(a.expiration_date) -
new Date(b.expiration_date)
);

}


// Output
return (

<div>

<h1>🥫 Pantry Tracker</h1>

<input
  type="text"
  placeholder="Search your pantry..."
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
/>

<select
value={sort}
onChange={(e)=>setSort(e.target.value)}
>

<option value="">
Sort by...
</option>

<option value="name">
Alphabetical
</option>

<option value="expiration">
Expiration date
</option>

</select>

<form onSubmit={editingId ? updateItem : addItem}>


<input
placeholder="Name"
value={form.name}
onChange={e=>setForm({...form,name:e.target.value})}
/>


<input
placeholder="Brand"
value={form.brand}
onChange={e=>setForm({...form,brand:e.target.value})}
/>


<input
type="date"
value={form.purchase_date}
onChange={e =>
 setForm({
   ...form,
   purchase_date:e.target.value
 })
}
/>


<input
type="date"
value={form.expiration_date}
onChange={e =>
 setForm({
   ...form,
   expiration_date:e.target.value
 })
}
/>


<input
placeholder="Location"
value={form.location}
onChange={e=>setForm({...form,location:e.target.value})}
/>


<input
placeholder="Owner"
value={form.owner}
onChange={e=>setForm({...form,owner:e.target.value})}
/>


<button>
{editingId ? "Update Item" : "Add Item"}
</button>


</form>



<hr/>


<div className="item-grid">

{filteredItems.map(item => (

<div className="item-card" key={item.id}>

<h2>{item.name}</h2>

<p>
Brand: {item.brand}
</p>

<p>
📍 {item.location}
</p>

<p>
👤 {item.owner}
</p>

<p>
📅 Expires: {item.expiration_date?.split("T")[0]}
</p>

<button onClick={()=>editItem(item)}>
Edit
</button>

<br/>

<button onClick={()=>deleteItem(item.id)}>
Delete
</button>


</div>

))}

</div>



</div>

)

}


export default App;