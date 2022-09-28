import { ACTIONS } from "../App";

function DigitButton({digit , dispatch}) {
  return (
    <button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT , payloads : {digit}})}>{ digit }</button>
  )
}

export default DigitButton