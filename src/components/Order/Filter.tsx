import React, { useState } from 'react';
import { Input, Select } from 'antd';

const { Search } = Input;
const { Option } = Select;

interface FilterBarProps {
  onSearch: (value: string) => void;
  onFilter: (status: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onSearch, onFilter }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <div style={{ marginBottom: 16, display: 'flex', gap: 10 }}>
      <Search
        placeholder="Tìm kiếm theo mã đơn hàng hoặc khách hàng"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onSearch={onSearch}
        style={{ width: 300 }}
      />
      <Select placeholder="Lọc theo trạng thái" onChange={onFilter} style={{ width: 200 }}>
        <Option value="">Tất cả</Option>
        <Option value="Chờ xác nhận">Chờ xác nhận</Option>
        <Option value="Đang giao">Đang giao</Option>
        <Option value="Hoàn thành">Hoàn thành</Option>
        <Option value="Hủy">Hủy</Option>
      </Select>
    </div>
  );
};

export default FilterBar;


// pages/Orders.tsx
