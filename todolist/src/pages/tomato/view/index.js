import React from "react";
//import { Link } from 'react-router-dom';
import {
  Icon,
  Input,
  Statistic,
  DatePicker,
  Modal,
  Cascader,
  Button,
  Select,
  message,
  Popconfirm
} from "antd";
import { connect } from "react-redux";

import PreView from "./preview";
import * as action from "../action";
import { action as missionAction } from "../../mission";
import InputModal from "../../component/inputModal";

import { create_options, search_mission } from "../util/options";

import "../css/index.css";
const { RangePicker } = DatePicker;
const { Countdown } = Statistic;
const Search = Input.Search;
const testTime = 1000 * 10; //计时器测试用的时间
const tomatoTime = 1000 * 60 * 25; //一个番茄钟 25分钟
const restTime = 1000 * 60 * 5; //一个番茄钟的休息时间
const Option = Select.Option;
var options;

class Tomato extends React.Component {
  constructor(props) {
    super(props);
    var totalNumber = 0; //番茄总数
    var totalDay = 0; //使用番茄钟的天数
    for (var a in props.record) {
      totalDay++;
      for (var b in props.record[a]) {
        if (!props.record[a][b].status) {
          totalNumber++;
        }
      }
    }
    this.state = {
      missionName: "任务名称",
      totalNumber,
      totalDay,
      tomatoStatus: 0, //番茄钟状态
      mission_degree: "重要程度",
      mission_type: "任务分类",
      missionId: "任务Id",
      interruptReason: "", //番茄钟打断的原因
      tomatoHistory: false, //显示对话框
      historyType: 0, //显示记录的类型
      startTime: "", //单个番茄钟的起始时间
      endTime: "", //番茄钟的打算时间 用时间戳 保存,
      searchName: "", //查找的番茄记录名称 查找条件 任务名称
      record:props.record //番茄钟的历史记录
    };
  }
  change_mission = value => {
    this.setState({
      missionId: value[1].split("/")[0],
      missionName: value[1].split("/")[1],
      mission_type: value[1].split("/")[3],
      mission_degree: value[1].split("/")[2]
    });
  };
  componentWillReceiveProps(nextProps) {
    var newTotalNumber = 0;
    var newTotalDay = 0;
    for (var a in nextProps.record) {
      newTotalDay++;
      for (var b in nextProps.record[a]) {
        if (!nextProps.record[a][b].status) {
          newTotalNumber++;
        }
      }
    }
    this.setState({
      totalNumber: newTotalNumber,
      totalDay: newTotalDay,
      record:nextProps.record
    });
  }
  change_status = (interrupt, saveRecord = false) => {
    //interrupt 是否为打断的番茄钟
    if (this.state.missionName === "任务名称") {
      message.error("请先选择任务然后再开始");
    } else {
      if (this.state.tomatoStatus === 0) {
        this.setState({
          startTime: Date.parse(new Date()),
          tomatoStatus: 1
        });
      }
      if (this.state.tomatoStatus === 2) {
        this.setState({
          tomatoStatus: 0
        });
      }
      if (saveRecord) {
        this.setState({
          endTime: Date.parse(new Date()),
          tomatoStatus: 2
        });
      }
      if (this.state.tomatoStatus === 1 && saveRecord === false) {
        //打断记录
        this.setState({
          endTime: Date.parse(new Date()),
          tomatoStatus: 3
        });
      }
      if (saveRecord && !interrupt) {
        //番茄钟正常结束
        this.props.add_record(new Date().toLocaleDateString(), {
          startTime: this.state.startTime,
          endTime: Date.parse(new Date()),
          missionId: this.state.missionId,
          missionName:this.state.missionName,
          message: "任务:" + this.state.missionName,
          status: false
        });
      }
    }
  };
  show_tomatoHistory = () => {
    this.setState({
      tomatoHistory: !this.state.tomatoHistory
    });
  };
  tomato_finish = () => {
    //倒计时结束
    message.success("一个番茄钟结束");
    this.change_status(false, true);
  };
  change_history_type = val => {
    this.setState({
      historyType: val
    });
  };
  rest_finish = () => {
    this.setState({
      tomatoStatus: 0,
      missionName: "任务名称",
      mission_degree: "重要程度",
      mission_type: "任务分类",
      missionId: "任务Id"
    });
  };
  interrupt_reason = () => {
    this.setState({
      tomatoStatus: 0
    });
    this.props.add_record(new Date().toLocaleDateString(), {
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      missionId: this.state.missionId,
      missionName:this.state.missionName,
      message:
        "任务:" +
        this.state.missionName +
        " 打断原因:" +
        this.state.interruptReason,
      status: true
    });
  };
  render() {
    options = create_options(this.props.mission);
    return (
      <div id="tomato">
        {this.props.preview ? (
          <PreView hidePreview={this.props.change_preview} />
        ) : (
          <div className="mainContent">
            <div className="tapBar">
              {options.length === 0 ? (
                <Button
                  onClick={() => {
                    this.props.history.push("/mission");
                  }}
                >
                  添加任务
                </Button>
              ) : (
                <Cascader
                  options={options}
                  onChange={this.change_mission}
                  placeholder="选一个任务"
                />
              )}
              <Button type="default" onClick={this.show_tomatoHistory}>
                历史
              </Button>
            </div>
            <div className="tomatoContainer">
              <div className="tomatoItem">
                <span className="tomatoName">{this.state.missionName}</span>
                <div className="tomatoClock">
                  <div style={{ marginTop: "30px", fontSize: "30px" }}>
                    {this.state.tomatoStatus !== 0 &&
                    this.state.tomatoStatus !== 3 ? (
                      this.state.tomatoStatus === 1 ? (
                        <Countdown
                          format="mm:ss"
                          value={Date.parse(new Date()) + tomatoTime}
                          onFinish={this.tomato_finish}
                        />
                      ) : (
                        <Countdown
                          format="mm:ss"
                          value={Date.parse(new Date()) + restTime}
                          onFinish={this.rest_finish}
                        />
                      )
                    ) : (
                      <span className="ant-statistic ant-statistic-content">
                        25:00
                      </span>
                    )}
                  </div>
                  <div
                    className="timeControl"
                    title={this.state.tomatoStatus ? "暂停" : "开始"}
                  >
                    {this.state.tomatoStatus ? (
                      <Popconfirm
                        title="确定要打断当前的番茄钟？"
                        onConfirm={this.change_status}
                      >
                        <Icon type="pause" />
                      </Popconfirm>
                    ) : (
                      <Icon onClick={this.change_status} type="caret-right" />
                    )}
                  </div>
                </div>
                <div
                  style={{ marginTop: "20px", fontSize: "16px", color: "#000" }}
                >
                  <span style={{ marginRight: "10px" }}>
                    {this.state.mission_degree}
                  </span>
                  <span>{this.state.mission_type}</span>
                </div>
                <div style={{ marginTop: "50px" }}>
                  今日完成
                  <img
                    style={{
                      margin: "0 10px",
                      height: "20px",
                      verticalAlign: "sub"
                    }}
                    alt="tomato"
                    src={require("../../public/image/tomato.jpg")}
                  />
                  X {this.state.record[new Date().toLocaleDateString()]?this.state.record[new Date().toLocaleDateString()].filter((item,index) => {
                    if(!item.status){
                      return 1
                    }
                  }).length:0}
                </div>
              </div>
              <div className="tomatoItem">
                <div style={{ flex: 2 }}>
                  <div>
                    <span>总数</span>
                    <span style={{ color: "#F36364", fontSize: "28px" }}>
                      {this.state.totalNumber}
                    </span>
                  </div>
                  <div>
                    <span>日平均</span>
                    <span style={{ color: "#F36364", fontSize: "28px" }}>
                      {this.state.totalNumber === 0
                        ? 0
                        : (this.state.totalNumber / this.state.totalDay).toFixed(2)}
                    </span>
                  </div>
                </div>
                <div style={{ flex: 3 }}>
                  <div>最佳工作时间</div>
                </div>
                <div style={{ flex: 3 }}>
                  <div>任务标签分类</div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Modal
          footer={null}
          closable={false}
          visible={this.state.tomatoHistory}
          style={{ top: 20 }}
          onCancel={this.show_tomatoHistory}
        >
          <div className="tomato_title">
            <div>
              <img
                src={require("../../public/image/tomato.jpg")}
                alt="tomato"
              />
              历史
            </div>
            <Icon type="plus" rotate={45} onClick={this.show_tomatoHistory} />
          </div>
          <div className="tomato_history">
            <Select
              style={{ width: "120px" }}
              onChange={this.change_history_type}
              value={this.state.historyType}
            >
              <Option value={0}>全部记录</Option>
              <Option value={1}>完成的番茄</Option>
              <Option value={2}>打断的记录</Option>
            </Select>
            <RangePicker style={{ width: "220px" }} />
            <Search
              style={{ width: "120px" }}
              placeholder="查找任务名"
              value={this.state.searchName}
              onChange={e => {
                //console.log(search_mission(this.state.record,e.target.value))
                this.setState({
                  record:search_mission(this.props.record,e.target.value),
                  searchName: e.target.value
                });
              }}
            />
          </div>
          <div className="tomato_content" style={{ height: "300px" }}>
            {Object.keys(this.state.record).map(key => {
              return (
                <div
                  className="tomato_history_item"
                  key={key}
                  style={{
                    display:
                      this.props.record[key].filter(item => {
                        if (
                          this.state.historyType === 0 ||
                          (this.state.historyType === 1 && !item.status) ||
                          (this.state.historyType === 2 && item.status)
                        ) {
                          return 1;
                        }
                      }).length === 0
                        ? "none"
                        : "block"
                  }}
                >
                  <span style={{ marginRight: "20px" }}>{key}</span>
                  <div>
                    {this.props.record[key].map(item => {
                      var start = new Date(item.startTime);
                      var end = new Date(item.endTime);
                      return (
                        <div
                          key={item.startTime}
                          style={{
                            display:
                              this.state.historyType === 0 ||
                              (this.state.historyType === 1 && !item.status) ||
                              (this.state.historyType === 2 && item.status)
                                ? "block"
                                : "none"
                          }}
                        >
                          <span style={{width:'110px',display:'inline-block'}}>
                            {start.getHours()}:{start.getMinutes()}:
                            {start.getSeconds()}-{end.getHours()}:
                            {end.getMinutes()}:{end.getSeconds()}
                          </span>
                          <span style={{ marginLeft: "10px" }}>
                            {item.message}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </Modal>
        <InputModal
          cancelFunc={this.interrupt_reason}
          visible={this.state.tomatoStatus === 3}
          placeholder="请输入打断的原因"
          returnValue={val => {
            this.setState({
              interruptReason: val
            });
          }}
        />
      </div>
    );
  }
}
function mapStateToProps({ tomato, mission }) {
  return {
    preview: tomato.preView,
    totalNumber: tomato.totalNumber,
    record: tomato.record,
    mission: mission.mission_list
  };
}
function mapDispatchToProps(dispatch) {
  return {
    change_preview() {
      dispatch(action.change_preview());
    },
    add_record(date, record) {
      dispatch(action.add_record(date, record));
      if (!record.status) {
        dispatch(missionAction.change_tomatoReal(+record.missionId));
      }
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tomato);
