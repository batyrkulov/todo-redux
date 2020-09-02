import React from "react";
import style from './Header.module.css'
import {compose} from "redux";
import {connect} from "react-redux";
import {selectFieldText} from "../../redux/selectors/addition-selectors";
import {updateFieldText} from "../../redux/addition-reducer";
import {createTask} from "../../redux/tasks-reducer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import {GlobalStateType} from "../../redux/redux-store";

type MapStateToPropsType = {
    fieldText: string
}
type MapDispatchToPropsType = {
    createTask: ()=> void
    updateFieldText: (text: string) => void
}

type OwnPropsType = {}

type PropsType = MapDispatchToPropsType & MapStateToPropsType

const Header: React.FC<PropsType> = ({createTask, fieldText, updateFieldText})=>{
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=> {
        updateFieldText(event.target.value);
    }

    return <nav className={style.header}>
        <input className={style.inp} value={fieldText} onChange={handleChange}/>
        <button className={style.btn+' customBtn'} onClick={()=>{createTask()}}><FontAwesomeIcon icon={faPlus}/></button>
    </nav>
}


const mapStateToProps = (state: GlobalStateType) : MapStateToPropsType => ({
    fieldText: selectFieldText(state)
});


export default compose(
    connect<MapStateToPropsType,
        MapDispatchToPropsType,
        OwnPropsType,
        GlobalStateType>
    (mapStateToProps, {createTask, updateFieldText}))(Header);