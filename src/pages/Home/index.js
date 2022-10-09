import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function HomePage() {
  const [data, setData] = useState([]);
  const [name, setName] = useState('');

  const [error, setError] = useState({ status: false, msg: '' });
  const [type, setType] = useState(false);
  const [id, setId] = useState(null);

  const getAPICategories = async () => {
    try {
      const res = await axios.get(
        'http://localhost:9000/api/v1/cms/categories'
      );
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAPICategories();
  }, []);

  const handleSubmit = async () => {
    try {
      if (type) {
        await axios.put('http://localhost:9000/api/v1/cms/categories/' + id, {
          name,
        });
      } else {
        await axios.post('http://localhost:9000/api/v1/cms/categories', {
          name,
        });
      }
      getAPICategories();
    } catch (err) {
      console.log(err.response.data);
      setError({ status: true, msg: err.response.data.msg });
    }
  };

  const getOneCategories = async (id) => {
    const res = await axios.get(
      `http://localhost:9000/api/v1/cms/categories/${id}`
    );

    setName(res.data.data.name);
    setId(res.data.data._id);
    setType(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:9000/api/v1/cms/categories/${id}`);
    getAPICategories();
  };

  return (
    <div>
      {error.status && <p style={{ color: 'red' }}>{error.msg}</p>}

      <input
        type='text'
        name='name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleSubmit}>Submit</button>

      {data.map((data, index) => (
        <ul key={index}>
          <li>{data.name}</li>
          <button onClick={() => getOneCategories(data._id)}>Edit</button>
          <button onClick={() => handleDelete(data._id)}>Delete</button>
        </ul>
      ))}
    </div>
  );
}
