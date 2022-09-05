import React, { useEffect, useRef, useState } from "react";
import { InputRef, message } from "antd";
import { Popconfirm, Table, Button, Input, Space } from "antd";
import Highlighter from "react-highlight-words";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { DeleteCKTableDataType } from "@/api/interfaces";
import { useRequest } from "ahooks";
import { userGet, userCKDelete } from "@/api/modules/handleCK";
import { SearchOutlined } from "@ant-design/icons";
import type { FilterConfirmProps } from "antd/es/table/interface";
import type { ColumnsType, ColumnType } from "antd/es/table";

type DataIndex = keyof DeleteCKTableDataType;

export default function Home() {
  const { userStore } = useStore();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [dataSource, setDataSource] = useState<DeleteCKTableDataType[]>([]);
  const navigate = useNavigate();
  const { runAsync: runGetEnv } = useRequest((params) => userGet(params), {
    manual: true,
    throttleWait: 1000,
  });
  const { runAsync: runDelete } = useRequest((data) => userCKDelete(data), {
    manual: true,
    throttleWait: 1000,
  });

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DeleteCKTableDataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DeleteCKTableDataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record: { key: React.Key }) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const getEnv = async () => {
    const username = userStore.username;
    const users: string[] = await runGetEnv(username)
      .then((res: any) => {
        return res.cookie;
      })
      .catch((err) => {
        if (err.statusCode === 401) {
          message.error("登录信息失效，请重新登录！");
          localStorage.removeItem("auth-token");
          navigate("/login");
        } else message.error(err.message);
      });

    const data: DeleteCKTableDataType[] = [];
    users.forEach((cookie, index) => {
      data.push({
        key: index,
        name: cookie,
        description: "TODO",
      });
    });

    return data;
  };

  useEffect(() => {
    async function fetchData() {
      setDataSource(await getEnv());
    }
    fetchData();
  }, []);

  const handleDelete = async (key: React.Key) => {
    try {
      let user: string = "";
      const newData = dataSource.filter((item) => {
        if (item.key !== key) return true;
        else {
          user = item.name;
          return false;
        }
      });
      await runDelete(`pt_pin=${user};`)
        .then(() => {
          setDataSource(newData);
          message.success("删除成功");
        })
        .catch((err) => {
          message.error(err.message);
        });
    } catch {
      message.error("删除失败");
    }
  };

  return <Table columns={columns} dataSource={dataSource} />;
}
