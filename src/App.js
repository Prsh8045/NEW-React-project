import "antd/dist/antd.css";
import "./App.css";
import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id:"1",
      firstname: "Prashant",
      lastname: "Kumar",
      email: "prashantprs12@gmail.com",
      phone: "9041546975",
    },
    {
      id:"2",
      firstname: "Amit",
      lastname: "Singh",
      email: "amit@gmail.com",
      phone: "3654853580",
    },
    {
      id:"3",
      firstname: "Pradeep",
      lastname: "Gupta",
      email: "pradeep@gmail.com",
      phone: "3247347742",
    },
    {
      id:"4",
      firstname: "Rohit",
      lastname: "Bhagat",
      email: "rohit@gmail.com",
      phone: "3473171626",
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "Id",
      dataIndex: "id",
    },

    {
      key: "2",
      title: "FirstName",
      dataIndex: "firstname",
    },
    {
      key: "3",
      title: "LastName",
      dataIndex: "lastname",
    },
    {
      key: "4",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "5",
      title: "Phone",
      dataIndex: "phone",
    },
    {
      key: "6",
      title: "Edit/Delete",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newStudent = {
      id:"Id" + randomNumber,
      firstname:"FirstName" +randomNumber,
      lastname: "LastName " + randomNumber,
      email: randomNumber + "@gmail.com",
      phone: "number" + randomNumber,
    };
    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Is it sure  delete student name?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };
  return (
    <div className="App">
      <h1>Todo List</h1>
      <header className="App-header">
        <Button onClick={onAddStudent}>Add list</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.id === editingStudent.id) {
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >
           <Input
            value={editingStudent?.firstname}
             onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, firstname: e.target.value };
              });
            }}
          />

          <Input
            value={editingStudent?.lastname}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, lastname: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.email}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.phone}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, phone: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default App;