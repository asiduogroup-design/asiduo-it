import React, { useEffect } from "react";

let styleInjected = false;

const RevealText = ({ text = "", delay = 30, className = "" }) => {
  useEffect(() => {
    if (!styleInjected) {
      const style = document.createElement("style");
      style.innerHTML = `
        @keyframes typeInChar {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `;
      document.head.appendChild(style);
      styleInjected = true;
    }
  }, []);

  return (
    <span className={`break-words inline-block ${className}`} key={text} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={text + i}
          aria-hidden="true"
          style={{
            opacity: 0,
            animation: `typeInChar 0.08s linear forwards`,
            animationDelay: `${i * delay}ms`,
            display: "inline-block",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

export default RevealText;
