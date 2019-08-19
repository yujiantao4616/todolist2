import React from "react";
import { Icon, message } from "antd";
import validate from "../../../js/validator";
export default class Pwd extends React.Component {
  constructor() {
    super();
    this.state = {
      pwd1Type: false, //设置密码输入框的type类型 false type=password true type=text
      pwd2Type: false, //确认密码
      password: "",
      confirmPassword: ""
    };
  }
  setPwd = () => {
    let result = validate("password", this.state.password);
    if (!result.result) {
      message.error("密码为6-20个字母、数字、下划线");
      return;
    }
    if (this.state.password !== this.state.confirmPassword) {
      message.error("两次输入的密码不一致");
      return;
    }
    fetch("http://localhost:8080/setPwd", {
      method: "post",
      body: JSON.stringify({
        userPhone: this.props.getUserPhoneNumber(),
        password: this.state.password,
        componentType: this.props.componentType
      })
    })
      .then(res => res.text())
      .then(data => {
        if (JSON.parse(data).code === 1) {
          this.props.toMainPage();
        }
      });
  };
  render() {
    return (
      <div className="lsContentBox">
        <span className="welcomSlogan">{this.props.welcomSlogan}</span>
        <div>
          <span>
            <span>设置密码</span>
            <Icon
              type={this.state.pwd1Type ? "eye-invisible" : "eye"}
              onClick={() => {
                this.setState({
                  pwd1Type: !this.state.pwd1Type
                });
              }}
            />
          </span>
          <input
            type={this.state.pwd1Type ? "text" : "password"}
            onChange={e => {
              this.setState({
                password: e.target.value
              });
            }}
          />
          <span>
            <span>确认密码</span>
            <Icon
              type={this.state.pwd2Type ? "eye-invisible" : "eye"}
              onClick={() => {
                this.setState({
                  pwd2Type: !this.state.pwd2Type
                });
              }}
            />
          </span>
          <input
            type={this.state.pwd2Type ? "text" : "password"}
            onChange={e => {
              this.setState({
                confirmPassword: e.target.value
              });
            }}
          />
          <button onClick={this.setPwd}>确定</button>
        </div>
      </div>
    );
  }
}
