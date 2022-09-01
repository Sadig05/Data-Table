import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";
import { useStore } from "./RootStore";
import { observer } from "mobx-react";

const columns = (setFilter) => [
  {
    title: "Name",
    dataIndex: "first_name",
    key: "first_name",
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <>
          <Input
            autoFocus
            placeholder="Type text here"
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
              confirm({ closeDropdown: false });
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
          <Button
            onClick={() => {
              confirm();
            }}
            type="primary"
          >
            Search
          </Button>
          <Button
            onClick={(e) => {
              clearFilters();
              confirm();
            }}
            type="danger"
          >
            Reset
          </Button>
        </>
      );
    },

    filterIcon: () => {
      return <SearchOutlined />;
    },
    // onFilter: (value, record) => {
    //   return record.first_name.toLowerCase().includes(value.toLowerCase());
    // },
  },
  {
    title: "Surname",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Gender",
    key: "gender",
    dataIndex: "gender",
    // clearFilters,
    filters: [
      {
        text: "Male",
        value: "Male",
      },
      {
        text: "Female",
        value: "Female",
      },
      {
        text: "Genderfluid",
        value: "Genderfluid",
      },
      {
        text: "Non-binary",
        value: "Non-binary",
      },
      {
        text: "Genderqueer",
        value: "Genderqueer",
      },
      {
        text: "Polygender",
        value: "Polygender",
      },
    ],
  },
  {
    title: "Ip",
    key: "ip_address",
    dataIndex: "ip_address",
  },
];

function App() {
  const { userStore } = useStore();

  const onChange = (pagination, filters, sorting, e) => {
    console.log("params", pagination, e);
    if (e.action == "paginate") {
      userStore.setFilters({
        _page: pagination.current,
        _limit: 10,
      });
    }
    if (e.action == "filter") {
      const preParse = Object.entries(filters);
      const parsedFilter = {};
      preParse.forEach(([key, value]) => {
        if (Array.isArray(value) && key !== "gender") {
          console.log(parsedFilter)
          return (parsedFilter[key] = value[0]);
        }parsedFilter[key] = value;

      });
      console.log(parsedFilter);

      userStore.setFilters({
        q: parsedFilter.first_name,
        gender: parsedFilter.gender,
      });
    }
  };

  return (
    <div className="App">
      <Table
        pagination={{
          pageSize: 10,
          total: Math.ceil(userStore.count / 10),
          size: userStore.users,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
        columns={columns()}
        rowKey={"id"}
        dataSource={userStore.users}
        onChange={onChange}
      />
    </div>
  );
}

export default observer(App);
