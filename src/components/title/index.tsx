import {FC} from "react"
import logo from '../../images/todo-list.svg'
import s from "./Title.module.scss"


const Title: FC = () =>
  <div className={s.wrapperTitle}>
    <img src={logo as string} alt="todo-list images" width="30px"/>
    <h1 className={s.title}>TODO List</h1>
  </div>


export default Title