import React from 'react';
import { Table, Button } from 'antd';
import useOrderModel from '../../models/order';
import { Order } from '../../models/order';

const OrderTable: React.FC = () => {
  const { orders, deleteOrder, cancelOrder } = useOrderModel();

  return (
    <Table dataSource={orders} rowKey="id">
      {/* <Table.Column title="Mã đơn" dataIndex="id" /> */}
      <Table.Column title="Khách hàng" dataIndex="customer" />
      <Table.Column title="Ngày đặt" dataIndex="date" />
      <Table.Column title="Tổng tiền" dataIndex="total" />
      <Table.Column title="Trạng thái" dataIndex="status" />
      <Table.Column<Order>
  title="Hành động"
  key="actions"
  render={function (_, record) {
    return (
      <>
        <Button onClick={() => deleteOrder(record.id)}>Xóa</Button>
        {record.status === 'Chờ xác nhận' && (
          <Button onClick={() => cancelOrder(record.id)} style={{ marginLeft: 8 }}>Hủy</Button>
        )}
      </>
    );
  }}
/>

    </Table>
  );
};

export default OrderTable;
