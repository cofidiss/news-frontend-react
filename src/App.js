import logo from './logo.svg';
import './App.css';
import SignUp from "../src/components/SignUp/SignUp";
import Login from "../src/components/Login/Login";
import CommentList from "../src/components/Comment/CommentList/CommentList";
import NewsCard from "../src/components/NewsCard/NewsCard";
import AddNews from "../src/components/AddNews/AddNews";
function App() {
  const baseUrl="http://localhost:40774/asdas/asd";
  return (
    <div >
    
     <AddNews categoryId={1}  baseUrl={baseUrl}/>
    </div>
  );
}

export default App;
