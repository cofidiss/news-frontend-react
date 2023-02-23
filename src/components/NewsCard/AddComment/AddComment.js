
import { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import Modal from "../Modal/Modal";
import { Button} from 'semantic-ui-react'


function AddComment(props){
    const baseUrl = props.baseUrl;
    const [modalState, setModalState] = useState({isOpen:false,header:null,content:null,type:null,okOnClick:null,negativeOnClick:null,positiveOnClick:null});
    const [isPreloaderOpenState, setIsPreloaderOpen] = useState(false);
    const [commentState, setComment] = useState({body:null});


    const onSubmitClick = e =>{


        setIsPreloaderOpen(true);

        fetch(`${baseUrl}/api/newsComment/Add`, {
          method: 'POST', // or 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body:JSON.stringify(formState)
            })
          .then((response) => {
      if (!response.ok){
        debugger;
      return Promise.reject("Unknown Error Occured");
      }
      return response.json(); }).then(x=> {
    if (x.hasError){
    return Promise.reject(x.message);
    }
    setModalState({isOpen:true,content:x.message,type:"success",okOnClick:()=> setModalState({isOpen:false})});
    
      }, x=> Promise.reject("Unknown Error Occured")
      
      ).catch(x=> {
    debugger;
        setModalState({isOpen:true,content:x,type:"fail",okOnClick:()=> setModalState({isOpen:false})});
    
      }).finally( () =>setIsPreloaderOpen(false))
      };
    

    }


const onCommentChange = e =>{

    setComment(e.target.value);
};

return (
<div>
      
<Modal isOpen={modalState.isOpen} content={modalState.content} header={modalState.header}  type={modalState.type} okOnClick={modalState.okOnClick} negativeOnClick={modalState.negativeOnClick} positiveOnClick={modalState.positiveOnClick} />
    <Preloader isOpen={isPreloaderOpenState}/>
<input type="text" onChange={onCommentChange} value={commentState.body}/>

<Button onClick={onSubmitClick}>Submit</Button>

</div>


),

