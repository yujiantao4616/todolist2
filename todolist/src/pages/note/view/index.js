import React, { Component } from 'react';
import { Button, Icon, DatePicker} from 'antd'
import moment from 'moment'
import { connect } from 'react-redux'
import { Route, Link as LinkRouter } from 'react-router-dom'

import * as action from '../action'
import NoteList from './note_list'
import NoteEdit from './note_edit'

import '../css/index.css'


class Note extends Component {
  scrollToAnchor = (noteId) => {
    //类似于锚点 页面内跳转

    // if (anchorName) {
    //   let anchorElement = document.getElementById(anchorName);
    //   if(anchorElement) { anchorElement.scrollIntoView(); }
    // } //这种方法是直接变化的，没有过度的效果
    
    let maxScroll = document.getElementsByClassName('noteList')[0].clientHeight - 447 + 17;
    if(document.getElementById(noteId)){
      var offsetTop = document.getElementById(noteId).parentElement.offsetTop - 78;
    } else {
      return false;
    }
    let scrollNow = document.getElementById('note_list_container').scrollTop;
    let scrollDistance = offsetTop > maxScroll?maxScroll:offsetTop;//从头开始计算需要滚动多少距离
    if(scrollDistance > 1000){
      //如果 需要滚动的距离大于1000 则直接滚动 没有动画
      document.getElementById('note_list_container').scrollTop = scrollDistance
    } else {
      var scrollInterval = setInterval(() => {
      if(scrollNow < scrollDistance){
        //滚动到达的部分在当前显示的部分的下方
        if(document.getElementById('note_list_container').scrollTop + 25 >= scrollDistance){
          document.getElementById('note_list_container').scrollTop = scrollDistance
          clearInterval(scrollInterval)
        } else {
          document.getElementById('note_list_container').scrollTop += 25
        }
      } else {
        //滚动到达的部分在当前显示的部分的上方
        if(document.getElementById('note_list_container').scrollTop -25 <= scrollDistance){
          document.getElementById('note_list_container').scrollTop = scrollDistance
          clearInterval(scrollInterval)
        } else {
            document.getElementById('note_list_container').scrollTop -= 25
        }
      }
      },10)
    }
    //document.getElementById('note_list_container').scrollTop = document.getElementById('2019/4/11').parentElement.offsetTop
    //console.dir(document.getElementById('2019/4/9').parentElement.offsetTop)
  }
  render(){
    return <div id="note">
        <div className="changeView">
            {this.props.match.isExact?<div><Button className="toToday" onClick={() => {
              this.props.change_currentDate(new Date())
              this.scrollToAnchor(new Date().toLocaleDateString())
            }}>今天</Button><span className="dateMission">{this.props.currentDate.toLocaleDateString()}</span>
            <DatePicker className="change_date_picker" format='YYYY/MM/DD' value={moment(this.props.currentDate)} onChange={(val) => {
              this.props.change_currentDate(val._d || new Date())
              this.scrollToAnchor(val._d.toLocaleDateString())
            }}/>
          </div>:<LinkRouter to="/note" style={{color:'#fff',fontSize:'17px'}}><Icon type="left"/>返回</LinkRouter>}
            <div className="changView_buttons">
          {this.props.match.isExact?
            <LinkRouter to={`/note/edit/-1/${Date.parse(new Date())}/-1`}><Icon type="plus" title="添加" style={{fontSize:'17px'}} onClick={this.props.change_draft}/></LinkRouter>
          :''}</div>
        </div>
        <Route component={NoteList} path={`${this.props.match.url}`} exact/>
        <Route component={NoteEdit} path={`${this.props.match.url}/edit/:id/:date/:aboutMission`}/>
    </div>
  }
}

function mapStateToProps({ note }){
    return {
        currentDate:note.currentDate
    }
}

function mapDispatchToProps(dispatch){
    return {
        change_currentDate(date){
          dispatch(action.change_currentDate(date))
        },
        change_draft(){
          dispatch(action.change_draft(''))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Note)

