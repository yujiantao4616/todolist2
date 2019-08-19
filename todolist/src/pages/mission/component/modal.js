import React from 'react';
import { Modal, Input, Icon, DatePicker, Select } from 'antd';
import moment from 'moment';
//import { connect } from 'react-redux';

const Option = Select.Option;
const { RangePicker } = DatePicker;
const level = ["重要且紧急", "紧急不重要", "重要不紧急", "不紧急不重要"];

export default class MissionModal extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            add_mission: false,
            new_mission:{
              mission_name:undefined, //任务名称
              //complete: false, //任务是否完成
              date_start: '', //启示日期
              date_end: '', //结束日期
              related: [], //相关人员
              progress: '', //number 任务整体的进度
              degree: undefined, //重要程度  1-4 1最高  分别为紧急重要 紧急不重要 重要不紧急 不紧急不重要，必填
              mission_type: null, //任务类型
              mission_address:null,//任务地点
              mission_tools:null,//任务需要的工具
              mission_attention:null,//任务注意事项
              mission_detail: null, //任务详情
              tomato:null,//一天任务需要的番茄钟个数 int
              missionDay:[],//任务完成的日期记录
              tomatoReal:'',//实际进行的番茄钟个数 到任务完成为止的 总个数
            }
          }
          this.level = level.map((item,index) => {
            return <Option value={index+1} key={index}>{item}</Option>
          })
          this.members = this.props.member.map((item, index) => {
            return <Option value={index} key={item+index}>{item.name}</Option>
          })
    }
    componentDidUpdate(){
      //console.log('did update')
    }
    componentDidMount() {
      //console.log('did mount')
    }
    componentWillReceiveProps({data}){
      //console.log(data)
      //console.log(data,this.props.member)
      //console.log('componentWillReceiveProps')
      this.setState({
        new_mission:{
          ...this.state.new_mission,
          ...data
        }
      })
    }
    addMission(bol){
        //this.context.ipc.sendSync('first','hello') 原来的方案为 打开一个新窗口来 添加新任务 使用 electron
        this.setState({
          add_mission:bol
        })
      }
    changeValue(obj){
      this.setState({
        new_mission:{
          ...this.state.new_mission,
          ...obj
        }
      })
    }
    render(){
      // console.log(this.state.new_mission.date_start)
      // console.log(!this.state.new_mission.date_start)
      // console.log(!this.state.new_mission.date_start?'':this.state.new_mission.date_start.toLocaleDateString(),'YYYY/MM/DD')
        return <Modal 
        title="添加任务" 
        closable={false} 
        footer={null} 
        visible={this.state.add_mission} 
        style={{ top: 20 }} 
        onCancel={() => {this.addMission(false)}}
      >
        <div className="addMission_modal">
          <div className="addMission_modal_header">
            <span>添加任务</span>
            <span onClick={()=>{
              this.props.addMission(this.state.new_mission);
              this.setState({add_mission:false})
            }}>确定</span>
          </div>
          <div className="addMission_modal_body">
            <div className="mission_name">
              {/*<span className="mission_checkBox" title="完成状态" onClick={() => {
                this.changeValue({complete:!this.state.new_mission.complete})
              }}>
                {this.state.new_mission.complete?<Icon type="check" />:''}
            </span>*/}
              <div>
                <Input placeholder="*请输入任务名称" style={{marginRight:"16px",width: 215}} onInput={(e) => {
                  this.changeValue({mission_name:e.target.value})
                }} onChange={ (e) => {
                  this.changeValue({mission_name:e.target.value})
                }} value={this.state.new_mission.mission_name }/>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="*重要程度"
                  //optionFilterProp="Jack"
                  //defaultValue={}
                  onChange={(val) => { 
                    this.changeValue({degree:+val})
                  }}
                  value={this.state.new_mission.degree}
                  // onFocus={handleFocus}
                  // onBlur={handleBlur}
                >
                  {this.level}
                </Select>
              </div>
            </div>
            <div className="mission_detail">
              <Input.TextArea placeholder="任务详细说明" autosize={{ minRows: 4, maxRows: 10 }} 
              value={this.state.new_mission.mission_detail}
              onChange={(e) => { 
                this.changeValue({mission_detail:e.target.value})
              }}
              />
              <div className="mission_items">
              <div className="mission_item">
                  <span className="item_name">
                    <Icon type="calendar" />*任务周期：
                  </span>
                  <RangePicker 
                    size="small"
                    allowClear={false}
                    style={{width:'70%'}}
                    format='YYYY/MM/DD'
                    value={this.state.new_mission.date_start?[moment(new Date(this.state.new_mission.date_start).toLocaleDateString(),'YYYY/MM/DD'),moment(new Date(this.state.new_mission.date_end).toLocaleDateString(),'YYYY/MM/DD')]:[null,null]}
                    onChange={(val,valString) => { 
                      this.changeValue({date_start:val[0]._d,date_end:val[1]._d || val[0]._d})
                    }}
                  />
                </div>
                <div className="mission_item">
                  <span className="item_name">
                    <Icon type="user" />番茄个数:
                  </span>
                  <Input 
                  type="number"
                  max={7}
                  min={0}
                  value={this.state.new_mission.tomato} 
                  size="small"
                  placeholder="该任务的每天预估番茄个数"
                  onChange={(e) => {
                    this.changeValue({tomato:e.target.value})
                  }}
                  style={{width:'70%'}}/>
                </div>
                <div className="mission_item">
                  <span className="item_name">
                    <Icon type="user" />相关人员：
                  </span>
                  <Select 
                    mode="multiple"
                    size="small"
                    placeholder="请选择至少一人"
                    style={{ width: '70%' }}
                    value={this.state.new_mission.related}
                    onChange={(val) => { 
                      this.changeValue({related:val})
                    }}
                  >
                    {this.members}
                  </Select>
                </div>
                <div className="mission_item">
                  <span className="item_name">
                    <Icon type="tool" />物品工具：
                  </span>
                  <Input placeholder="Basic usage" size="small" style={{width:'70%'}} onInput={(e) => {
                    this.changeValue({mission_tools:e.target.value})
                  }} onChange={(e) => {
                    this.changeValue({mission_tools:e.target.value})
                  }} value={this.state.new_mission.mission_tools}/>
                </div>
                <div className="mission_item">
                  <span className="item_name">
                    <Icon type="environment" />地点：
                  </span>
                  <Input placeholder="Basic usage" size="small" style={{width:'70%'}} onInput={(e) => {
                    this.changeValue({mission_address:e.target.value})
                  }} onChange = {(e) => {
                    this.changeValue({mission_address:e.target.value})
                  }} value={this.state.new_mission.mission_address}/>
                </div>
                <div className="mission_item">
                  <span className="item_name">
                    <Icon type="info-circle" />注意事项：
                  </span>
                  <Input placeholder="Basic usage" size="small" defaultValue={null} style={{width:'70%'}} onInput={(e) => {
                    this.changeValue({mission_attention:e.target.value})
                  }} onChange={(e) => {
                    this.changeValue({mission_attention:e.target.value})
                  }} value={this.state.new_mission.mission_attention}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    }
}

// function mapStateToProps(state,ownProps){
//   return {

//   }
// }

// function mapDispatchToProps(dispatch){
//   return {

//   }
// }