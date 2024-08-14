import './App.css';
import {AuthContextProvider} from "./contexts/AuthContext";
import {DApp} from "./pages/DApp";

function App() {
  return (
    <div className="App">
        <AuthContextProvider>
            <DApp></DApp>
        </AuthContextProvider>
    </div>
  );
}

export default App;
