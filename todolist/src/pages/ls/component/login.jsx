import React from "react";
import { message } from "antd";
import validate from "../../../js/validator";
class Login extends React.Component {
  constructor() {
    super();
    localStorage.setItem("face", 1);
    this.state = {
      loginPhone: "",
      loginPwd: ""
    };
  }
  confirmBtn = () => {
    //登录按钮的动作 手机号格式验证成功以后 请求后台
    fetch("http://localhost:8080/login", {
      method: "post",
      body: JSON.stringify({
        loginPhone: this.state.loginPhone,
        loginPwd: this.state.loginPwd
      })
    })
      .then(res => res.text())
      .then(data => {
        var data = JSON.parse(data);
        if (data.code === 1) {
          this.props.toMainPage();
        } else {
          message.error(data.message);
        }
      });
  };
  login = () => {
    var result = validate("mobile", this.state.loginPhone);
    if (!result.result) {
      message.error(result.errorMessage);
    } else {
      this.confirmBtn();
    }
  };
  render() {
    return (
      <div className="login lsContentBox">
        <img
          src={require("../../../img/default_head_img.jpg")}
          alt="头像"
          className="headImg"
        />
        <div>
          <input
            type="number"
            placeholder="手机号/邮箱/用户名"
            onChange={e => {
              this.setState({
                loginPhone: e.target.value
              });
            }}
          />

          <input
            type="password"
            placeholder="请输入密码"
            onChange={e => {
              this.setState({
                loginPwd: e.target.value
              });
            }}
          />

          <button
            type="button"
            onClick={this.login}
            disabled={
              this.state.loginPhone && this.state.loginPwd ? false : true
            }
            className={
              this.state.loginPhone && this.state.loginPwd ? "" : "disable"
            }
          >
            登录
          </button>
          <div>
            <span
              onClick={() => {
                console.log(2);
                this.props.changeContainerLs(2);
              }}
            >
              忘记密码？
            </span>
            <span onClick={() => this.props.changeContainerLs(1)}>
              没有账号？
            </span>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
