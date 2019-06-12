import React from "react";
import { Table, Button } from "antd";

import { EditableCell } from "./EditableCell";
import { EditableFormRow } from "./editableCell/cellFrom";

import firebaseData from "../../firebaseService/database/firebaseData";
import AppLoading from "../common/AppLoading";

import { getReportDay, getReportDate } from "../../common/dayParser";

import logger from "../../common/logger";
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
      isLoading: true,
      time: [],
      worship: [],
      meeting: [],
      note: []
    };
  }

  handleSave = row => {
    const newData = [...this.state.dataSource];
    logger(newData);
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ dataSource: newData });
  };

  saveData = () => {
    logger("*********************************");
    logger("*************saveData*************");
    logger("*********************************");
    getReportDate().then(date => {
      logger(date);
      if (this.props.contentnumber == 1) {
        logger(typeof this.state.dataSource);
        firebaseData.beforeReport(
          date,
          [...this.state.dataSource],
          firebaseData.data.area
        );
      } else if (this.props.contentnumber == 2) {
        firebaseData.afterReport(
          date,
          [...this.state.dataSource],
          firebaseData.data.area
        );
      }
    });
    logger(this.state.dataSource);
  };

  componentDidMount = () => {
    getReportDay().then(day => {
      firebaseData.dropMenu(day).then(dropData => {
        this.setState({
          dropData: dropData
        });
        this.getAreaMember();
        this.getTabelColumns();
      });
    });
  };

  getAreaMember = () => {
    firebaseData.areaMember(firebaseData.data.area).then(member => {
      let row = {
        time: this.state.dropData[2].time,
        worship: this.state.dropData[2].time,
        meeting: this.state.dropData[2].time,
        note: true
      };
      for (let i = 0; i < member.length; i++) {
        let item = member[i];
        member.splice(i, 1, {
          ...item,
          ...row
        });
      }
      logger("*********************************");
      logger("*************saveData*************");
      logger("*********************************");
      this.setState({ dataSource: member });
    });
  };

  componentDidUpdate = () => {
    this.getTabelColumns();
  };

  getColumns = () => {
    if (this.props.contentnumber == 1) {
      return firebaseData.beforeContent();
    } else if (this.props.contentnumber == 2) {
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
          dataindex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          isDrop: col.isDrop,
          dropData: this.state.dropData,
          contentnumber: this.props.contentnumber,
          isSwitch: col.isSwitch
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
              onClick={this.saveData}
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
