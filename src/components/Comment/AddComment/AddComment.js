
import { useState, useEffect } from "react";
import Preloader from "../../Preloader/Preloader";
import Modal from "../../Modal/Modal";
import { Button,Form} from 'semantic-ui-react';


function AddComment(props){
  debugger;
  const newsId= props.newsId;
    const baseUrl = props.baseUrl;
    const [modalState, setModalState] = useState({isOpen:false,header:null,content:null,type:null,okOnClick:null,negativeOnClick:null,positiveOnClick:null});
    const [isPreloaderOpenState, setIsPreloaderOpen] = useState(false);
    const [formState, setForm] = useState({comment:null,newsId:newsId});
const setNeedToFetchCommentState = props.setNeedToFetchCommentState;

    const onSubmitClick = e =>{
debugger;

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
    setModalState({isOpen:true,content:x.message,type:"success",okOnClick:()=>{ 
      setModalState({isOpen:false});setNeedToFetchCommentState(true);
    }});
    
      }, x=> Promise.reject("Unknown Error Occured")
      
      ).catch(x=> {
    debugger;
        setModalState({isOpen:true,content:x,type:"fail",okOnClick:()=> setModalState({isOpen:false})});
    
      }).finally( () =>setIsPreloaderOpen(false))
      };
    

  


const onCommentChange = e =>{

  setForm(prevState => {return {...prevState,comment:e.target.value}; });
};

return (
<div>
      
<Modal isOpen={modalState.isOpen} content={modalState.content} header={modalState.header}  type={modalState.type} okOnClick={modalState.okOnClick} negativeOnClick={modalState.negativeOnClick} positiveOnClick={modalState.positiveOnClick} />
    <Preloader isOpen={isPreloaderOpenState}/>

   
<Form reply>
      <Form.TextArea  onChange={onCommentChange} value={formState.comment}/>
      <Button onClick={onSubmitClick} content='Comment' labelPosition='left' icon='add' primary />
    </Form>

</div>


);

}
export default AddComment;

