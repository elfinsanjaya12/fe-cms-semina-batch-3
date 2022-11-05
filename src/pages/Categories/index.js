import React, { useEffect } from 'react';
import { Container, Spinner, Table } from 'react-bootstrap';
import SBreadCrumb from '../../components/BreadCrumb';
import SButton from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import SAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import { fetchCategories } from '../../redux/categories/actions';
import { setNotif } from '../../redux/notif/actions';
import { useDispatch, useSelector } from 'react-redux';

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const { categories, notif } = useSelector((state) => state);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
          dispatch(fetchCategories());
          dispatch(
            setNotif(
              true,
              'success',
              `berhasil hapus kategori ${res.data.data.name}`
            )
          );
        }
      }
    });
  };

  return (
    <Container>
      {notif.status && (
        <SAlert variant={notif.variant} message={notif.message} />
      )}
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
          {categories.status === 'process' ? (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>
                <div className='flex items-center justify-center'>
                  <Spinner animation='border' variant='primary' />
                </div>
              </td>
            </tr>
          ) : categories.data.length > 0 ? (
            categories.data.map((data, index) => (
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
            ))
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: 'center' }}>
                Tidak Ditemukan Data
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
