import React from "react";
import { message } from "antd";
import validate from "../../../js/validator";

class MessageCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonCon: "发送验证码",
      countTime: 60, //验证码发送计时
      phoneNumber: "",
      messageCode: "",
      errorMeesage: "", //错误信息
      checkPhoneNumber: false, //检查手机号的格式
      welcomSlogan: props.welcomSlogan //输入框上方的标语
    };
  }
  sendCode = () => {
    //发送验证码
    if (!this.state.checkPhoneNumber) {
      //验证手机号格式
      message.error(this.state.errorMessage);
      return false;
    }
    //开始一分钟的倒计时
    let codeCountTime = setInterval(() => {
      this.setState({
        countTime: this.state.countTime - 1,
        buttonCon: `${this.state.countTime}s`
      });
      if (this.state.countTime === 0) {
        clearInterval(codeCountTime);
        this.setState({
          countTime: 60,
          buttonCon: "发送验证码"
        });
      }
    }, 1000);
  };
  confirmBtn = () => {
    fetch("http://localhost:8080/checkPhone", {
      method: "post",
      body: JSON.stringify({
        phoneNumber: this.state.phoneNumber,
        messageCode: this.state.messageCode
      })
    })
      .then(res => res.text())
      .then(data => {
        var data = JSON.parse(data);
        if (data.code === 1) {
          if (this.props.componentType) {
            //修改密码也需要验证手机号是否在数据库中 已注册
            this.props.changeContainerLs(4);
          } else {
            //后台显示数据库中有该手机号，该操作视为用手机号短信验证登录
            this.props.toMainPage();
          }
        } else if (data.code === 0) {
          if (this.props.componentType) {
            message.error("账号不存在，请先注册");
          } else {
            //跳转到设置密码的环节
            this.props.changeContainerLs(3);
            //注册设置密码
          }
        } else {
          //data.code === 2 验证码错误
          message.error("验证码错误");
        }
      });
  };
  sign = () => {
    if (!this.state.checkPhoneNumber) {
      message.error(this.state.errorMessage);
      return false;
    } else {
      this.confirmBtn();
    }
  };
  render() {
    return (
      <div className="sign lsContentBox">
        <span className="welcomSlogan">
          {this.state.welcomSlogan ? (
            this.state.welcomSlogan
          ) : (
            <span>
              欢迎使用
              <br />
              TodoList
            </span>
          )}
        </span>
        <div>
          <input
            type="number"
            placeholder="请输入手机号码"
            key="signPhone"
            onChange={e => {
              this.setState({
                phoneNumber: e.target.value
              });
              this.props.setUserPhoneNumber(e.target.value);
              var result = validate("mobile", e.target.value);
              if (!result.result) {
                this.setState({
                  checkPhoneNumber: false,
                  errorMeesage: result.errorMessage
                });
              } else {
                this.setState({
                  checkPhoneNumber: true
                });
              }
            }}
          />
          <input
            type="number"
            placeholder="请输入验证码"
            key="signMesCode"
            onChange={e => {
              this.setState({
                messageCode: e.target.value
              });
            }}
            maxLength={4}
          />
          <button
            className={`${
              this.state.checkPhoneNumber && this.state.countTime === 60
                ? ""
                : "disable"
            } sendMessageCode`}
            onClick={this.sendCode}
            disabled={
              this.state.checkPhoneNumber && this.state.countTime === 60
                ? false
                : true
            }
          >
            {this.state.buttonCon}
          </button>
          <button
            onClick={this.sign}
            disabled={
              this.state.phoneNumber && this.state.messageCode ? false : true
            }
            className={
              this.state.phoneNumber && this.state.messageCode ? "" : "disable"
            }
          >
            {this.props.confirmBtn || "注册"}
          </button>
        </div>
      </div>
    );
  }
}
export default MessageCode;
