import Reader from "./components/Reader.tsx";
import Header from "./components/Header.tsx";
import Wrapper from "./components/Wrapper.tsx";

function App() {
  return (
    <main className={"light text-foreground"}>
      <div className={"container xl mx-auto"}>
        <Wrapper>
          <Header />
            <Reader />
        </Wrapper>
      </div>
    </main>
  );
}

export default App;
