import { Table, Input, Button, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import axios from "axios";

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
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const getData = async (page = 1, filtering = {}) => {
    const { data, headers } = await axios.get(`http://localhost:3004/users`, {
      params: {
        _page: page,
        _limit: 10,
        q: filtering.first_name,
        gender: filtering.gender,
      },
    });

    const totalCount = parseInt(headers["x-total-count"]);
    setTotalPages(Math.ceil(totalCount / 10));
    setData(data);
  };

  useEffect(() => {
    getData(1,{})
  }, []);

  const fetchData = (pagination, filters, sort, e) => {
    console.log(pagination);
    console.log(filters);
    console.log(sort);
    console.log(e);

    switch (e.action) {
      case "filter":
        const preParse = Object.entries(filters);
        const parsedFilter = {};
        preParse.forEach(([key, value]) => {
          if (Array.isArray(value) && key !== "gender") {
            return (parsedFilter[key] = value[0]);
          }
          parsedFilter[key] = value;
        });
        break;
      case "sort":
        break;

        default: break;
    }

    getData(pagination.current, filters);
  };

  return (
    <div className="App">
      <Table
        onChange={(pagination, filters, sort, e) =>
          fetchData(pagination, filters, sort, e)
        }
        pagination={{
          pageSize: 10,
          total: totalPages,
          size: data,
          onChange: (page) => {
            setPage(page);
          },
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
        columns={columns((e) => {
          console.log(e);
        })}
        rowKey={"id"}
        dataSource={data}
      />
    </div>
  );
}

export default App;
