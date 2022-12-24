import React from 'react'
import { CircularProgress } from '@material-ui/core';
import "./CirculatIndicator.css"
import { ProgressBarColor } from '../../constants/cssconstants';
function CircularIndicator() {
    return (
        <CircularProgress className='circularIndicator' size={60} color={ProgressBarColor}></CircularProgress>
    )
}

export default CircularIndicator