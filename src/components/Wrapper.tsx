import { ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <section className={"bg-slate-100 p-6 rounded-2xl"}>{children}</section>
  );
}

export default Wrapper;
