import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import "react-day-picker/dist/style.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="max-w-[1140px] my-0 mx-auto">
      <Header isLoading={isLoading} />
      <Main isLoading={isLoading} setIsLoading={setIsLoading} />
    </main>
  );
}

export default App;
