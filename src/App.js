import logo from './logo.svg';
import './App.css';
import SignUp from "../src/components/SignUp/SignUp";
import Login from "../src/components/Login/Login";
import CommentList from "../src/components/Comment/CommentList/CommentList";
import NewsCard from "../src/components/NewsCard/NewsCard";
import AddNews from "../src/components/AddNews/AddNews";
import NewsList from "../src/components/NewsList/NewsList";
import NewsNavbar from "./components/NewsNavbar/NewsNavbar";


function App() {
  const baseUrl="http://localhost:40774/asdas/asd";
  return (
    <div >
     {/* <NewsCard newsId={11}  baseUrl={baseUrl}/>
     <AddNews categoryId={1}  baseUrl={baseUrl}/> */}
     <NewsNavbar />
    </div>
  );
}

export default App;
