import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';

// export default class Day extends Component{
//     render
// }
  
class Day extends React.Component {
    choose_file = () => {
        this.context.ipc.send('chooseFile','chooseFile')
    }
    render (){
        return (
            <div><Button onClick={this.choose_file}>选择文件</Button></div>
        )
    }
}

Day.contextTypes = {
    ipc:PropTypes.object
}

export default Day;