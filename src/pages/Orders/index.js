import React, { useEffect } from 'react';
import { Col, Container, Row, Spinner, Table } from 'react-bootstrap';
import BreadCrumb from '../../components/BreadCrumb';
import SearchInput from '../../components/SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, setPage, setDate } from '../../redux/orders/actions';
import DateRange from '../../components/InputDate';
import { formatDate } from '../../utils/formatDate';
import { fetchListEvents } from '../../redux/lists/actions';
import moment from 'moment';
import Pagination from '../../components/Pagination';

export default function OrdersPage() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders);

  console.log('orders');
  console.log(orders);

  let [isShowed, setIsShowed] = React.useState(false);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch, orders.page, orders.date]);

  useEffect(() => {
    dispatch(fetchListEvents());
  }, [dispatch]);

  const displayDate = `${
    orders?.date?.startDate ? formatDate(orders?.date?.startDate) : ''
  }${orders?.date?.endDate ? ' - ' + formatDate(orders?.date?.endDate) : ''}`;

  const handlePageClick = (e) => {
    console.log('e');
    console.log(e);
    dispatch(setPage(e.selected + 1));
  };

  return (
    <Container className='mt-3'>
      <BreadCrumb textSecound={'orders'} />
      <Row>
        <Col
          className='cursor-pointer position-relative'
          onClick={() => setIsShowed(true)}
        >
          <SearchInput disabled query={displayDate} />
          {isShowed ? (
            <DateRange
              date={orders.date}
              setIsShowed={() => setIsShowed(!isShowed)}
              onChangeDate={(ranges) => dispatch(setDate(ranges.selection))}
            />
          ) : (
            ''
          )}
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col>
          {/*
           * todo
           * mapping data orders
           */}
          <Table striped bordered hover className='my-3'>
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Judul</th>
                <th>Tanggal Event</th>
                <th>Tanggal Order</th>
                <th>Tempat</th>
              </tr>
            </thead>
            <tbody>
              {orders.status === 'process' ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center' }}>
                    <div className='flex items-center justify-center'>
                      <Spinner animation='border' variant='primary' />
                    </div>
                  </td>
                </tr>
              ) : orders.data.length > 0 ? (
                orders.data.map((data, index) => (
                  <tr key={index}>
                    <td>
                      {data.personalDetail.firstName}{' '}
                      {data.personalDetail.lastName}
                    </td>
                    <td>{data.personalDetail.email}</td>
                    <td>{data.historyEvent.title}</td>
                    <td>
                      {moment(data.historyEvent.date).format('DD-MM-YYYY')}
                    </td>
                    <td>{moment(data.date).format('DD-MM-YYYY')}</td>
                    <td>{data.historyEvent.venueName}</td>
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
          <Pagination pages={orders.pages} handlePageClick={handlePageClick} />
        </Col>
      </Row>
    </Container>
  );
}
