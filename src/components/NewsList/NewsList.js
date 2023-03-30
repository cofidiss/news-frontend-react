
import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Preloader from "../Preloader/Preloader";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
function NewsList(props){
  debugger;
  const navigate = useNavigate();

  const categoryId = props.categoryId;
const baseUrl = props.baseUrl;
const [modalState, setModalState] = React.useState({isOpen:false,header:null,content:null,type:null,okOnClick:null,negativeOnClick:null,positiveOnClick:null});
const [isPreloaderOpenState, setIsPreloaderOpen] = React.useState(false);
const [newsListState, setnewsListState] = React.useState([]);
const [isCategoryAdminState, setIsCategoryAdmin] = React.useState(null);

console.log("NewsList rendered " + newsListState);


React.useEffect(()=> LoadNewsList(),[categoryId])
const LoadNewsList = e => {
  {setIsPreloaderOpen(true);var getNewPromise = fetch(`${baseUrl}/api/News/GetNewsListForCategory?categoryId=${categoryId}`, {
    method: 'GET', // or 'PUT', 
  
      }).then((response) => {
        if (!response.ok){
        debugger;
        return Promise.reject("Unknown Error Occured");
        }
        return response.json(); }).then(x=> {
        if (x.hasError){
        return Promise.reject(x.message);
        }return x;})
      var isCategoryAdminPromise  = fetch(`${baseUrl}/api/User/IsCategoryAdmin?categoryId=${categoryId}`, {
        method: 'POST', // or 'PUT', 
      
          }).then((response) => {
            if (!response.ok){
            debugger;
            return Promise.reject("Unknown Error Occured");
            }
            return response.json(); }).then(x=> {
            if (x.hasError){
            return Promise.reject(x.message);
            }return x;});
            Promise.all([getNewPromise,isCategoryAdminPromise])
    .then(x=> {
  debugger;
  console.log(11);
  setnewsListState(x[0]);
  setIsCategoryAdmin(x[1]);
  }, x=> {console.log(x);return Promise.reject("Unknown Error Occured")}
  
  ).catch(x=> {
    console.log(112);
  setModalState({isOpen:true,content:x,type:"fail",okOnClick:()=> setModalState({isOpen:false})});
  
  }).finally( () =>setIsPreloaderOpen(false))}
}
const deleteNews = e=> {
setModalState({isOpen:true,content:"Are you sure to Delete?",type:"question",positiveOnClick:positiveOnClick,negativeOnClick:()=>setModalState({isOpen:false})})
var newsId = e.target.getAttribute("newsid");
  function positiveOnClick  (e)  {

    setIsPreloaderOpen(true);
    fetch(`${baseUrl}/api/News/DeleteNewsAndFiles?newsId=${newsId}`, {
      method: 'POST', // or 'PUT', 
    
        }).then((response) => {
          if (!response.ok){
   
          return Promise.reject("Unknown Error Occured");
          }
          return response.json().catch(x=> Promise.reject("Unknown Error Occured"))}).then(x=> {
          if (x.hasError){
          return Promise.reject(x.message);
          }
          debugger;LoadNewsList();
          setModalState({isOpen:true,content:x.message,type:"success",okOnClick:()=> setModalState({isOpen:false})});
        }).catch (x=>        {  debugger; setModalState({isOpen:true,content:x,type:"fail",okOnClick:()=> setModalState({isOpen:false})})} ).finally(() => setIsPreloaderOpen(false))
  

  }

}




return (<div> <Modal isOpen={modalState.isOpen} content={modalState.content} header={modalState.header}  type={modalState.type} okOnClick={modalState.okOnClick} negativeOnClick={modalState.negativeOnClick} positiveOnClick={modalState.positiveOnClick} />
<Preloader isOpen={isPreloaderOpenState}/>  <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Header</TableCell>
      
        {isCategoryAdminState === true ?        <TableCell >Delete</TableCell> : null}
      </TableRow>
    </TableHead>
    <TableBody>
      {newsListState.map((row) => (
        <TableRow
          key={row.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        
        >
          <TableCell component="th" scope="row">
            <p  style={{textDecoration: "underline",cursor: "pointer"}} onClick={x => navigate("/getNews?newsId=" + row.id)}>  {row.header} </p>
            {row.uploadDate}
          </TableCell>

          {isCategoryAdminState === true ?        <TableCell ><Button newsid={row.id} onClick={deleteNews }> delete</Button></TableCell> : null}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer></div>

)


}
export default NewsList;