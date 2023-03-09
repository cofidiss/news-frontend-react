import logo from './logo.svg';
import './App.css';
import SignUp from "../src/components/SignUp/SignUp";
import Login from "../src/components/Login/Login";
import CommentList from "../src/components/Comment/CommentList/CommentList";
import NewsCard from "../src/components/NewsCard/NewsCard";
function App() {
  const baseUrl="http://localhost:40774";
  return (
    <div >
     {/* <Login baseUrl={baseUrl}/>
     <CommentList newsId={2}  baseUrl={baseUrl}/> */}
     <NewsCard newsId={2}  baseUrl={baseUrl}/>
    </div>
  );
}

export default App;
