import React, { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SAlert from '../../components/Alert';
import SForm from './form';
import { postData } from '../../utils/fetch';

function PageSignin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState({
    status: false,
    message: '',
    type: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const res = await postData(`/v1/cms/auth/signin`, form);
      localStorage.setItem('auth', JSON.stringify(res.data.data));
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      setIsLoading(false);
      setAlert({
        status: true,
        message: err?.response?.data?.msg ?? 'Internal server error',
        type: 'danger',
      });
    }
  };

  return (
    <Container md={12} className='my-5'>
      <div className='m-auto' style={{ width: '50%' }}>
        {alert.status && (
          <SAlert variant={alert.type} message={alert.message} />
        )}
      </div>
      <Card style={{ width: '50%' }} className='m-auto mt-5'>
        <Card.Body>
          <Card.Title className='text-center'>Form Signin</Card.Title>
          <SForm
            form={form}
            handleChange={handleChange}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PageSignin;
