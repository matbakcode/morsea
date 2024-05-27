import { ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <section className={"bg-slate-100 p-6 rounded-md"}>{children}</section>
  );
}

export default Wrapper;
