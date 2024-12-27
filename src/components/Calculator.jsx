import React, { useReducer } from "react";

const reducer = (state, action) => {
  const { type, payload } = action;
  const { current, previous, operation } = state;

  switch (type) {
    case "add-digit":
      return {
        ...state,
        current: current === "0" ? payload : current + payload,
      };
    case "choose-operation":
      if (!current) return state;
      return {
        ...state,
        operation: payload,
        previous: current,
        current: "",
      };
    case "clear":
      return { current: "0", previous: null, operation: null };
    case "evaluate":
      if (operation && previous) {
        const prev = parseFloat(previous);
        const curr = parseFloat(current);
        let result = 0;

        switch (operation) {
          case "+":
            result = prev + curr;
            break;
          case "-":
            result = prev - curr;
            break;
          case "*":
            result = prev * curr;
            break;
          case "/":
            result = curr !== 0 ? prev / curr : "Error";
            break;
          default:
            return state;
        }
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-black">
      <div className="bg-black shadow-xl rounded-3xl w-96 p-6">
        <div className="bg-black text-right text-white text-3xl font-bold px-6 py-4 mb-4 rounded-xl">
          {state.current || "0"}
        </div>
        <div className="grid grid-cols-4 gap-3">
          <button
            className="col-span-2 bg-gray-500 text-white rounded-full py-5 text-xl shadow-lg"
            onClick={handleClear}
          >
            AC
          </button>
          <button
            className="bg-orange-500 text-white rounded-full py-5 text-xl shadow-lg"
            onClick={() => handleOperationClick("/")}
          >
            ÷
          </button>
          <button
            className="bg-orange-500 text-white rounded-full py-5 text-xl shadow-lg"
            onClick={() => handleOperationClick("*")}
          >
            ×
          </button>
          {[7, 8, 9].map((digit) => (
            <button
              key={digit}
              className="bg-gray-700 text-white rounded-full py-5 text-xl shadow-lg"
              onClick={() => handleDigitClick(digit.toString())}
            >
              {digit}
            </button>
          ))}
          <button
            className="bg-orange-500 text-white rounded-full py-5 text-xl shadow-lg"
            onClick={() => handleOperationClick("-")}
          >
            -
          </button>
          {[4, 5, 6].map((digit) => (
            <button
              key={digit}
              className="bg-gray-700 text-white rounded-full py-5 text-xl shadow-lg"
              onClick={() => handleDigitClick(digit.toString())}
            >
              {digit}
            </button>
          ))}
          <button
            className="bg-orange-500 text-white rounded-full py-5 text-xl shadow-lg"
            onClick={() => handleOperationClick("+")}
          >
            +
          </button>
          {[1, 2, 3].map((digit) => (
            <button
              key={digit}
              className="bg-gray-700 text-white rounded-full py-5 text-xl shadow-lg"
              onClick={() => handleDigitClick(digit.toString())}
            >
              {digit}
            </button>
          ))}
          <button
            className="col-span-2 bg-gray-700 text-white rounded-full py-5 text-xl shadow-lg"
            onClick={() => handleDigitClick("0")}
          >
            0
          </button>
          <button
            className="bg-gray-700 text-white rounded-full py-5 text-xl shadow-lg"
            onClick={() => handleDigitClick(".")}
          >
            .
          </button>
          <button
            className="bg-orange-500 text-white rounded-full py-5 text-xl shadow-lg"
            onClick={handleEvaluate}
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
