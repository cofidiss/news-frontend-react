import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Preloader from "../Preloader/Preloader";
import Modal from "../Modal/Modal";
function CategoryCRUD(props){
    const [isPreloaderOpenState, setIsPreloaderOpen] = useState(false);
    const [modalState, setModalState] = useState({isOpen:false,header:null,content:null,type:null,okOnClick:null,negativeOnClick:null,positiveOnClick:null});
const baseUrl = props.baseUrl;
    const [categoryListState, setcategoryList] = React.useState([]);
var deleteCategory = ()=> {};



    fetch(`${baseUrl}/api/Category/GetCategoryListForCRUD`, {
        method: 'GET', // or 'PUT', 
      
          }).then((response) => {
            if (!response.ok){
     
            return Promise.reject("Unknown Error Occured");
            }
            return response.json().catch(x=> Promise.reject("Unknown Error Occured"))}).then(x=> {
            if (x.hasError){
            return Promise.reject(x.message);
            }
            setcategoryList(x);
            setModalState({isOpen:true,content:x.message,type:"success",okOnClick:()=> setModalState({isOpen:false})});
          }).catch (x=>        {  debugger; setModalState({isOpen:true,content:x,type:"fail",okOnClick:()=> setModalState({isOpen:false})})} ).finally(() => setIsPreloaderOpen(false))

var returnElement =  <div>    <Modal
isOpen={modalState.isOpen}
content={modalState.content}
header={modalState.header}
type={modalState.type}
okOnClick={modalState.okOnClick}
negativeOnClick={modalState.negativeOnClick}
positiveOnClick={modalState.positiveOnClick}
/>
<Preloader isOpen={isPreloaderOpenState} /> <TableContainer component={Paper}>
<Table sx={{ minWidth: 650 }} aria-label="simple table">
  <TableHead>
    <TableRow>
      <TableCell>CategoryId</TableCell>
      <TableCell>CategoryName</TableCell>
      <TableCell>ParentCategoryName</TableCell>
       <TableCell >Delete</TableCell> 
    </TableRow>
  </TableHead>
  <TableBody>
    {categoryListState.map((row) => (
      <TableRow
        key={row.id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      
      >
        <TableCell component="td" scope="row">
          <p>  {row.id} </p>
        </TableCell>
        <TableCell component="td" scope="row">
          <p>  {row.Name} </p>
        </TableCell>
        <TableCell component="td" scope="row">
          <p>  {row.ParentName} </p>
        </TableCell>

     <TableCell ><Button categoryid={row.id} onClick={deleteCategory }> delete</Button></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
</TableContainer> </div>;
return returnElement;

}

export default CategoryCRUD;