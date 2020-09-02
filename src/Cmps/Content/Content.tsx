import React from "react";
import style from './Content.module.css'
import {compose} from 'redux';
import {connect} from "react-redux";
import {selectTasks} from "../../redux/selectors/tasks-selectors";
import Task from "./task/Task";
import {deleteTask, startTask, stopTask, TaskType} from "../../redux/tasks-reducer";
import Modal from "../Common/Modal/Modal";
import {GlobalStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    tasks: Array<TaskType>
}
type MapDispatchToPropsType = {
    deleteTask: (id: string)=>void
    startTask: (id: string)=>void
    stopTask: (id: string)=>void
}

type OwnPropsType = {}

type PropsType = MapDispatchToPropsType & MapStateToPropsType


type StateType = {
    showModal: boolean
    removeID: boolean | string
}


class Content extends React.Component<PropsType, StateType> {
    state = {
        showModal: false,
        removeID: false
    }

    componentDidMount() {

    }

    remove = (id: string | boolean) => {
        this.setState({
            showModal: true,
            removeID: id
        })
    }

    removeConfirmedByModal = (yesOrNo: boolean)=> {
        this.setState({showModal: false})
        if (typeof this.state.removeID === "string")
            if (yesOrNo) this.props.deleteTask(this.state.removeID)
    }

    render() {
        return <div className={style.content}>
            {this.props.tasks.map((task: TaskType)=><Task key={task.id} task={task} start={this.props.startTask} stop={this.props.stopTask} remove={this.remove} /> )}
            {this.state.showModal && <Modal answer={this.removeConfirmedByModal}/>}
        </div>
    }
}

const mapStateToProps = (state: GlobalStateType) : MapStateToPropsType =>({
    tasks: selectTasks(state)
});

export default compose(
    connect<MapStateToPropsType,
        MapDispatchToPropsType,
        OwnPropsType,
        GlobalStateType>(mapStateToProps, {startTask, stopTask, deleteTask})
)(Content);
