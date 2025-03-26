import React, { useState } from 'react';
import OrderTable from '../../components/Order/index';
import OrderForm from '../../components/Order/orderForm';
import FilterBar from '../../components/Order/Filter';

import { Button } from 'antd';





const Orders: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <>
      <Button onClick={() => setModalVisible(true)}>Thêm Đơn Hàng</Button>
      <OrderTable />
      <OrderForm visible={isModalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

export default Orders;
