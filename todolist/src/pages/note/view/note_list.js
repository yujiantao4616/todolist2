import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from "antd";

import * as action from "../action";

class NoteList extends Component {
  constructor() {
    super();
    this.state = {
      NoteId: -1
    };
  }
  render() {
    return (
      <div id="note_list">
        <div id="note_list_container">
          {this.props.noteList.length === 0 ? (
            <div className="noNote">
              <img
                style={{ height: "120px" }}
                src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554871996680&di=043cc38fa05b4de8a60dd89d70eced9a&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01ce335971b961a8012193a3fbc916.gif"
                alt="暂无内容"
              />
              <span style={{ fontSize: "16px" }}>正在加载不存在的内容</span>
            </div>
          ) : (
            <div className="noteList">
              {this.props.noteList.map(item => {
                return (
                  <div
                    key={new Date(item.date).toLocaleDateString()}
                    className="noteDate"
                  >
                    <span
                      className="noteAddTime"
                      id={new Date(item.date).toLocaleDateString()}
                    >
                      {new Date(item.date).toLocaleDateString()}
                    </span>
                    {item.noteList.map(i => {
                      return (
                        <div
                          key={`${i.id}${i.time}`}
                          style={{ marginBottom: "30px" }}
                          onMouseEnter={() => {
                            this.setState({
                              NoteId: i.id
                            });
                          }}
                          onMouseLeave={() => {
                            this.setState({
                              NoteId: -1
                            });
                          }}
                        >
                          <div
                            className="noteItem"
                            dangerouslySetInnerHTML={{ __html: i.noteContent }}
                            onClick={() => {
                              this.props.change_draft(i.noteContent);
                              this.props.history.push(
                                `/note/edit/${i.id}/${Date.parse(
                                  new Date(item.date)
                                )}/${i.aboutMission ? i.aboutMission : -1}`
                              );
                            }}
                          />
                          <span>{i.time}</span>
                          <Icon
                            title="删除"
                            type="close"
                            style={{
                              visibility:
                                this.state.NoteId === i.id
                                  ? "visible"
                                  : "hidden",
                              float: "right",
                              marginRight: "30px",
                              marginTop: "5px",
                              cursor: "pointer"
                            }}
                            onClick={() => {
                              this.props.delete_note(i.id);
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    noteList: state.note.noteList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    delete_note(id) {
      dispatch(action.delete_note(id));
    },
    change_draft(draft) {
      dispatch(action.change_draft(draft));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList);
