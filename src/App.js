import logo from './logo.svg';
import './App.css';
import SignUp from "../src/components/SignUp/SignUp";
import Login from "../src/components/Login/Login";
import CommentList from "../src/components/Comment/CommentList/CommentList";
import NewsCard from "../src/components/NewsCard/NewsCard";
import AddNews from "../src/components/AddNews/AddNews";
import NewsList from "../src/components/NewsList/NewsList";
import NewsNavbar from "./components/NewsNavbar/NewsNavbar";
import {
  BrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Link,
} from "react-router-dom";

function App() {
  console.log("app rendered");
  const baseUrl="http://localhost:40774";
  return (
    <div >
     {/* <NewsCard newsId={11}  baseUrl={baseUrl}/>
    */}
       <Routes>
       <Route path="/AddNews" element={ <AddNews categoryId={1}  baseUrl={baseUrl}/> } />
      <Route path="/signup" element={<SignUp baseUrl={baseUrl}/>} />
      <Route path="/login" element={<Login baseUrl={baseUrl}/>} />
      <Route path="/newsNavBar" element={<NewsNavbar  baseUrl={baseUrl}/>} />
      <Route path="/getnews" element={<NewsCard   baseUrl={baseUrl}/>} />
    </Routes>
     
   
    </div>
  );
}

export default App;
