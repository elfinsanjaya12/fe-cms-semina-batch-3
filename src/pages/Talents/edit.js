import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import SBreadCrumb from '../../components/BreadCrumb';
import SAlert from '../../components/Alert';
import Form from './form';
import { getData, postData, putData } from '../../utils/fetch';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

function TalentsCreate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    role: '',
    file: '',
    avatar: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const getOneTalents = async (id) => {
    const res = await getData(`/v1/cms/talents/${id}`);
    setForm({
      ...form,
      name: res.data.data.name,
      role: res.data.data.role,
      file: res.data.data.image._id,
      avatar: res.data.data.image.name,
    });
  };

  useEffect(() => {
    getOneTalents(id);
  }, []);

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append('avatar', file);
    const res = await postData('/v1/cms/images', formData, true);
    return res;
  };

  const handleChange = async (e) => {
    if (e.target.name === 'avatar') {
      if (
        e?.target?.files[0]?.type === 'image/jpg' ||
        e?.target?.files[0]?.type === 'image/png' ||
        e?.target?.files[0]?.type === 'image/jpeg'
      ) {
        const size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setAlert({
            ...alert,
            status: true,
            type: 'danger',
            message: 'Please select image size less than 3 MB',
          });
          setForm({
            ...form,
            file: '',
            [e.target.name]: '',
          });
        } else {
          const res = await uploadImage(e.target.files[0]);

          setForm({
            ...form,
            file: res.data.data._id,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: 'danger',
          message: 'type image png | jpg | jpeg',
        });
        setForm({
          ...form,
          file: '',
          [e.target.name]: '',
        });
      }
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const payload = {
        image: form.file,
        role: form.role,
        name: form.name,
      };

      const res = await putData(`/v1/cms/talents/${id}`, payload);
      if (res.status === 200) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Berhasil ubah data ${res.data.data.name}`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/talents');
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <SBreadCrumb
        textSecound={'Talents'}
        urlSecound={'/talents'}
        textThird='Create'
      />
      {alert.status && <SAlert variant={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        edit
      />
    </Container>
  );
}

export default TalentsCreate;
