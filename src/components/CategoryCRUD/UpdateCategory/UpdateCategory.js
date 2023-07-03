import React,{useEffect, useState} from "react";

import Preloader from "../../Preloader/Preloader";
import Modal from "../../Modal/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Html } from "@mui/icons-material";
import { Button } from "semantic-ui-react";
function UpdateCategory(props) {

  const [isPreloaderOpenState, setIsPreloaderOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false
  });
  const baseUrl = props.baseUrl;
  var categoryId = props.categoryId;
  const [formState, setForm] = React.useState({
    name: props.name,
    id:categoryId,
    parentId: props.categoryParentId,
    categoryLov:[]
  });

var onUpdateClick = e => {
  fetch(`${baseUrl}/api/Category/UpdateCategory`, {
    method: "POST", // or 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formState
    }),
  })
    .then((response) => {
      if (!response.ok) {
        debugger;
        return Promise.reject("Unknown Error Occured");
      }
      return response.json();
    })
    .then(
      (x) => {
        if (x.hasError) {
          return Promise.reject(x.message);
        }
        setModalState({
          isOpen: true,
          content: x.message,
          type: "success",
          okOnClick: () => setModalState({ isOpen: false }),
        });
      },
      (x) => Promise.reject("Unknown Error Occured")
    )
    .catch((x) => {
      debugger;
      setModalState({
        isOpen: true,
        content: x,
        type: "fail",
        okOnClick: () => setModalState({ isOpen: false }),
      });
    })
    .finally(() => setIsPreloaderOpen(false));
  

}
  var getCategoryLov = ()=> {
    debugger;
    setIsPreloaderOpen(true);
    fetch(`${baseUrl}/api/category/GetCategoryLov`, {
      method: "GET", // or 'PUT',
      headers: {
        "Content-Type": "application/json",
      }
  
    })
      .then((response) => {
        if (!response.ok) {
          debugger;
          return Promise.reject("Unknown Error Occured");
        }
        return response.json();
      })
      .then(
        (x) => {
          if (x.hasError) {
            return Promise.reject(x.message);
          }
          var categoryOptionList = [];
          debugger;
          const getCategoryOption = (category ,categoryLevel) =>  {
            var categoryPadding = "";
            for (var level=1; level< categoryLevel;level++ ){
              categoryPadding += "--";
            }
            var option = {value:category.id,label:categoryPadding+ category.name};
            categoryOptionList.push(option);
            if (category.children == null){
  return;
            }
           for (var category of category.children){
            debugger;
            getCategoryOption(category,categoryLevel+1);
                      }
  
          }
          debugger; 
  
          for (var category of x){
            getCategoryOption(category,1)
  
          }
          setForm(prevState=>{return { ...prevState,categoryLov:categoryOptionList}})
        
       
        },
        (x) => Promise.reject("Unknown Error Occured")
      )
      .catch((x) => {
        debugger;
        setModalState({
          isOpen: true,
          content: x,
          type: "fail",
          okOnClick: () => setModalState({ isOpen: false }),
        });
      })
      .finally(() => setIsPreloaderOpen(false));
  }
  useEffect(getCategoryLov,[]);
var onFormChange = (event)=> {

var targetElement = event.target;
if(targetElement instanceof HTMLElement){
  if(targetElement.getAttribute("id") === "name"){

    setForm(prevState => {return {...prevState,name:targetElement.value};})
    
     }

}
else {


    setForm(prevState => {return {...prevState,parentId:targetElement.value};})
    

}


}
debugger;
  return (
    <div><Modal
    isOpen={modalState.isOpen}
    content={modalState.content}
    header={modalState.header}
    type={modalState.type}
    okOnClick={modalState.okOnClick}
    negativeOnClick={modalState.negativeOnClick}
    positiveOnClick={modalState.positiveOnClick} 
    closeOnClick = {modalState.closeOnClick}
  />
            <Preloader isOpen={isPreloaderOpenState} />
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <TextField
          id="name"
          label="Name"
          value={formState.name}
          onChange={onFormChange}
        />
 
        {/* <InputLabel id="parent-category-label">ParentCategory</InputLabel>
        <br/> */}

        {
           formState.categoryLov.length === 0  ?null :  <Select
           labelId="parent-category-label"
           id="parent-category-select"
          value={formState.parentId}
          onChange={onFormChange}
         >      <MenuItem value={-1}>
         None
       </MenuItem>
 
 { 
           formState.categoryLov.map(x => {    debugger;return (<MenuItem value={x.value}>{x.label}</MenuItem>); })}
     
         </Select>
        }
       <Button onClick={onUpdateClick}> Save</Button>
      </FormControl>
    </div>
  );
}


export default UpdateCategory;