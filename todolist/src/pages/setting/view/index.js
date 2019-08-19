import React, { Component } from "react";
import { Icon, Anchor } from "antd";

import "../../index.css";

const { Link } = Anchor;

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prePathLength: props.history.length
    };
  }
  render() {
    console.log(this.props.history.length);
    console.log(this.state.prePathLength);
    return (
      <div>
        {/* 设置界面*/}
        <div
          className="settingTop"
          onClick={() => {
            console.log(this.props.history.length);
            this.props.history.go(
              this.state.prePathLength - this.props.history.length - 1
            );
          }}
        >
          <Icon type="left" />
          设置
        </div>
        <div className="settingContent">
          <div className="leftSide">
            <div id="backupCode">
              <div className="settingTitle">备份码</div>
              <div>备份码：{}</div>
              <div className="declare" title="说明">
                备份码是用来从服务器获取上次使用数据的编码，只要经过备份就能将原来的数据还原
              </div>
            </div>
            <div>
              <div className="settingTitle">备份码</div>
              <div>备份码：{}</div>
              <div className="declare" title="说明">
                备份码是用来从服务器获取上次使用数据的编码，只要经过备份就能将原来的数据还原
              </div>
            </div>
          </div>
          <div className="rightSide">
            <Anchor>
              <Link href="#backupCode" title="备份码" />
              <Link href="#components-anchor-demo-static" title="Static demo" />
              <Link title="备份&还原">
                <Link href="#restore" title="还原" />
                <Link href="#backup" title="备份" />
              </Link>
            </Anchor>
          </div>
        </div>
      </div>
    );
  }
}
