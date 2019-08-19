import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import { Radio, Button, Icon, message, DatePicker } from "antd";
import PropTypes from "prop-types";
import moment from "moment";

import Mission_type from "./mission_type";
import Mission_degree from "./mission_degree";

import "./css/index.css";

const error = () => {
  message.error("带 *号为必填");
};
// const Option = Select.Option
// const { RangePicker } = DatePicker;

class Mission extends Component {
  render() {
    return <div id="mission">mission</div>;
  }
}

export default Mission;
