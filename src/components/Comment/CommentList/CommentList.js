import Preloader from "../../Preloader/Preloader";
import Modal from "../../Modal/Modal";
import AddComment from "../AddComment/AddComment";
import { useState, useEffect } from "react";
import {  Comment } from 'semantic-ui-react'
function CommentList(props) {
  const newsId = props.newsId;
  const baseUrl = props.baseUrl;
  const [modalState, setModalState] = useState({
    isOpen: false,
    header: null,
    content: null,
    type: null,
    okOnClick: null,
    negativeOnClick: null,
    positiveOnClick: null,
  });
  const [isPreloaderOpenState, setIsPreloaderOpen] = useState(false);
  const [commentListState, setCommentList] = useState([]);
  const [needToFetchCommentState, setNeedToFetchCommentState] = useState(true);

  if(needToFetchCommentState){
    debugger;
    setNeedToFetchCommentState(false);
   setIsPreloaderOpen(true);
    fetch(`${baseUrl}/api/newsComment/GetCommentsForNews`, {
     method: 'POST', // or 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(newsId)
        })
      .then((response) => {
  if (!response.ok){
    debugger;
  return Promise.reject("Unknown Error Occured");
  }
  return response.json(); }).then(x=> {
  if (x.hasError){
  return Promise.reject(x.message);
  }  debugger;
  setCommentList(x.data);
  
  }, x=> Promise.reject("Unknown Error Occured")
  
  ).catch(x=> {
  debugger;
    setModalState({isOpen:true,content:x,type:"fail",okOnClick:()=> setModalState({isOpen:false})});
  
  }).finally( () =>setIsPreloaderOpen(false));
  


  }

 










  return (
    <div>
         
      <Modal isOpen={modalState.isOpen} content={modalState.content} header={modalState.header}  type={modalState.type} okOnClick={modalState.okOnClick} negativeOnClick={modalState.negativeOnClick} positiveOnClick={modalState.positiveOnClick} />
    <Preloader isOpen={isPreloaderOpenState}/>  <Comment.Group>  
      {commentListState.length  === 0  ? null: commentListState.map((x) => {
        debugger;
      return  (    <Comment>    
        <Comment.Content>
          <Comment.Author>{x.author}</Comment.Author>
          <Comment.Metadata>
            <div>{x.creationDate}</div>
          </Comment.Metadata>
          <Comment.Text>
          {x.comment}
          </Comment.Text>
       
        </Comment.Content>
      </Comment>
  );
      })}
</Comment.Group>


 <AddComment baseUrl={baseUrl} newsId={newsId} setNeedToFetchCommentState={setNeedToFetchCommentState} />
    </div>
  );
}

export default CommentList;
