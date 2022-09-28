import { ACTIONS } from "../App";

function OperationButton({operation , dispatch}) {
  return (
    <button onClick={()=>dispatch({type:ACTIONS.CHOOSE_OPERATION , payloads : {operation}})}>{ operation }</button>
  )
}

export default OperationButton