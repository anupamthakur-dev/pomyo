import { useBootStore } from "./store/boot.store";
import CanvasContainer from "./components/canvas/canvas";
import BigDigit from "./components/BigDigit";
import Model from "./components/tomato";
import ModelGroup from "./components/canvas/modelGroup";
import ActionToolWrapper from "./components/ActionToolWrapper";
import TodoPanel from "./components/panel/todoPanel";

import { useEffect } from "react";



function App() {
  const isBooted  = useBootStore(s=>s.isBooted);
  const ready  = useBootStore(s=>s.readySet);

  useEffect(()=>{
  for (const value of ready) {
  console.log(value);
}
  },[ready])

  if (!isBooted) return <div>Loading...</div>;
  return (
    <>
      <main className="main-container">
        <BigDigit />
        <CanvasContainer>
          <ModelGroup>
            <Model key={"tomato-modal"} />
          </ModelGroup>
        </CanvasContainer>
       
        <ActionToolWrapper />

        <TodoPanel />
        
      </main>
    </>
  );
}

export default App;
