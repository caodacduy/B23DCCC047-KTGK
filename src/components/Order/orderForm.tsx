import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Table, InputNumber, message } from 'antd';
import useOrderModel, { Order } from '../../models/order';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const OrderForm: React.FC<{ visible: boolean; onClose: () => void; order?: Order }> = ({ visible, onClose, order }) => {
  const { addOrder, updateOrder } = useOrderModel();
  const [form] = Form.useForm();
  const [items, setItems] = useState<Array<{ name: string; price: number; quantity: number }>>([]);

  useEffect(() => {
    if (visible) {
      if (order) {
        form.setFieldsValue(order);
        setItems(order.items || []);
      } else {
        form.resetFields();
        setItems([]);
      }
    }
  }, [visible, order, form]);

  const addItem = () => {
    setItems([...items, { name: '', price: 0, quantity: 1 }]);
  };

  const updateItem = (index: number, key: string, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [key]: value };
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      if (items.length === 0) {
        message.error('Vui lòng thêm ít nhất một sản phẩm vào đơn hàng!');
        return;
      }

      const newOrder: Order = {
        id: order?.id || uuidv4(),
        customer: values.customer,
        date: new Date().toISOString().split('T')[0],
        total,
        status: values.status,
        items,
      };

      if (order) {
        updateOrder(order.id, newOrder);
      } else {
        addOrder(newOrder);
      }
      onClose();
    });
  };

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      render: (text: string, record: any, index: number) => (
        <Input value={text} onChange={e => updateItem(index, 'name', e.target.value)} />
      )
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (text: number, record: any, index: number) => (
        <InputNumber value={text} onChange={value => updateItem(index, 'price', value)} />
      )
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      render: (text: number, record: any, index: number) => (
        <InputNumber value={text} min={1} onChange={value => updateItem(index, 'quantity', value)} />
      )
    },
    {
      title: 'Hành động',
      render: (_: any, __: any, index: number) => (
        <Button onClick={() => removeItem(index)}>Xóa</Button>
      )
    }
  ];

  return (
    <Modal visible={visible} title={order ? 'Chỉnh sửa đơn hàng' : 'Thêm đơn hàng'} onCancel={onClose} onOk={handleSubmit}>
      <Form form={form} layout="vertical">
        <Form.Item name="customer" label="Khách hàng" rules={[{ required: true, message: 'Vui lòng nhập tên khách hàng' }]}> 
          <Input placeholder="Nhập tên khách hàng" />
        </Form.Item>

        <Form.Item name="status" label="Trạng thái">
          <Select>
            <Option value="Chờ xác nhận">Chờ xác nhận</Option>
            <Option value="Đang giao">Đang giao</Option>
            <Option value="Hoàn thành">Hoàn thành</Option>
            <Option value="Hủy">Hủy</Option>
          </Select>
        </Form.Item>

        <Table dataSource={items} columns={columns} rowKey={(_, index) => index!.toString()} pagination={false} />
        <Button onClick={addItem} style={{ marginTop: 10 }}>Thêm sản phẩm</Button>

        <p><strong>Tổng tiền:</strong> {total} VND</p>
      </Form>
    </Modal>
  );
};

export default OrderForm;