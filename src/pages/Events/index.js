import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Row, Col } from 'react-bootstrap';
import SBreadCrumb from '../../components/BreadCrumb';
import SButton from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../../components/SearchInput';
import { deleteData, getData } from '../../utils/fetch';
import debounce from 'debounce-promise';
import Swal from 'sweetalert2';
import SAlert from '../../components/Alert';
import SelectBox from '../../components/SelectBox';
let debouncedFetchEvents = debounce(getData, 1000);

export default function EventsPage() {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [talent, setTalent] = useState(null);
  const [listTalents, setListTalents] = useState([]);
  const [category, setCategory] = useState(null);
  const [listCategories, setListCategories] = useState([]);

  console.log('category');
  console.log(category);

  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    status: false,
    message: '',
  });

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const getAPIEvents = async () => {
    setTimeout(() => {
      setAlert({ status: false, message: '' });
    }, 5000);
    setStatus('progress');
    let params = {
      keyword,
    };

    if (category) {
      params = { ...params, category: category.value };
    }
    if (talent) {
      params = { ...params, talent: talent.value };
    }
    const res = await debouncedFetchEvents('/v1/cms/events', params);
    if (res.status === 200) {
      setData(res.data.data);
      setStatus('success');
    }
  };

  useEffect(() => {
    getAPIEvents();
  }, [keyword, category, talent]);

  const getAPIListCategories = async () => {
    const res = await getData('/v1/cms/categories');
    const temp = [];
    res.data.data.forEach((res) => {
      temp.push({
        value: res._id,
        label: res.name,
      });
    });

    setListCategories(temp);
  };

  const getAPIListTalents = async () => {
    const res = await getData('/v1/cms/talents');
    const temp = [];
    res.data.data.forEach((res) => {
      temp.push({
        value: res._id,
        label: res.name,
      });
    });

    setListTalents(temp);
  };

  useEffect(() => {
    getAPIListCategories();
    getAPIListTalents();
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
        const res = await deleteData(`/v1/cms/events/${id}`);
        if (res.status === 200) {
          getAPIEvents();
          setAlert({
            status: true,
            message: `berhasil hapus events ${res.data.data.title}`,
          });
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
          <SearchInput handleChange={handleKeyword} query={keyword} />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian kategori'}
            value={category}
            options={listCategories}
            isClearable={true}
            handleChange={(value) => setCategory(value)}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={'Masukan pencarian pembicara'}
            value={talent}
            options={listTalents}
            isClearable={true}
            handleChange={(value) => setTalent(value)}
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
          {status === 'progress' ? (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>
                <div className='flex items-center justify-center'>
                  <Spinner animation='border' variant='primary' />
                </div>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((data, index) => (
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
