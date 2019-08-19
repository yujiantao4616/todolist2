import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { message, Select } from "antd";
import { connect } from "react-redux";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

import * as action from "../action";
import { date_today } from "../../tomato/index.js";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Option = Select.Option;

class NoteEdit extends Component {
  constructor(props) {
    super(props);
    const contentBlock = htmlToDraft(props.draft);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    const editorState = EditorState.createWithContent(contentState);
    this.state = {
      editorState: props.draft ? editorState : EditorState.createEmpty(),
      ifSaved: false, //判断是否为 点击保存 返回
      aboutMission:+props.match.params.aboutMission === -1? undefined:+props.match.params.aboutMission
    };
    this.change_note = this.change_note.bind(this);
    this.save_as_note = this.save_as_note.bind(this);
    //console.log(props.match.params.id)
  }
  change_note(editorState) {
    this.setState({
      editorState
    });
  }
  componentWillUnmount() {
    if (!this.state.ifSaved) {
      //如果点击 返回按钮 来返回上一级 就保存 到草稿
      var editorContent = draftToHtml(
        convertToRaw(this.state.editorState.getCurrentContent())
      );
      this.props.change_draft(editorContent);
    }
  }
  save_as_note() {
    var editorContent = draftToHtml(
      convertToRaw(this.state.editorState.getCurrentContent())
    );
    this.props.save_as_note(editorContent, this.props.match.params.id,this.state.aboutMission);
    //this.props.history.push('/note') // 原本是想点击保存就直接返回的
    // 可是 代码异步执行的问题，页面跳转以前 ifSaved 都没有改为 true
    message.success("笔记保存成功");
    this.setState({
      ifSaved: true
    });
    this.props.change_draft("");
  }
  render() {
    return (
      <div id="note_edit">
        <Editor
          onEditorStateChange={this.change_note}
          editorState={this.state.editorState}
        />
        <span className="saveNote" onClick={this.save_as_note}>
          {this.props.match.params.id >= 0 ? "修改" : "保存"}
        </span>
        <Select
          style={{ position: "absolute", top: "-40px", left: "95px",minWidth:'200px' }}
          placeholder="相关任务"
          onChange={(val) => { 
            this.setState({aboutMission:+val})
          }}
          value={this.state.aboutMission}
        >
          {this.props.mission
            .filter((item, index) => {
              if (
                date_today(
                  new Date(+this.props.match.params.date),
                  item.date_start,
                  item.date_end
                )
              ) {
                return item;
              }
            })
            .map((item, index) => {
              return (
                <Option key={item.id} value={item.id}>
                  {item.mission_name}
                </Option>
              );
            })}
        </Select>
      </div>
    );
  }
}

function mapStateToProps({ note, mission }) {
  return {
    draft: note.draft,
    mission: mission.mission_list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    change_draft(draft) {
      dispatch(action.change_draft(draft));
    },
    save_as_note(draft, id, missionId) {
      if(!missionId){
        missionId = -1
      }
      console.log(missionId)
      dispatch(action.add_note(draft, id, missionId));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteEdit);
