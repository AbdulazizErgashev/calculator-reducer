import React, { useReducer } from "react";

const reducer = (state, action) => {
  const type = action.type;
  switch (type) {
    case "add-digit":
      return { ...state, current: state.current + action.payload };
    case "choose-operation":
      return {
        ...state,
        operation: action.payload,
        previous: state.current,
        current: "",
      };
    case "clear":
      return { current: "", previous: null, operation: null };
    case "evaluate":
      if (state.operation && state.previous !== null) {
        const result = eval(
          `${state.previous} ${state.operation} ${state.current}`
        );
        return { current: result.toString(), previous: null, operation: null };
      }
      return state;
    default:
      return state;
  }
};

const initialState = {
  current: "0",
  previous: null,
  operation: null,
};

export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDigitClick = (digit) => {
    dispatch({ type: "add-digit", payload: digit });
  };

  const handleOperationClick = (operation) => {
    dispatch({ type: "choose-operation", payload: operation });
  };

  const handleClear = () => {
    dispatch({ type: "clear" });
  };

  const handleEvaluate = () => {
    dispatch({ type: "evaluate" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-80 p-4">
        <div className="bg-gray-200 text-right text-2xl font-semibold px-4 py-2 mb-4">
          {state.current || "0"}
        </div>
        <div className="grid grid-cols-4 gap-2">
          <button
            className="col-span-2 bg-red-500 text-white rounded p-2"
            onClick={handleClear}
          >
            C
          </button>
          <button
            className="bg-gray-300 rounded p-2"
            onClick={() => handleOperationClick("/")}
          >
            ÷
          </button>
          <button
            className="bg-gray-300 rounded p-2"
            onClick={() => handleOperationClick("*")}
          >
            ×
          </button>
          {[7, 8, 9].map((digit) => (
            <button
              key={digit}
              className="bg-gray-200 rounded p-2"
              onClick={() => handleDigitClick(digit.toString())}
            >
              {digit}
            </button>
          ))}
          <button
            className="bg-gray-300 rounded p-2"
            onClick={() => handleOperationClick("-")}
          >
            -
          </button>
          {[4, 5, 6].map((digit) => (
            <button
              key={digit}
              className="bg-gray-200 rounded p-2"
              onClick={() => handleDigitClick(digit.toString())}
            >
              {digit}
            </button>
          ))}
          <button
            className="bg-gray-300 rounded p-2"
            onClick={() => handleOperationClick("+")}
          >
            +
          </button>
          {[1, 2, 3].map((digit) => (
            <button
              key={digit}
              className="bg-gray-200 rounded p-2"
              onClick={() => handleDigitClick(digit.toString())}
            >
              {digit}
            </button>
          ))}
          <button
            className="bg-gray-200 rounded p-2"
            onClick={() => handleDigitClick("0")}
          >
            0
          </button>
          <button
            className="bg-gray-200 rounded p-2"
            onClick={() => handleDigitClick("00")}
          >
            00
          </button>
          <button
            className="bg-gray-300 rounded p-2"
            onClick={() => handleDigitClick(".")}
          >
            .
          </button>
          <button
            className="bg-green-500 text-white rounded p-2"
            onClick={handleEvaluate}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
