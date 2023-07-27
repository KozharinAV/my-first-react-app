import classes from "./ModalWindow.module.scss"
import { ReactNode } from "react"

interface PropType {
  children: ReactNode
  visible: boolean
}
export default function ModalWindow({ children, visible }: PropType) {
  const visibility = visible ? "block" : "none"
  return (
    <div style={{ display: visibility }}>
      <div className={classes.background}></div>
      <div className={classes.modal}>{children}</div>
    </div>
  )
}
