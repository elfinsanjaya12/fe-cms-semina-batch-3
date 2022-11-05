import React, { useEffect } from 'react';
import { Container, Table, Spinner, Row, Col } from 'react-bootstrap';
import SBreadCrumb from '../../components/BreadCrumb';
import SButton from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../../components/SearchInput';
import { deleteData } from '../../utils/fetch';
import Swal from 'sweetalert2';
import SAlert from '../../components/Alert';
import SelectBox from '../../components/SelectBox';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchListCategories,
  fetchListTalents,
} from '../../redux/lists/actions';
import {
  fetchEvents,
  setCategory,
  setKeyword,
  setTalent,
} from '../../redux/events/actions';
import { setNotif } from '../../redux/notif/actions';

export default function EventsPage() {
  const { lists, events } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, events.keyword, events.category, events.talent]);

  useEffect(() => {
    dispatch(fetchListCategories());
    dispatch(fetchListTalents());
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
        const res = await deleteData(`/v1/cms/events/${id}`);
        if (res.status === 200) {
          dispatch(fetchEvents());
          dispatch(
            setNotif(
              true,
              'success',
              `berhasil hapus events ${res.data.data.title}`
            )
          );
        }
      }
    });
  };

  return (
    <Container>
      {alert.status && <SAlert variant='success' message={alert.message} />}
      <SBreadCrumb textSecound='Events' />
      <SButton className='mb-3' action={() => navigate('/events/create')}>
        Tambah
      </SButton>
      <Row>
        <Col>
          <SearchInput
            handleChange={(e) => dispatch(setKeyword(e.target.value))}
            query={events.keyword}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian kategori'}
            value={events.category}
            options={lists.categories}
            isClearable={true}
            handleChange={(value) => dispatch(setCategory(value))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian pembicara'}
            value={events.talent}
            options={lists.talents}
            isClearable={true}
            handleChange={(value) => dispatch(setTalent(value))}
          />
        </Col>
      </Row>

      <Table striped bordered hover className='my-3'>
        <thead>
          <tr>
            <th>Judul</th>
            <th>Tempat</th>
            <th>Status</th>
            <th>Kategori</th>
            <th>Pembicara</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {events.status === 'process' ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>
                <div className='flex items-center justify-center'>
                  <Spinner animation='border' variant='primary' />
                </div>
              </td>
            </tr>
          ) : events.data.length > 0 ? (
            events.data.map((data, index) => (
              <tr key={index}>
                <td>{data.title}</td>
                <td>{data.venueName}</td>
                <td>{data.statusEvent}</td>
                <td>{data.category.name}</td>
                <td>{data.talent.name}</td>
                <td>
                  <SButton
                    size='sm'
                    variant='success'
                    action={() => navigate(`/events/edit/${data._id}`)}
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
              <td colSpan={6} style={{ textAlign: 'center' }}>
                Tidak Ditemukan Data
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}
