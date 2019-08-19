//单条任务 组件

import React  from "react";
import { connect } from 'react-redux';
import { Icon } from 'antd'

import * as action from "../action";

const colorList = ["#F36364", "#23A8F9", "#F4CA4C", "#93CD2F"]; //红，蓝，黄，绿

class Missions extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      deleteButton:false
    }
    this.showDeleteButton = this.showDeleteButton.bind(this)
    this.hideDeleteButton = this.hideDeleteButton.bind(this)
  }
  showDeleteButton(){
    this.setState({
      deleteButton:true
    })
  }
  hideDeleteButton(){
    this.setState({
      deleteButton:false
    })
  }
  componentDidMount(){
    // console.log(this.props.data)
  }
  render(){
    // console.log('rendered')
    return (
      <div 
        className="missions " 
        draggable 
        onDragStart={()=>{this.props.mission_startDrag(this.props.data,'drag')}} 
        style={{marginBottom:'10px',position:'relative'}} 
        onClick={() => {this.props.mission_startDrag(this.props.data)}}
        onMouseOver={this.showDeleteButton}
        onMouseLeave = {this.hideDeleteButton}
      >
        <div className="colorBlock" style={{backgroundColor:colorList[this.props.data.degree-1]}} />
        <div className="checkBox" onClick={(e) => {
          e.stopPropagation();// 阻止事件冒泡
          this.props.changeMission_complete(this.props.data,this.props.currentDate)
        }}>
          {this.props.data.missionDay.indexOf(new Date(this.props.currentDate).toLocaleDateString()) !== -1?<Icon type="check" style={{color:'green'}}/>:''}
        </div>
        <span className='missionName' style={{textDecoration:this.props.data.missionDay.indexOf(new Date(this.props.currentDate).toLocaleDateString()) !== -1?'line-through':'',color:this.props.data.missionDay.indexOf(new Date(this.props.currentDate).toLocaleDateString()) !== -1?'#BBBBBB':''}}>{this.props.data.mission_name}</span>
        <span style={{ position:'absolute',right:'25px' }}>{this.props.data.mission_type}</span>
        <Icon className="deleteIcon" type="close" style={{display:this.state.deleteButton?'inherit':'none'}} onClick={(e)=>{
          e.stopPropagation();// 阻止事件冒泡
          this.props.deleteMission(this.props.data.id)
        }}/>
      </div>
    );
  }
}

function mapStateToProps({mission}, {data,mission_startDrag}){
  return {
    data,
    mission_startDrag,
    currentDate:mission.currentDate
  }
}
function mapDispatchToProps(dispatch, {data}){
  return {
    changeLevel:(nextLevel)=>{
      //nextLevel 修改任务 的重要程度 修改到什么程度
      dispatch(action.change_mission(data,{degree:nextLevel}))
    },
    deleteMission(id){
      dispatch(action.delete_mission(id))
    },
    changeMission_complete(data, finishDate){
      if(data.missionDay.indexOf(finishDate.toLocaleDateString()) === -1){
        data.missionDay.push(finishDate.toLocaleDateString())
      } else {
        data.missionDay.splice(data.missionDay.indexOf(new Date().toLocaleDateString()),1)
      }
      dispatch(action.change_mission({data,dataChange:{missionDay:data.missionDay}}))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Missions);
