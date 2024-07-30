import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [item, setItem] = useState('');
  const [response, setResponse] = useState('');

  const handleAdd = async (db) => {
    try {
      const res = await axios.post(`http://localhost:3000/${db}/add`, { item });
      console.log("ITEM ADICIONADOOOO")
      setResponse(res.data.message); // Show success message
    } catch (error) {
      console.log("DEU ERROOOOOO")
      setResponse(error.response ? error.response.data.message : 'Error connecting to backend'); // Show error message
    }
  };  

  const handleRemove = async (db) => {
    try {
      const res = await axios.post(`http://localhost:3000/${db}/remove`, { item });
      setResponse(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompare = async () => {
    try {
      const res = await axios.post(`http://localhost:3000/compare`, { item });
      console.log(res.data); // Verifique o que está sendo retornado
      setResponse(res.data.message || 'No message received');
    } catch (error) {
      console.error(error);
      setResponse('An error occurred');
    }
  };
  

  return (
    <div className="App">
      <h1>Database Item Manager</h1>
      <input 
        type="text" 
        value={item} 
        onChange={(e) => setItem(e.target.value)} 
        placeholder="Item name" 
      />
      <button onClick={() => handleAdd('db1')}>Add to DB1</button>
      <button onClick={() => handleAdd('db2')}>Add to DB2</button>
      <button onClick={() => handleRemove('db1')}>Remove from DB1</button>
      <button onClick={() => handleRemove('db2')}>Remove from DB2</button>
      <button onClick={handleCompare}>Compare in DB1 and DB2</button>
      <p>{typeof response === 'string' ? response : JSON.stringify(response)}</p>
    </div>
  );
}

export default App;
