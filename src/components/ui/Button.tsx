import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {}


function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      type={"button"}
      className={
        "font-medium text-slate-500 flex gap-2 align-middle items-center hover:text-slate-800 py-2 px-2 rounded transition-colors"
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
