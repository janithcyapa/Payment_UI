import { useState } from "react";
import LOGO from "./assets/logo.png";
import CardView from "./card-view";
import {
  getCreditCardNameByNumber,
  isExpirationDateValid,
  isSecurityCodeValid,
  isValid,
} from "./utilities/creditcard";
import {
  AiFillCheckCircle,
  AiOutlineLoading3Quarters,
  AiFillCloseCircle,
} from "react-icons/ai";

function App() {
  const [State, setState] = useState({
    number: "xxxx xxxx xxxx xxxx",
    name: "xxxxxxxxxxxxxxx",
    expiry: "xx / xx",
    cvc: "xxx",
    focused: "number",
    issuer: "invalid",
    preview: true,
    locale: {
      valid: "valid thru",
    },
  });
  const [Loading, setLoading] = useState(false);
  const [Number, setNumber] = useState(null);
  const [Name, setName] = useState(null);
  const [CVV, setCVV] = useState(null);
  const [Month, setMonth] = useState(null);
  const [Year, setYear] = useState(null);
  const [CVVError, setCVVError] = useState(null);
  const [ExpiryError, setExpiryError] = useState(null);
  const [CardError, setCardError] = useState(null);

  const numberHandler = (e) => {
    const number = e.target.value
      .replace(/[^\dA-Z]/g, "")
      .replace(/(.{4})/g, "$1 ")
      .trim();

    const issuer = getCreditCardNameByNumber(number).toLowerCase();
    setNumber(number);
    setState({ ...State, number: number, issuer: issuer });
  };
  const nameHandler = (e) => {
    const name = e.target.value.toUpperCase();
    // const
    setName(name);
    setState({ ...State, name: name });
  };
  const monthHandler = (e) => {
    const val = e.target.value.substring(0, 2);
    setMonth(val);
    expiryHandler(val, Year);
  };
  const yearHandler = (e) => {
    const val = e.target.value.substring(0, 4);
    setYear(val);
    expiryHandler(Month, val);
  };
  const expiryHandler = (M, Y) => {
    const expiry = (M ? M : "") + " / " + (Y ? Y : "");
    console.log(expiry);
    setState({ ...State, expiry: expiry });
  };
  const expiryErrHandler = () => {
    setExpiryError(null);
    if (Month != null && Year != null) {
      const res = isExpirationDateValid(Month, Year);
      if (!res) setExpiryError("Expire Data invalid");
    } else {
      return;
    }
  };
  const cvvHandler = (e) => {
    const val = e.target.value.substring(0, 4);
    setCVV(val);
    setState({ ...State, cvc: val });
  };
  const cvvErrHandler = () => {
    setCVVError(null);
    if (CVV != null) {
      const res = isSecurityCodeValid(Number, CVV);
      if (!res) setCVVError("CVV code invalid");
    } else {
      return;
    }
  };
  const cardErrHandler = () => {
    setCardError(null);
    if (Number != null) {
      const res = isValid(Number);
      console.log(res);
      if (!res) setCardError("Card is invalid");
    } else {
      return;
    }
  };
  const HandleSubmit = () => {
    setState({ ...State, focused: "number" });
    if (CVVError === null && ExpiryError === null && CardError === null)
      setLoading(true);
  };
  return (
    <>
      <main className="max-w-md mx-auto bg-white px-4 py-8 rounded-lg shadow-md my-16">
        <header className="mb-4">
          <img src={LOGO} alt="" className="w-48 mx-auto" />
          <h1 className="text-2xl mt-4 text-center font-bold">
            Aplus Payment Gateway
          </h1>
          <h4 className="text-gray-500 text-center text-sm">
            Input your card details and confirm to pay
          </h4>
          <p className="text-gray-700 mt-4 text-center font-black text-xl">
            Rs. 1500.00
          </p>
        </header>
        <section>
          <div className="hidden sm:block">
            <CardView Card={State} />
          </div>
          {Loading === false ? (
            <div className="mt-8">
              <div class="mb-4">
                <label
                  class="block text-gray-500 text-sm font-semibold "
                  htmlFor="number"
                >
                  Card Number
                </label>
                <input
                  value={Number}
                  onFocus={() => setState({ ...State, focused: "number" })}
                  onChange={numberHandler}
                  onBlur={cardErrHandler}
                  class="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="number"
                  type="text"
                  placeholder="Your Card Number"
                />
                {CardError && (
                  <p className="text-red-600 text-xs italic">* {CardError}</p>
                )}
              </div>
              <div class="mb-4">
                <label
                  class="block text-gray-500 text-sm font-semibold "
                  htmlFor="name"
                >
                  Card Name
                </label>
                <input
                  value={Name}
                  onFocus={() => setState({ ...State, focused: "name" })}
                  onChange={nameHandler}
                  class="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="name"
                  type="text"
                  placeholder="Name On Your Card"
                />
              </div>
              <div className="mb- flex justify-between">
                <div class="">
                  <label
                    class="block text-gray-500 text-sm font-semibold "
                    htmlFor="expiry"
                  >
                    Expire Date
                  </label>
                  <div className="flex">
                    <input
                      value={Month}
                      onFocus={() => setState({ ...State, focused: "expiry" })}
                      onChange={monthHandler}
                      onBlur={expiryErrHandler}
                      class="text-sm text-center mr-1 appearance-none rounded w-16 py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline h-10"
                      id="expiry"
                      type="number"
                      placeholder="MM"
                    />
                    <input
                      value={Year}
                      onFocus={() => setState({ ...State, focused: "expiry" })}
                      onChange={yearHandler}
                      onBlur={expiryErrHandler}
                      class="text-sm text-center appearance-none rounded w-24 py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline h-10"
                      id="expiry"
                      type="number"
                      placeholder="YYYY"
                    />
                  </div>
                  {ExpiryError && (
                    <p className="text-red-600 text-xs italic">
                      * {ExpiryError}
                    </p>
                  )}
                </div>
                <div class="">
                  <label
                    class="block text-gray-500 text-sm font-semibold "
                    htmlFor="cvc"
                  >
                    CVV
                  </label>
                  <input
                    value={CVV}
                    onFocus={() => setState({ ...State, focused: "cvc" })}
                    onChange={cvvHandler}
                    onBlur={cvvErrHandler}
                    class="text-sm text-center appearance-none rounded w-24 py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="cvc"
                    type="number"
                    placeholder="CVV"
                  />
                  {CVVError && (
                    <p className="text-red-600 text-xs italic">* {CVVError}</p>
                  )}
                </div>
              </div>
              <button
                onClick={HandleSubmit}
                className="mt-4 text-lg font-black appearance-none rounded w-full py-2 px-3 text-white bg-red-400 hover:bg-red-600 leading-tight focus:outline-none focus:shadow-outline h-10"
              >
                Pay Now
              </button>
            </div>
          ) : (
            <div className="mt-8">
              {/* <div class="mb-2">
                <input
                  value={Number}
                  disabled
                  class="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="number"
                  type="text"
                  placeholder="Your Card Number"
                />
              </div>
              <div class="mb-2">
                <input
                  value={Name}
                  disabled
                  class="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                  id="name"
                  type="text"
                  placeholder="Name On Your Card"
                />
              </div>
              <div className="mb-4 flex justify-between">
                <div class="">
                  <div className="flex">
                    <input
                      value={Month}
                      disabled
                      class="text-sm text-center mr-1 appearance-none rounded w-16 py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                      id="expiry"
                      type="number"
                      placeholder="MM"
                    />
                    <input
                      value={Year}
                      disabled
                      class="text-sm text-center appearance-none rounded w-24 py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                      id="expiry"
                      type="number"
                      placeholder="YYYY"
                    />
                  </div>
                </div>
                <div class="">
                  <input
                    value={CVV}
                    disabled
                    class="text-sm text-center appearance-none rounded w-24 py-2 px-3 text-gray-700 bg-gray-200 leading-tight focus:outline-none focus:shadow-outline h-10"
                    id="cvc"
                    type="number"
                    placeholder="CVV"
                  />
                </div>
              </div> */}

              <div className="flex items-center mb-2">
                <AiFillCheckCircle size={20} className="text-green-500 mx-4" />
                <p>Verifying Card</p>
              </div>
              <div className="flex mb-2">
                <AiOutlineLoading3Quarters
                  size={18}
                  className="text-yellow-400 mx-4  animate-spin"
                />

                <p>Payment Processing</p>
              </div>
              <div className="flex mb-2 ">
                <AiFillCloseCircle size={20} className="text-red-500 mx-4" />

                <p>Payment Completed</p>
              </div>
              <p className="text-center text-gray-500 text-sm">
                Redirect Back in 25s
              </p>
            </div>
          )}
        </section>
      </main>
      {/* <p className="my-8 text-xs text-gray-400 text-center">
        Powered By Axoten Innovations (PVT) LTD © 2021
      </p> */}
    </>
  );
}

export default App;
