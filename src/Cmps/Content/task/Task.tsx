import React from "react";
import style from './Task.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { faStop } from '@fortawesome/free-solid-svg-icons'
import {TaskType} from "../../../redux/tasks-reducer";

type PropsType= {
    task: TaskType

    remove: (id: string)=>void
    stop: (id: string)=>void
    start: (id: string)=>void
}

class Task extends React.Component<PropsType> {
    interval: any

    componentDidMount() {
       this.interval = setInterval(()=>{if(this.props.task.lastStartTime!==false)this.forceUpdate()}, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        let {task, remove, stop, start} = this.props

        const showTime = () => {
            let delta = task.spentTime
            if (typeof task.lastStartTime==='number')
                delta += Math.round((new Date).getTime() / 1000) - task.lastStartTime
            let days = Math.floor(delta / 86400);
            delta -= days * 86400;
            let hours = Math.floor(delta / 3600) % 24;
            delta -= hours * 3600;
            let minutes = Math.floor(delta / 60) % 60;
            delta -= minutes * 60;
            let seconds = delta % 60;

            return `${days} day ${hours}:${minutes}:${seconds}`
        }

        return <div className={style.task}>
            <div>
                <span className={style.name}>{task.name ? task.name : '-'}</span>
            </div>
            <div className={style.timeAndBtns}>
                <span className={style.time}>{showTime()}</span>
                {task.lastStartTime
                    ? <button className={`customBtn ${style.btn}`} onClick={() => {stop(task.id)}}><FontAwesomeIcon icon={faStop}/></button>
                    : <button className={`customBtn ${style.btn}`} onClick={() => {start(task.id)}}><FontAwesomeIcon icon={faPlay}/></button>
                }
                <button className={`customBtn ${style.btn}`} onClick={() => {remove(task.id)}}><FontAwesomeIcon icon={faTrash}/></button>
            </div>
        </div>
    }
}

export default Task;