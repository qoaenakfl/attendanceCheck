import React from "react";
import { Table, Button } from "antd";

import { EditableCell, EditableFormRow } from "./EditableCell";

import firebaseData from "../../firebaseService/database/firebaseData";
import AppLoading from "../common/AppLoading";

class ContentLayout extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "area",
        dataIndex: "area"
      },
      {
        title: "name",
        dataIndex: "name"
      },
      {
        title: "location",
        dataIndex: "location",
        editable: true
      },
      {
        title: "time",
        dataIndex: "time",
        editable: true,
        isDrop: true
      }
    ];

    this.state = {
      dataSource: [
        {
          key: "0",
          name: "Edward King 0",
          area: "1",
          location: "서울"
        },
        {
          key: "1",
          name: "Edward King 1",
          area: "1",
          location: "서울"
        }
      ],
      count: 2,
      isLoading: true
    };
  }

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
  };

  componentDidMount = () => {
    firebaseData.dropMenu("wed").then(dropData => {
      this.setState({
        dropData: dropData
      });
      
      this.getTabelColumns();
    });
  };

  getAreaMember= () =>{
    firebaseData.areaMember(firebaseData.data.area)
      .then(member => {
        this.setState({dataSource: member});
    });
  }

  componentDidUpdate = () => {
    this.getTabelColumns();
  };

  getColumns = () => {
    if (this.props.contentNum == 1) {
      return firebaseData.beforeContent();
    } else if (this.props.contentNum == 2) {
      return firebaseData.afterContent();
    } else {
      return new Error("에러");
    }
  };

  getTabelColumns = () => {
    this.getColumns().then(_columns => {
      this.columns = _columns;
      this.setState({ isLoading: false });
    });
  };

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          isDrop: col.isDrop,
          dropData: this.state.dropData
        })
      };
    });
    return (
      <div>
        {this.state.isLoading ? (
          <AppLoading />
        ) : (
          <div>
            <Button
              //onClick={this.handleAdd}
              type="primary"
              style={{ marginBottom: 16 }}
            >
              저장
            </Button>
            <Table
              components={components}
              rowClassName={() => "editable-row"}
              bordered
              dataSource={dataSource}
              columns={columns}
            />
          </div>
        )}
      </div>
    );
  }
}

export default ContentLayout;
