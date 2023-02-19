import logo from './logo.svg';
import './App.css';
import SignUp from "../src/components/SignUp/SignUp";
import Login from "../src/components/Login/Login";



function App() {
  const baseUrl="http://localhost:40774";
  return (
    <div >
     <Login baseUrl={baseUrl}/>
 
    </div>
  );
}

export default App;
