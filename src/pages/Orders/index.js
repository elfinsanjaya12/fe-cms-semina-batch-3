import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import BreadCrumb from '../../components/BreadCrumb';
import SearchInput from '../../components/SearchInput';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrders, setPage, setDate } from '../../redux/orders/actions';
import DateRange from '../../components/InputDate';
import { formatDate } from '../../utils/formatDate';
import { fetchListEvents } from '../../redux/lists/actions';

export default function OrdersPage() {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders);

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
        </Col>
      </Row>
    </Container>
  );
}
