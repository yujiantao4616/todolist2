//头部公共组件 用来切换路由

import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import WinItem from "./WinItem";
//import InuptModal from "../component/inputModal";

// const menu = that => (
//     <Menu>
//         <Menu.Item key="0">
//             <span
//                 onClick={() => {
//                     that.context.ipc.send("saveStore", JSON.stringify(store.getState()));
//                 }}
//             >
//                 备份数据
//       </span>
//         </Menu.Item>
//         <Menu.Item key="1">
//             <Link to="/setting">还原数据</Link>
//         </Menu.Item>
//         <Menu.Divider />
//         <Menu.Item key="2">
//             <Link to="/setting">设置</Link>
//         </Menu.Item>
//     </Menu>
// );

class TopBar extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {};
  }
  render() {
    const activeStyle = {
      backgroundColor: "#00B0DF",
      color: "white",
      borderRadius: "6px"
    };
    const activeStyle2 = {
      backgroundColor: "#F98995",
      color: "white",
      borderRadius: "6px"
    };
    return (
      <div id="topBar">
        <nav>
          <div>
            <NavLink to="/note" activeStyle={activeStyle} title="hello">
              笔记
            </NavLink>
            <NavLink to="/mission" activeStyle={activeStyle}>
              任务
            </NavLink>
            <NavLink to="/" activeStyle={activeStyle} exact>
              日程
            </NavLink>
            <NavLink to="/schedule" activeStyle={activeStyle}>
              待办
            </NavLink>
            <NavLink to="/tomato" activeStyle={activeStyle2}>
              番茄钟
            </NavLink>
          </div>
        </nav>
        <WinItem name={1} />
      </div>
    );
  }
}
export default TopBar;
