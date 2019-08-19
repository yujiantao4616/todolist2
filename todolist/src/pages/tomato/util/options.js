// 为联级选择框提供数据  数据格式 为 missionList 格式的数组

export const create_options = (array) => {
    //结构就两级
    //[
    // {
    // mission_name: 'first mission', //任务名称
    // complete: false, //任务是否完成
    // date_start: '', //启示日期
    // date_end: '', //结束日期
    // id: 1,//任务id
    // related: [], //相关人员
    // progress: '', //number 任务整体的进度
    // degree: 1, //重要程度  1-4 1最高  分别为紧急重要 紧急不重要 重要不紧急 不紧急不重要，必填
    // mission_type: '', //任务类型
    // mission_address: '', //任务地点
    // mission_tools: '', //任务需要的工具
    // mission_attention: '', //任务注意事项
    // mission_detail: '', //任务详情
    // }
    //]
    const level = ['重要且紧急', '紧急不重要', '重要不紧急', '不紧急不重要']
    var option_easy = []
    var option = [
        // {
        //     label: '重要且紧急',
        //     value: 1,
        //     children: []
        // },
        // {
        //     label: '紧急不重要',
        //     value: 2,
        //     children: []
        // },
        // {
        //     label: '重要不紧急',
        //     value: 3,
        //     children: []
        // },
        // {
        //     label: '不紧急不重要',
        //     value: 4,
        //     children: []
        // }
    ];
    for (var i in array) {
        if (array[i].missionDay.indexOf(new Date().toLocaleDateString()) === -1 && date_today(new Date(), array[i].date_start, array[i].date_end)) {
            if (option_easy.indexOf(array[i].degree) === -1) {
                option_easy.push(array[i].degree)
                option.push({
                    label: level[array[i].degree - 1],
                    value: array[i].degree,
                    children: []
                })
            }
            for (var j in option) {
                if (option[j].value === array[i].degree) {
                    option[j].children.push({
                        label: array[i].mission_name,
                        value: `${array[i].id}/${array[i].mission_name}/${level[array[i].degree - 1]}/${array[i].mission_type}`
                    })
                }
            }
        }
    }
    return option
}

export function date_today(current, start, end) {
    //对比 时间 看当前时间是否在 时间区间中
    var currentDate = current.toLocaleDateString().split('/')
    var date_start = new Date(start).toLocaleDateString().split('/')
    var date_end = new Date(end).toLocaleDateString().split('/')
    // 时间
    for (let j in currentDate) {
        currentDate[j] = +currentDate[j]
        date_start[j] = +date_start[j]
        date_end[j] = +date_end[j]
    }
    if (date_start[0] <= currentDate[0] <= date_end[0]) {
        if (date_start[1] === currentDate[1] && currentDate[1] === date_end[1]) {
            if (date_start[2] <= currentDate[2] && currentDate[2] <= date_end[2]) {
                return true;
            }
        } else if (date_start[1] < currentDate[1] && currentDate[1] === date_end[1]) {
            if (currentDate[2] <= date_end[2]) {
                return true;
            }
        } else if (date_start[1] === currentDate[1] && currentDate[1] < date_end[1]) {
            if (date_start[2] <= currentDate[2]) {
                return true;
            }
        }
    }
}

export const search_mission = (records,missionName) => {
    //番茄钟历史列表 records 模糊查询 任务名称 missionName 
    console.log(records,missionName)
    var newReacrd = {}
    for(var item in records){
        newReacrd[item] = []
        for(var i of records[item]){
            if(i.missionName.indexOf(missionName) !== -1){
                console.log(1)
                console.log(i.missionName)
                newReacrd[item].push(i)
            }
        }
        if(newReacrd[item].length === 0){
            delete newReacrd[item]
        }
    }
    return newReacrd
}