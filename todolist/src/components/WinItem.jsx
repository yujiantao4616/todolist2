import React from "react";

//component for windows item
export default class WinItem extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    console.log(this.context);
  }
  render() {
    return (
      <div id="winItem">
        <div>
          <img src={require("../img/zuixiaohua.png")} alt="" />
        </div>
        <div>
          <img src={require("../img/xiao.png")} alt="" />
        </div>
        <div>
          <img src={require("../img/jiahao.png")} alt="" />
        </div>
      </div>
    );
  }
}
