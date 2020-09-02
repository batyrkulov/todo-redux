import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import style from "./Modal.module.css";

type PropsType = {answer: (bool:boolean)=>void}

const Modal: React.FC<PropsType> =  ({answer})=>{
    return <div className={style.modBack}>
        <div className={style.modal}>
            Are you sure ?
            <button className={`customBtn ${style.btn}`} onClick={()=>{answer(true)}}><FontAwesomeIcon icon={faCheck} /></button>
            <button className={`customBtn ${style.btn}`} onClick={()=>{answer(false)}}><FontAwesomeIcon icon={faTimes} /></button>
        </div>
    </div>
}

export default Modal