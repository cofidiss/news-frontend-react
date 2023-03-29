
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
React.useEffect(()=> {setIsPreloaderOpen(true);var getNewPromise = fetch(`${baseUrl}/api/News/GetNewsListForCategory?categoryId=${categoryId}`, {
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

}).finally( () =>setIsPreloaderOpen(false))},[categoryId])

const deleteNews = e=> {

  setIsPreloaderOpen(true);
fetch(`${baseUrl}/api/News/GetNewsListForCategory?categoryId=${categoryId}`, {
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

}

return (<div> <Modal isOpen={modalState.isOpen} content={modalState.content} header={modalState.header}  type={modalState.type} okOnClick={modalState.okOnClick} negativeOnClick={modalState.negativeOnClick} positiveOnClick={modalState.positiveOnClick} />
<Preloader isOpen={isPreloaderOpenState}/>  <TableContainer component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell>Header</TableCell>
        <TableCell >UploadDate</TableCell>
        {isCategoryAdminState === true ?        <TableCell onClick={deleteNews }>Delete</TableCell> : null}
      </TableRow>
    </TableHead>
    <TableBody>
      {newsListState.map((row) => (
        <TableRow
          key={row.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          onClick={x => navigate("/getNews?newsId=" + row.id)}
        >
          <TableCell component="th" scope="row">
            {row.header}
          </TableCell>
          <TableCell >{row.uploadDate}</TableCell>
          {isCategoryAdminState === true ?        <TableCell >Delete Button</TableCell> : null}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer></div>

)


}
export default NewsList;