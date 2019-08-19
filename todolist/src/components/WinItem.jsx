import React from "react";
import Proptypes from "prop-types";
import { Icon } from "antd";

import "../css/components/winItem.css";
//component for windows item
export default class WinItem extends React.Component {
  constructor(props, context) {
    //参数说明 props:{maximize:'是否含有改变窗口大小的按钮'} context:{ipc:'进程通讯的接口'}
    super(props, context);
    this.state = {
      winMax: false //窗口是否处于最大化的状态
    };
    this.context.ipc.on("maximize", () => {
      this.setState({
        winMax: true
      });
    });
    this.context.ipc.on("unmaximize", () => {
      this.setState({
        winMax: false
      });
    });
  }
  hideWin = () => {
    //缩小窗口
    this.context.ipc.send("minimize");
  };
  changeWinSize = () => {
    this.context.ipc.send("changeWinSize", this.state.winMax);
    this.setState({
      winMax: !this.state.winMax
    });
  };
  closeWin = () => {
    this.context.ipc.send("closeWin");
  };
  // shouldComponentUpdate(nextProps){
  //   return false;
  // }
  render() {
    return (
      <div id="winItem">
        <div onClick={this.hideWin}>
          <Icon type="line" />
        </div>
        {this.props.maximize ? (
          <div onClick={this.changeWinSize}>
            {!this.state.winMax ? (
              <Icon type="border" />
            ) : (
              <Icon type="block" />
            )}
          </div>
        ) : (
          ""
        )}

        <div onClick={this.closeWin}>
          <Icon type="poweroff" />
        </div>
      </div>
    );
  }
}
WinItem.contextTypes = {
  ipc: Proptypes.object
};
