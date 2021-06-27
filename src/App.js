import {useState} from 'react';
import './App.css';

function App() {
  const [item, setItem] = useState('')
  const [list, setList] = useState([]);
  const [mode, setMode] = useState('add');
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(mode === 'add'){
      const id = Math.floor(Math.random() * 100);
      list.push({
        name: item,
        id
      })
      setList(list);
    }
    else{
      const findItem = list.filter(i=>i.id!==editId);
      setList([...findItem, {
        name: item,
        id: editId
      }]);
    }
    setItem(''); 
  }

  const handleEdit = (key) =>{
    const editTodo = list.find((i)=>i.id===key);
    setItem(editTodo.name);
    setEditId(editTodo.id);
    setMode('edit');
  }

  const handleDelete = (id)=> {
    const newlist = list.filter((data)=> data.id!==id)
    setList(newlist);
  };

  // console.log(list);

  return (
    <div className="App">
      <div className="container">
        <h2>Todo List App</h2>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input type="text" value={item} onChange={(e)=>setItem(e.target.value)}/>
          <button type="submit">{mode === 'edit'? 'Edit': 'Go'}</button>
        </form>
        <ul className="allTodos">
          {
            list.length > 0 ? list.map(({name, id})=>(
            <li className="singleTodo">
              <span className="todoText">{name}</span>
              <button onClick={()=>handleEdit(id)}>Edit</button>
              <button onClick={()=>handleDelete(id)}>Delete</button>
            </li>
            )): " "
          }
        </ul>
      </div>
    </div>
  );
}

export default App;
