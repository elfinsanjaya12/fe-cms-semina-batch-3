import React, { useEffect, useState } from 'react';
import { Container, Image, Spinner, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SBreadCrumb from '../../components/BreadCrumb';
import SButton from '../../components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPayments } from '../../redux/payments/actions';
import SAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deleteData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/actions';
import { config } from '../../configs';

function PaymentsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { payments, notif } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const handleDelete = (id) => {
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
        const res = await deleteData(`/v1/cms/payments/${id}`);

        dispatch(
          setNotif(
            true,
            'success',
            `berhasil hapus kategori ${res.data.data.type}`
          )
        );

        dispatch(fetchPayments());
      }
    });
  };

  return (
    <Container className='mt-3'>
      {notif.status && (
        <SAlert variant={notif.variant} message={notif.message} />
      )}
      <SBreadCrumb textSecound='Payments' />
      <SButton className='mb-3' action={() => navigate('/payments/create')}>
        Tambah
      </SButton>
      <Table striped bordered hover className='my-3'>
        <thead>
          <tr>
            <th>Type</th>
            <th>Avatar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.status === 'process' ? (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>
                <div className='flex items-center justify-center'>
                  <Spinner animation='border' variant='primary' />
                </div>
              </td>
            </tr>
          ) : payments.data.length > 0 ? (
            payments.data.map((data, index) => (
              <tr key={index}>
                <td>{data.type}</td>
                <td>
                  <Image
                    height={40}
                    width={40}
                    roundedCircle
                    src={`${config.api_image}/${data.image.name}`}
                  />
                </td>
                <td>
                  <SButton
                    size='sm'
                    variant='success'
                    action={() => navigate(`/payments/edit/${data._id}`)}
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
              <td colSpan={4} style={{ textAlign: 'center' }}>
                Tidak Ditemukan Data
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default PaymentsPage;
