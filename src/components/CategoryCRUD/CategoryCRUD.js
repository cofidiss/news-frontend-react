import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Preloader from "../Preloader/Preloader";
import Modal from "../Modal/Modal";
import {
  BrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import UpdateCategory from "./UpdateCategory/UpdateCategory";


function CategoryCRUD(props) {
  const [isGetCategoryListForCRUDRequired, setIsGetCategoryListForCRUDRequired] = useState(true);
  const [isPreloaderOpenState, setIsPreloaderOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false
  });
  const baseUrl = props.baseUrl;
  const [categoryListState, setcategoryList] = React.useState([]);
  var deleteCategoryClick= (event) => {  setModalState({
    isOpen: true,
    content: "Are you sure?",
    type: "question",
    negativeOnClick: () => setModalState({ isOpen: false }),
    positiveOnClick: () =>{   setIsPreloaderOpen(true);

      var rowIdToDelete = event.target.getAttribute("categoryid");
      fetch(`${baseUrl}/api/Category/DeleteCategory?id=${rowIdToDelete}`, {
        method: "POST", // or 'PUT',
      }).catch(()=>Promise.reject("Unknown Error Occured"))
        .then((response) => {
          debugger;
          if (!response.ok) {
            return Promise.reject("Unknown Error Occured");
          }
          return response
            .json()
            .catch((x) => Promise.reject("Unknown Error Occured"));
        })
        .then((x) => {
          if (x.hasError) {
            return Promise.reject(x.message);
          }
          setModalState({
            isOpen: true,
            content: x.message,
            type: "success",
            okOnClick: () => setModalState({ isOpen: false }),
          });
        })
        .catch((x) => {
  
          setModalState({
            isOpen: true,
            content: x,
            type: "fail",
            okOnClick: () => setModalState({ isOpen: false }),
          });
        })
        .finally(() => {setIsPreloaderOpen(false);  setIsGetCategoryListForCRUDRequired(true);})
      }})}
var getCategoryListForCRUD = ()=>{
  setIsPreloaderOpen(true);
  fetch(`${baseUrl}/api/Category/GetCategoryListForCRUD`, {
    method: "GET", // or 'PUT',
  }).catch(()=>Promise.reject("Unknown Error Occured"))
    .then((response) => {
      debugger;
      if (!response.ok) {
        return Promise.reject("Unknown Error Occured");
      }
      return response
        .json()
        .catch((x) => Promise.reject("Unknown Error Occured"));
    })
    .then((x) => {
      if (x.hasError) {
        return Promise.reject(x.message);
      }
      setcategoryList(x);
    
    })
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
if (isGetCategoryListForCRUDRequired){
  setIsGetCategoryListForCRUDRequired(false);
  getCategoryListForCRUD();


}

var updateCategoryClick= ()=> {
  setModalState({
    isOpen: true,
    content: <UpdateCategory/>,
    type: "popUp",
    closeOnClick: () => {console.log("closempdal");setModalState({ isOpen: false })}
  });
  
}
  var returnElement = (
    <div>
      {" "}
      <Modal
        isOpen={modalState.isOpen}
        content={modalState.content}
        header={modalState.header}
        type={modalState.type}
        okOnClick={modalState.okOnClick}
        negativeOnClick={modalState.negativeOnClick}
        positiveOnClick={modalState.positiveOnClick} 
        closeOnClick = {modalState.closeOnClick}
      />
      <Preloader isOpen={isPreloaderOpenState} />{" "}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>CategoryId</TableCell>
              <TableCell>CategoryName</TableCell>
              <TableCell>ParentCategoryName</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categoryListState.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="td" scope="row">
                  <p> {row.id} </p>
                </TableCell>
                <TableCell component="td" scope="row">
                  <p> {row.name} </p>
                </TableCell>
                <TableCell component="td" scope="row">
                  <p> {row.parentName} </p>
                </TableCell>
                <TableCell>
                  <Button categoryid={row.id} onClick={updateCategoryClick}>
                    {" "}
                    update
                  </Button>
                </TableCell>
                <TableCell>
                  <Button categoryid={row.id} onClick={deleteCategoryClick}>
                    {" "}
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>{" "}
    </div>
  );
  return returnElement;
}

export default CategoryCRUD;
