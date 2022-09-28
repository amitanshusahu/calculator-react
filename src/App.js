import React from "react";
import { useReducer } from "react";
import "./style.css";

import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

const initialstate = {
  currentOperend: null,
  previousOperand: null,
  operation: null,
};
export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};
function evaluate({ currentOperend, previousOperand, operation }) {
  let prev = parseFloat(previousOperand);
  let currnt = parseFloat(currentOperend);
  let computation = "";
  if (isNaN(prev) || isNaN(currnt)) return "";
    switch (operation) {
      case "+":
        computation = prev + currnt;
        break;
      case "-":
        computation = prev - currnt;
        break;
      case "*":
        computation = prev * currnt;
        break;
      case "/":
        computation = prev / currnt;
        break;
    }

    return computation.toString();
}

function reducer(state, { type, payloads }) {
  switch (type) {
    // / FOR ADDING DIGITS
    case ACTIONS.ADD_DIGIT:
      //> 7. overwrite the current operend 
      if(state.overwrite){
        return {
          currentOperend: payloads.digit,
          overwrite:false
        }
      }
      //> 1.not to repet the zeros
      if (payloads.digit === "0" && state.currentOperend === "0") return state;
      //> 2.not to repeat the .
      if (payloads.digit === "." && state.currentOperend.includes("."))
        return state;
      //> 3.add digit to output
      return {
        ...state, // ! if we dont send the state(spread) then other values will not be returned form the useReducer fuction and hence previousOperand and opraton will agin set to null 
        currentOperend: `${state.currentOperend || ""}${payloads.digit}`,
      };

    /// FOR CHOOSING OPERATIONS
    case ACTIONS.CHOOSE_OPERATION:
      //> 4.if cureent or previous Opernd is null then no operation
      if (state.currentOperend == null && state.previousOperand == null) {
        return state;
      }
      //> if current is null and we select a operator then we want the operator
      if(state.currentOperend == null){
        return{
          ...state,
          operation: payloads.operation
        }
      }
      //> 5. if previous Operand is not present then set current oprrnad = previous
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payloads.operation,
          previousOperand: state.currentOperend,
          currentOperend: null,
        };
      }
      //> 6.if both previos and the current value are present the evaluate
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payloads.operation,
        currentOperend: null,
      };
    /// FOR CLEAR
    case ACTIONS.CLEAR:
      return initialstate;

    /// FOR EVALUATE
    case ACTIONS.EVALUATE:
      if(state.currentOperend == null || state.previousOperand == null || state.operation == null){
        return state
      }
      return{
        ...state,
        overwrite : true,
        operation : null,
        previousOperand : null,
        currentOperend: evaluate(state)
      }
    /// FOR DELETEING DIGIT
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite) return initialstate;
      if(state.currentOperend == null) return state;
      // if(state.currentOperend.length === 1) return initialstate

      return{
        ...state,
        currentOperend : state.currentOperend.slice(0 , -1)
      }
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialstate);

  return (
    <div className="calculator-grid">
      {/* //) output of calulator */}
      <div className="output">
        <div className="previous-operend">
          {state.previousOperand} {state.operation}
        </div>
        <div className="current-operend">{state.currentOperend}</div>
      </div>
      {/* //) buttons of calculator */}
      <button
        className="span-2"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
      </button>
      <OperationButton operation="/" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <button
        className="span-2"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
    // <Counter />
  );

}
