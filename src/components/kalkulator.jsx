import React, { useReducer } from "react";

// Reducer funksiyasi: State va Action asosida yangi holatni qaytaradi
const reducer = (state, action) => {
  const { type, payload } = action; // Action obyektidan 'type' va 'payload'ni ajratib olish
  const { current, previous, operation } = state; // State ichidagi qiymatlarni ajratib olish

  switch (type) {
    // Raqam qo'shish uchun case
    case "add-digit":
      return {
        ...state,
        current: current === "0" ? payload : current + payload, // '0' bo'lsa, o'rniga yangi raqamni qo'yadi
      };

    // Operatsiyani tanlash uchun case
    case "choose-operation":
      if (!current) return state; // Agar 'current' bo'sh bo'lsa, o'zgarish qilmaydi
      return {
        ...state,
        operation: payload, // Operatsiyani o'rnatadi
        previous: current, // Joriy qiymatni 'previous'ga o'tkazadi
        current: "", // Joriy qiymatni bo'sh qiladi
      };

    // Kalkulyatorni tozalash uchun case
    case "clear":
      return { current: "0", previous: null, operation: null }; // Barcha qiymatlarni o'chiradi

    // Hisoblash uchun case
    case "evaluate":
      if (operation && previous) {
        // Operatsiya va oldingi qiymat mavjudligini tekshirish
        const prev = parseFloat(previous); // 'previous' qiymatini floatga aylantirish
        const curr = parseFloat(current); // 'current' qiymatini floatga aylantirish
        let result = 0;

        // Operatsiyaga qarab hisoblash
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
            result = curr !== 0 ? prev / curr : "Error"; // Nolga bo'lishdan saqlanish
            break;
          default:
            return state;
        }
        return { current: result.toString(), previous: null, operation: null }; // Natijani qaytaradi
      }
      return state;

    // Default holat
    default:
      return state;
  }
};

// Boshlang'ich state qiymatlari
const initialState = {
  current: "0", // Joriy qiymat
  previous: null, // Oldingi qiymat
  operation: null, // Operatsiya
};

export default function Calculator() {
  // useReducer Hook orqali state boshqarish
  const [state, dispatch] = useReducer(reducer, initialState);

  // Raqam bosilganda chaqiriladigan funksiya
  const handleDigitClick = (digit) => {
    dispatch({ type: "add-digit", payload: digit });
  };

  // Operatsiya bosilganda chaqiriladigan funksiya
  const handleOperationClick = (operation) => {
    dispatch({ type: "choose-operation", payload: operation });
  };

  // Tozalash tugmasi bosilganda chaqiriladigan funksiya
  const handleClear = () => {
    dispatch({ type: "clear" });
  };

  // Natijani hisoblash uchun funksiya
  const handleEvaluate = () => {
    dispatch({ type: "evaluate" });
  };

  // Kalkulyator komponentining UI qismi
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-800 to-black">
      <div className="bg-black shadow-xl rounded-3xl w-96 p-6">
        {/* Ekran qismi */}
        <div className="bg-black text-right text-white text-3xl font-bold px-6 py-4 mb-4 rounded-xl">
          {state.current || "0"} {/* Joriy qiymatni ko'rsatadi */}
        </div>
        {/* Tugmalar qismi */}
        <div className="grid grid-cols-4 gap-3">
          <button
            className="col-span-2 bg-gray-500 text-white rounded-full py-5 text-xl shadow-lg"
            onClick={handleClear}
          >
            AC {/* Tozalash tugmasi */}
          </button>
          <button
            className="bg-orange-500 text-white rounded-full py-5 text-xl shadow-lg"
            onClick={() => handleOperationClick("/")}
          >
            ÷ {/* Bo'lish tugmasi */}
          </button>
          <button
            className="bg-orange-500 text-white rounded-full py-5 text-xl shadow-lg"
            onClick={() => handleOperationClick("*")}
          >
            × {/* Ko'paytirish tugmasi */}
          </button>
          {/* 7, 8, 9 raqam tugmalari */}
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
            - {/* Ayirish tugmasi */}
          </button>
          {/* 4, 5, 6 raqam tugmalari */}
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
            + {/* Qo'shish tugmasi */}
          </button>
          {/* 1, 2, 3 raqam tugmalari */}
          {[1, 2, 3].map((digit) => (
            <button
              key={digit}
              className="bg-gray-700 text-white rounded-full py-5 text-xl shadow-lg"
              onClick={() => handleDigitClick(digit.toString())}
            >
              {digit}
            </button>
          ))}
          {/* Nol va boshqa tugmalar */}
          <button
            className="col-span-2 bg-gray-700 text-white rounded-full py-5 text-xl shadow-lg"
            onClick={() => handleDigitClick("0")}
          >
            0 {/* Nol tugmasi */}
          </button>
          <button
            className="bg-gray-700 text-white rounded-full py-5 text-xl shadow-lg"
            onClick={() => handleDigitClick(".")}
          >
            . {/* Nuqta tugmasi */}
          </button>
          <button
            className="bg-orange-500 text-white rounded-full py-5 text-xl shadow-lg"
            onClick={handleEvaluate}
          >
            = {/* Hisoblash tugmasi */}
          </button>
        </div>
      </div>
    </div>
  );
}
