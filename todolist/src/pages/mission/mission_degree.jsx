import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Icon, Input, Select, Button } from "antd";

// import Missions from "./component/missions";
// import MissionModal from "./component/modal";

const level = ["重要且紧急", "紧急不重要", "重要不紧急", "不紧急不重要"];
//const Option = Select.Option;

class MissionDegree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drag_now_data: {}, //当前正在拖拽的 任务
      warn: false, //提示 未输入的值
      new_mission: {
        mission_name: "", //任务名称
        complete: false, //任务是否完成
        date_start: "", //启示日期
        date_end: "", //结束日期
        degree: "", //重要程度  1-4 1最高  分别为紧急重要 紧急不重要 重要不紧急 不紧急不重要，必填
        mission_type: "", //任务类型
        related: [], //相关人员
        progress: "", //number 任务整体的进度
        mission_address: "", //任务地点
        mission_tools: "", //任务需要的工具
        mission_attention: "", //任务注意事项
        mission_detail: "", //任务详情,
        missionDay: [],
        tomato: "",
        totalReal: ""
      },
      show_addMission: [false, false, false, false]
    };
    // this.options = this.props.mission_type.map((item, index) => {
    //   return (
    //     <Option key={index} value={item}>
    //       {item}
    //     </Option>
    //   );
    // });
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
  show_addMission_button(index, addMission = false) {
    // 开关相应的 添加任务的 组件
    //显示 和 关闭 由 show_addMission 决定 className:addMission_hide 是否存在
    //addMission 判断是否为添加组件的动作
    var show_addMission = this.state.show_addMission;
    if (addMission) {
      // console.log(this.state.new_mission.mission_name !== '')
      // console.dir(this.state.show_addMission)
      // console.dir(show_addMission)
      if (this.state.new_mission.mission_name !== "") {
        //点击 确定按钮提交任务时，判断任务名称是否 存在
        //如果不存在 先不关闭 添加窗口 将任务名称输入框 边框颜色变为红色
        show_addMission.map((item, i) => {
          if (i === index) {
            show_addMission[i] = !show_addMission[i];
          } else {
            show_addMission[i] = false;
          }
          return show_addMission[i];
        });
        this.setState({
          show_addMission
        });
        var mission = { ...this.state.new_mission };
        mission.date_start = new Date(Date.parse(this.props.currentDate));
        mission.date_end = new Date(Date.parse(this.props.currentDate));
        this.props.addMission(mission);
        this.setState({
          new_mission: {
            mission_name: "", //任务名称
            complete: false, //任务是否完成
            date_start: "", //启示日期
            date_end: "", //结束日期
            degree: "", //重要程度  1-4 1最高  分别为紧急重要 紧急不重要 重要不紧急 不紧急不重要，必填
            mission_type: "", //任务类型
            related: [], //相关人员
            progress: "", //number 任务整体的进度
            mission_address: "", //任务地点
            mission_tools: "", //任务需要的工具
            mission_attention: "", //任务注意事项
            mission_detail: "", //任务详情,
            missionDay: [],
            tomato: "",
            totalReal: ""
          }
        });
      } else {
        this.setState({
          show_addMission: this.state.show_addMission,
          warn: true
        });
      }
    } else {
      show_addMission.map((item, i) => {
        if (i === index) {
          show_addMission[i] = !show_addMission[i];
        } else {
          show_addMission[i] = false;
        }
        return show_addMission[i];
      });
      this.setState({
        show_addMission,
        new_mission: {
          ...this.state.new_mission,
          degree: ++index
        }
      });
    }
  }
  change_mission(obj) {
    //数据修改
    if (obj.mission_name !== "") {
      this.setState({
        warn: false,
        new_mission: {
          ...this.state.new_mission,
          ...obj
        }
      });
    } else {
      this.setState({
        new_mission: {
          ...this.state.new_mission,
          ...obj
        }
      });
    }
  }
  componentDidMount() {
    //console.log(this.props.currentDate)
  }
  componentDidUpdate() {
    //console.log(this.props.currentDate)
  }
  render() {
    return <div id="mission_degree">missionDegree</div>;
  }
}
export default MissionDegree;
