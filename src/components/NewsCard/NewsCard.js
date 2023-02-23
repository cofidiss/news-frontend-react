import { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import Modal from "../Modal/Modal";
import  bootstrap from '../../css/bootstrap.module.css';
import  icons from '../../css/icons.module.css';

function NewsCard(props){
const newsId= props.newsId;
const [newsState, setNews] = useState({header:null,body:null,images:null,videos:null,comments:null});




    return (<div>

<h1>  {newsState.header}</h1>
<p>  {newsState.body}</p>

{images.map(x=> <img url={x}/>)}  
{comments.map(x=> <div> 
<p>{x.body}</p>
<p>{x.commentor}</p>
</div>)}

comment ekleyi komponent yap

  



   
    </div>);
}