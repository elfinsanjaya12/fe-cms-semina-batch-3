import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import BreadCrumb from '../../components/BreadCrumb';
import Alert from '../../components/Alert';
import Form from './form';
import { postData, getData } from '../../utils/fetch';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function EventsCreate() {
  const navigate = useNavigate();
  const [listTalents, setListTalents] = useState([]);
  const [listCategories, setListCategories] = useState([]);

  const [form, setForm] = useState({
    title: '',
    price: '',
    date: '',
    file: '',
    avatar: '',
    about: '',
    venueName: '',
    tagline: '',
    keyPoint: [''],
    tickets: [
      {
        type: '',
        statusTicketCategories: '',
        stock: '',
        price: '',
      },
    ],
    category: '',
    talent: '',
  });

  console.log('form.keyPoint');
  console.log(form.keyPoint);

  const [alert, setAlert] = useState({
    status: false,
    type: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const getAPIListCategories = async () => {
    const res = await getData('/v1/cms/categories');
    const temp = [];
    res.data.data.forEach((res) => {
      temp.push({
        value: res._id,
        label: res.name,
        target: {
          value: res._id,
          name: 'category',
        },
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
        target: {
          value: res._id,
          name: 'talent',
        },
      });
    });

    setListTalents(temp);
  };

  useEffect(() => {
    getAPIListCategories();
    getAPIListTalents();
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
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

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
    } else if (e.target.name === 'category' || e.target.name === 'talent') {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const _temp = [];
      form.tickets.forEach((tic) => {
        _temp.push({
          type: tic.type,
          statusTicketCategories: tic.statusTicketCategories.value,
          stock: tic.stock,
          price: tic.price,
        });
      });

      const payload = {
        date: form.date,
        image: form.file,
        title: form.title,
        price: form.price,
        about: form.about,
        venueName: form.venueName,
        tagline: form.tagline,
        keyPoint: form.keyPoint,
        category: form.category.value,
        talent: form.talent.value,
        status: form.status,
        tickets: _temp,
      };

      const res = await postData('/v1/cms/events', payload);
      if (res.status === 201) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Berhasil simpan data ${res.data.data.title}`,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate('/events');
        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
    }
  };

  const handleChangeKeyPoint = (e, i) => {
    let _temp = [...form.keyPoint];

    _temp[i] = e.target.value;

    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusKeyPoint = () => {
    let _temp = [...form.keyPoint];
    _temp.push('');

    setForm({ ...form, keyPoint: _temp });
  };

  const handleMinusKeyPoint = (index) => {
    let _temp = [...form.keyPoint];
    let removeIndex = _temp
      .map(function (_, i) {
        return i;
      })
      .indexOf(index);

    _temp.splice(removeIndex, 1);
    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusTicket = () => {
    let _temp = [...form.tickets];
    _temp.push({
      type: '',
      statusTicketCategories: '',
      stock: '',
      price: '',
    });

    setForm({ ...form, tickets: _temp });
  };
  const handleMinusTicket = (index) => {
    let _temp = [...form.tickets];
    let removeIndex = _temp
      .map(function (_, i) {
        return i;
      })
      .indexOf(index);

    _temp.splice(removeIndex, 1);
    setForm({ ...form, tickets: _temp });
  };

  const handleChangeTicket = (e, i) => {
    let _temp = [...form.tickets];

    if (e.target.name === 'statusTicketCategories') {
      _temp[i][e.target.name] = e;
    } else {
      _temp[i][e.target.name] = e.target.value;
    }

    setForm({ ...form, tickets: _temp });
  };

  return (
    <Container>
      <BreadCrumb
        textSecound={'Events'}
        urlSecound={'/events'}
        textThird='Create'
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        listCategories={listCategories}
        listTalents={listTalents}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleChangeKeyPoint={handleChangeKeyPoint}
        handlePlusKeyPoint={handlePlusKeyPoint}
        handleMinusKeyPoint={handleMinusKeyPoint}
        handlePlusTicket={handlePlusTicket}
        handleMinusTicket={handleMinusTicket}
        handleChangeTicket={handleChangeTicket}
      />
    </Container>
  );
}

export default EventsCreate;
