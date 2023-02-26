import logo from './logo.svg';
import './App.css';
import SignUp from "../src/components/SignUp/SignUp";
import Login from "../src/components/Login/Login";
import AddComment from "../src/components/NewsCard/AddComment/AddComment";


function App() {
  const baseUrl="http://localhost:40774";
  return (
    <div >
     <AddComment baseUrl={baseUrl} newsId={1}/>
 
    </div>
  );
}

export default App;
