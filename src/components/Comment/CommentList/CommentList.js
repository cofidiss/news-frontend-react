import Preloader from "../../Preloader/Preloader";
import Modal from "../../Modal/Modal";

import { useState, useEffect } from "react";

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
  const [commentListState, setCommentList] = useState(null);

  useEffect(x => {setIsPreloaderOpen(true); fetch(`${baseUrl}/api/newsComment/GetCommentsForNews`, {
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

}).finally( () =>setIsPreloaderOpen(false))
},[])
 










  return (
    <div>
         
      <Modal isOpen={modalState.isOpen} content={modalState.content} header={modalState.header}  type={modalState.type} okOnClick={modalState.okOnClick} negativeOnClick={modalState.negativeOnClick} positiveOnClick={modalState.positiveOnClick} />
    <Preloader isOpen={isPreloaderOpenState}/>
      {commentListState === null ||commentListState === undefined ? null: commentListState.map((x) => {
        debugger;
      return  (<div>      <lable>comment</lable>
        <input type="text" disabled value={x.comment} />
        <lable>author</lable>
        <input type="text" disabled value={x.author} /></div>);
      })}
 
    </div>
  );
}

export default CommentList;
