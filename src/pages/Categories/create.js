import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SBreadCrumb from '../../components/BreadCrumb';
import SForm from './form';
import { useNavigate } from 'react-router-dom';
import SAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { postData } from '../../utils/fetch';

export default function CategoriesCreatePage() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    status: false,
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const res = await postData('/v1/cms/categories', form);

      if (res.status === 201) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Berhasil simpan data ${res.data.data.name}`,
          showConfirmButton: false,
          timer: 1500,
        });
        setIsLoading(false);
        navigate('/categories');
      }
    } catch (err) {
      setIsLoading(false);

      setErrors({ ...errors, status: true, message: err.response.data.msg });
    }
  };

  return (
    <Container>
      <SBreadCrumb
        textSecound='Categories'
        urlSecound='/categories'
        textThird='Create'
      />

      {errors.status && <SAlert variant='danger' message={errors.message} />}

      <SForm
        handleSubmit={handleSubmit}
        form={form}
        handleChange={handleChange}
        isLoading={isLoading}
      />
    </Container>
  );
}
