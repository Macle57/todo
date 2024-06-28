import {TodoObj} from "./TodoObj.tsx";
import {MutableRefObject} from "react";
import {Reorder, useDragControls} from "framer-motion";
import sortIcon from "./assets/sortIconWhite.png";

export function TaskLine(props: {
    line: TodoObj,
    onChange: () => void,
    handleDelete: any,
    enableDelete: MutableRefObject<boolean>
}) {
    const dragControls = useDragControls();
    return <Reorder.Item value={props.line} dragListener={false} dragControls={dragControls} drag onDragEnd={() => {
        props.handleDelete(props.line.id);
    }}>
        <span className={props.line.checked ? "checkedClass" : ""}>
            <img src={sortIcon} alt="dragMe" onPointerDown={e => {
                e.preventDefault();
                dragControls.start(e);
            }}/>
            {props.line.text}
            <input type={"checkbox"} checked={props.line.checked} onChange={props.onChange}/>
        </span>
    </Reorder.Item>;
}