import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import SBreadCrumb from '../../components/BreadCrumb';
import SButton from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import SAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData, getData } from '../../utils/fetch';

export default function CategoriesPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [message, setMessage] = useState('');

  const getAPICategories = async () => {
    setTimeout(() => {
      setStatus(false);
      setMessage('');
    }, 5000);
    const res = await getData('/v1/cms/categories');
    setData(res.data.data);
  };

  useEffect(() => {
    getAPICategories();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Apa kamu yakin?',
      text: 'Anda tidak akan dapat mengembalikan ini!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Iya, Hapus',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`/v1/cms/categories/${id}`);
        if (res.status === 200) {
          getAPICategories();
          setStatus(true);
          setMessage(`berhasil hapus kategori ${res.data.data.name}`);
        }
      }
    });
  };

  return (
    <Container>
      {status && <SAlert variant='success' message={message} />}
      <SBreadCrumb textSecound='Categories' />
      <SButton action={() => navigate('/categories/create')}>Tambah</SButton>
      <Table striped bordered hover className='my-3'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={index}>
              <td>{data.name}</td>
              <td>
                <SButton
                  size='sm'
                  variant='success'
                  action={() => navigate(`/categories/edit/${data._id}`)}
                >
                  Edit
                </SButton>
                <SButton
                  size='sm'
                  variant='danger'
                  className='mx-2'
                  action={() => handleDelete(data._id)}
                >
                  Hapus
                </SButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
