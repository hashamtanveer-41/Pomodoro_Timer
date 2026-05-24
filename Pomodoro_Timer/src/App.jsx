import './App.css'
import {PomodoroProvider} from "./context/PomodoroContext.jsx";
import NavBar from "./components/NavBar.jsx";
import PomodoroTimer from "./components/PomodoroTimer.jsx";

function App() {

  return (
      <>
        <PomodoroProvider>
          <div className="h-screen flex flex-col overflow-hidden">
            <NavBar />
            <PomodoroTimer />
          </div>
        </PomodoroProvider>
      </>
  )
}

export default App
