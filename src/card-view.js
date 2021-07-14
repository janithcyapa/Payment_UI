import { useState, useEffect } from "react";
import "./styles.scss";

function CardView({ Card }) {
  const [State, setState] = useState({
    cvc: "991",
    expiry: "10/20",
    focused: "number",
    issuer: "visa",
    locale: {
      valid: "valid thru",
    },
    name: "Janith Yapa",
    number: "4916217501611292",
  });
  useEffect(() => {
    setState(Card);
  }, [Card]);
  return (
    <div key="Cards" className="rccs">
      <div
        className={[
          "rccs__card",
          `rccs__card--${State.issuer}`,
          State.focused === "cvc" && State.issuer !== "amex"
            ? "rccs__card--flipped"
            : "",
        ]
          .join(" ")
          .trim()}
      >
        <div className="rccs__card--front">
          <div className="rccs__card__background" />
          <div className="rccs__issuer" />
          <div
            className={[
              "rccs__cvc__front",
              State.focused === "cvc" ? "rccs--focused" : "",
            ]
              .join(" ")
              .trim()}
          >
            {State.cvc}
          </div>
          <div
            className={[
              "rccs__number",
              State.number.replace(/ /g, "").length > 16
                ? "rccs__number--large"
                : "",
              State.focused === "number" ? "rccs--focused" : "",
              State.number.substr(0, 1) !== "•" ? "rccs--filled" : "",
            ]
              .join(" ")
              .trim()}
          >
            {State.number}
          </div>
          <div
            className={[
              "rccs__name",
              State.focused === "name" ? "rccs--focused" : "",
              State.name ? "rccs--filled" : "",
            ]
              .join(" ")
              .trim()}
          >
            {State.name}
          </div>
          <div
            className={[
              "rccs__expiry",
              State.focused === "expiry" ? "rccs--focused" : "",
              State.expiry.substr(0, 1) !== "•" ? "rccs--filled" : "",
            ]
              .join(" ")
              .trim()}
          >
            <div className="rccs__expiry__valid">{State.locale.valid}</div>
            <div className="rccs__expiry__value">{State.expiry}</div>
          </div>
          <div className="rccs__chip" />
        </div>
        <div className="rccs__card--back">
          <div className="rccs__card__background" />
          <div className="rccs__stripe" />
          <div className="rccs__signature" />
          <div
            className={[
              "rccs__cvc",
              State.focused === "cvc" ? "rccs--focused" : "",
            ]
              .join(" ")
              .trim()}
          >
            {State.cvc}
          </div>
          <div className="rccs__issuer" />
        </div>
      </div>
    </div>
  );
}

export default CardView;
