import logo from './logo.svg';
import * as React from 'react';
import './App.css';
import SignUp from "../src/components/SignUp/SignUp";
import Login from "../src/components/Login/Login";
import CommentList from "../src/components/Comment/CommentList/CommentList";
import NewsCard from "../src/components/NewsCard/NewsCard";
import AddNews from "../src/components/AddNews/AddNews";
import NewsList from "../src/components/NewsList/NewsList";
import NewsNavbar from "./components/NewsNavbar/NewsNavbar";
import CategoryCRUD from "./components/CategoryCRUD/CategoryCRUD";
import {
  BrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import AppBar from "./components/AppBar/AppBar";
function App() {
  debugger;
  console.log("app rendered");
  const [shouldGetAuthInfoCalledState, setShouldGetAuthInfoCalled] = React.useState(true);
  const [shouldGetAuthInfoCalledStateCounter, setShouldGetAuthInfoCalledCounter] = React.useState(0);
  const baseUrl="http://localhost:3000";


  return (
    <div >
     {/* <NewsCard newsId={11}  baseUrl={baseUrl}/>
    */}<AppBar shouldGetAuthInfoCalledCounter={shouldGetAuthInfoCalledStateCounter} baseUrl={baseUrl} />
       <Routes>
       <Route path="/AddNews" element={ <AddNews categoryId={1}  baseUrl={baseUrl} shouldGetAuthInfoCalledCounter={setShouldGetAuthInfoCalledCounter} /> } />
      <Route path="/signup" element={<SignUp baseUrl={baseUrl}/>} />
      <Route path="/login" element={<Login baseUrl={baseUrl} setShouldGetAuthInfoCalledCounter={setShouldGetAuthInfoCalledCounter}/>} />
      <Route path="/newsNavBar" element={<NewsNavbar  baseUrl={baseUrl}/>} />
      <Route path="/getnews" element={<NewsCard   baseUrl={baseUrl}/>} />
      <Route path="/categoryCRUD" element={<CategoryCRUD   baseUrl={baseUrl}/>} />
      
    </Routes>
    <Link to="/AddNews">AddNews</Link>
    <br></br>
    <Link to="/signup">signup</Link>
    <br></br>
    <Link to="/login">login</Link>
    <br></br>
    <Link to="/newsNavBar">newsNavBar</Link>
    <br></br>
    <Link to="/getnews">getnews</Link>
    <br></br>
    <Link to="/categoryCRUD">categoryCRUD</Link>



   
    </div>
  );
}

export default App;
