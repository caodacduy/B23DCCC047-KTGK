import { useState, useEffect } from 'react';
import { message } from 'antd';

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'Chờ xác nhận' | 'Đang giao' | 'Hoàn thành' | 'Hủy';
  items: { name: string; price: number; quantity: number }[];
}

const useOrderModel = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders([...orders, order]);
    message.success('Đơn hàng đã được thêm thành công!');
  };

  const updateOrder = (id: string, updatedOrder: Order) => {
    setOrders(orders.map(order => (order.id === id ? updatedOrder : order)));
    message.success('Đơn hàng đã được cập nhật!');
  };

  const deleteOrder = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
    message.success('Đơn hàng đã được xóa!');
  };

  const cancelOrder = (id: string) => {
    setOrders(
      orders.map(order =>
        order.id === id && order.status === 'Chờ xác nhận'
          ? { ...order, status: 'Hủy' }
          : order
      )
    );
    message.warning('Đơn hàng đã được hủy!');
  };

  return { orders, setOrders, addOrder, updateOrder, deleteOrder, cancelOrder };
};

export default useOrderModel;
