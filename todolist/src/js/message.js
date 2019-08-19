import React from 'react'

const errorMessage = () => <div>errorMessage</div>
const error = () =>(
    React.createElement('div',{
        className:'errorMessage'
    },errorMessage())
)
export {
    error
}