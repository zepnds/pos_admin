import React, { useEffect } from 'react';
import { Row, Col, Table, Alert } from 'react-bootstrap';
import Card from '../../components/Card/MainCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBusiness } from 'store/merchant.slice';

export default function Merchant() {
  const merchant = useSelector((state) => state.merchant);
  const dispatch = useDispatch();
  const access = localStorage.getItem('access');
  const accesSuSER = JSON.parse(access);

  useEffect(() => {
    dispatch(fetchBusiness({ userId: accesSuSER.id }));
  }, [dispatch, accesSuSER.id]);

  const RenderType = (type) => {
    switch (type) {
      case 'SERVICE':
        return (
          <Alert style={{ width: 85, height: 40 }} variant="warning">
            {type}
          </Alert>
        );
      default:
        return <Alert variant="info">{type}</Alert>;
    }
  };
  return (
    <Row>
      <Col>
        <Card title="Business Management">
          <Row>
            <Col sm={8}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {merchant?.business !== null
                    ? merchant?.business?.map((bus) => (
                        <tr key={bus.id}>
                          <td>
                            <input type="checkbox" />
                          </td>
                          <td>{bus.name}</td>
                          <td>{bus.merchant_email}</td>
                          <td>{RenderType(bus.merchant_type)}</td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </Table>
            </Col>
            <Col sm={2}>col2</Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
}
