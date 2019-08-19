import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Icon, message } from "antd";

// import MissionModal from "./component/modal";
// import Missions from "./component/missions";
//import Missions from "../component/missions";
class MissionType extends Component {
  constructor() {
    super();
    this.state = {
      deltaY: -50,
      drag_now_data: {},
      showNewType: false,
      newMissionType: "", //新的分类的名称
      deleteType: false, //删除按钮的显示状态
      hoverIndex: -1 //删除按钮的下标
    };
    this.mission_startDrag = this.mission_startDrag.bind(this);
  }
  mission_startDrag(data, event = "click") {
    //drag 和 click 共用事件 需要的都是 操作的对象的数据
    this.setState({
      drag_now_data: data
    });
    if (event === "click") {
      this.refs.mission_modal.addMission(true);
    }
  }
  scrollPart(num) {
    if (
      this.state.deltaY + num >= -50 &&
      (this.props.mission_type.length + 1) * 230 >=
        (this.state.deltaY + num) * 0.5 + 50 + 712
    ) {
      this.setState({
        deltaY: this.state.deltaY + num
      });
    }
  }
  render() {
    return <div id="mission_type">missionType</div>;
  }
}

export default MissionType;
