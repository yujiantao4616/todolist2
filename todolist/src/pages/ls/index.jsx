import React from "react";
import WinItem from "../../components/WinItem";
import { Icon } from "antd";
import Proptype from "prop-types";

import Login from "./component/login";
import MessageCode from "./component/messageCode";
import Pwd from "./component/pwd";

import "../../css/ls.css";
class Ls extends React.Component {
  constructor() {
    super();
    localStorage.setItem("face", 1);
    this.state = {
      userPhone: "", //用户的手机号不对修改和注册的手机号做出区分
      containerLs: 0 //控制显示登录，注册和找回密码其中一个界面 登录 0 注册 1 找回密码 2 注册设置密码 3 重新设置密码 4
    };
  }
  changeContainerLs = val => {
    if (val === this.state.containerLs) {
      return false;
    }
    this.setState({
      containerLs: val
    });
  };
  toMainPage = () => {
    this.context.ipc.send("changeWin", "ls", "mainPage");
  };
  getUserPhoneNumber = () => {
    //让子组件获取到当前用户手机号
    return this.state.userPhone;
  };
  setUserPhoneNumber = val => {
    this.setState({
      userPhone: val
    });
  };
  render() {
    return (
      <div id="ls">
        <div className="topBar">
          <div className="title" onClick={() => this.changeContainerLs(0)}>
            {this.state.containerLs ? <Icon type="arrow-left" /> : ""}
            TodoList
          </div>
          <WinItem />
        </div>
        <div className="containerLs">
          {!this.state.containerLs ? (
            <Login
              changeContainerLs={this.changeContainerLs}
              toMainPage={this.toMainPage}
            />
          ) : this.state.containerLs === 1 ? (
            <MessageCode
              changeContainerLs={this.changeContainerLs}
              toMainPage={this.toMainPage}
              setUserPhoneNumber={this.setUserPhoneNumber}
            />
          ) : this.state.containerLs === 2 ? (
            <MessageCode
              changeContainerLs={this.changeContainerLs}
              setUserPhoneNumber={this.setUserPhoneNumber}
              toMainPage={this.toMainPage}
              welcomSlogan="新密码设置"
              confirmBtn="确定"
              componentType={2}
            />
          ) : this.state.containerLs === 3 ? (
            <Pwd
              welcomSlogan="设置密码"
              toMainPage={this.toMainPage}
              componentType={3}
              getUserPhoneNumber={this.getUserPhoneNumber}
            />
          ) : (
            <Pwd
              welcomSlogan="设置新密码"
              toMainPage={this.toMainPage}
              componentType={4}
              getUserPhoneNumber={this.getUserPhoneNumber}
            />
          )}
        </div>
      </div>
    );
  }
}
Ls.contextTypes = {
  ipc: Proptype.object
};
export default Ls;
