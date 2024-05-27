function Header() {
  return (
    <header
      className={
        "min-h-24 flex justify-center align-middle items-center flex-col"
      }
    >
      <h5
        className={
          "text-center text-slate-400 font-bold text-xs tracking-wider uppercase"
        }
      >
        Welcome to
      </h5>
      <h1 className={"text-3xl tracking-wider text-slate-900"}>
        <span className={"font-extrabold"}>mor</span>sea
      </h1>
    </header>
  );
}

export default Header;
