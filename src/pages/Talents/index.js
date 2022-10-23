import React, { useEffect, useState } from 'react';
import { Container, Table, Image, Spinner } from 'react-bootstrap';
import SBreadCrumb from '../../components/BreadCrumb';
import SButton from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import SearchInput from '../../components/SearchInput';
import { deleteData, getData } from '../../utils/fetch';
import { config } from '../../configs';
import debounce from 'debounce-promise';
import Swal from 'sweetalert2';
import SAlert from '../../components/Alert';
let debouncedFetchTalents = debounce(getData, 1000);

export default function TalentsPage() {
  const [status, setStatus] = useState('idle');
  const [data, setData] = useState([]);
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    status: false,
    message: '',
  });

  const handleKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const getAPITalents = async () => {
    setTimeout(() => {
      setAlert({ status: false, message: '' });
    }, 5000);
    setStatus('progress');
    const params = {
      keyword,
    };
    const res = await debouncedFetchTalents('/v1/cms/talents', params);
    if (res.status === 200) {
      setData(res.data.data);
      setStatus('success');
    }
  };

  useEffect(() => {
    getAPITalents();
  }, [keyword]);

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
        const res = await deleteData(`/v1/cms/talents/${id}`);
        if (res.status === 200) {
          getAPITalents();
          setAlert({
            status: true,
            message: `berhasil hapus talents ${res.data.data.name}`,
          });
        }
      }
    });
  };

  return (
    <Container>
      {alert.status && <SAlert variant='success' message={alert.message} />}
      <SBreadCrumb textSecound='Talents' />
      <SButton className='mb-3' action={() => navigate('/talents/create')}>
        Tambah
      </SButton>
      <SearchInput handleChange={handleKeyword} query={keyword} />

      <Table striped bordered hover className='my-3'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Avatar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {status === 'progress' ? (
            <tr>
              <td colSpan={4} style={{ textAlign: 'center' }}>
                <div className='flex items-center justify-center'>
                  <Spinner animation='border' variant='primary' />
                </div>
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((data, index) => (
              <tr key={index}>
                <td>{data.name}</td>
                <td>{data.role}</td>
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
                    action={() => navigate(`/talents/edit/${data._id}`)}
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
