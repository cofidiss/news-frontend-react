import logo from './logo.svg';
import './App.css';
import SignUp from "../src/components/SignUp/SignUp";

import '../src/css/icons.css';

function App() {
  const baseUrl="http://localhost:40774";
  return (
    <div >
     <SignUp baseUrl={baseUrl}/>
 
    </div>
  );
}

export default App;
