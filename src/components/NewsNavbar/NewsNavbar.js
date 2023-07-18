import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NewsTab from "../NewsTab/NewsTab";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Preloader from "../Preloader/Preloader";
import Modal from "../Modal/Modal";
import { useSearchParams,NavLink } from "react-router-dom";
import NewsList from "../NewsList/NewsList";
function NewsNavbar(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  
  console.log("NewsNavbar rendered");
const baseUrl = props.baseUrl;
const setSelectedCategoryIdQueryParam = categoryId => {
  setSearchParams({"categoryId":parseInt(categoryId)});
};

const selectedCategoryId = parseInt(searchParams.get("categoryId"));
  const [selectedTabValue, setselectedTabValue] = React.useState(0);
  const [categoriesState, setCategoriesState] = React.useState([]);
  const [isPreloaderOpenState, setIsPreloaderOpen] = React.useState(false);
  const [modalState, setModalState] = React.useState({isOpen:false,header:null,content:null,type:null,okOnClick:null,negativeOnClick:null,positiveOnClick:null});

  React.useEffect(()=> {

    fetch(`${baseUrl}/api/Category/GetCategoriesForNavBar`, {
      method: 'GET', // or 'PUT', 
  
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
  if (searchParams.get("categoryId")=== null){
    setSearchParams(prevSearchparam => {return {...prevSearchparam,categoryId:x[0].id}});
  
  }
  setCategoriesState(x);
  
  }, x=> Promise.reject("Unknown Error Occured")
  
  ).catch(x=> {
  
    setModalState({isOpen:true,content:x,type:"fail",okOnClick:()=> setModalState({isOpen:false})});
  
  }).finally( () =>setIsPreloaderOpen(false))
  },[selectedCategoryId]);


  const onTabClick = (event, newValue) => {
    setselectedTabValue(newValue);
  };

  
  var selectedCategoryNameAndId = {id:null,name:null};
  var selectedCategoryParentNameAndId = {id:null,name:null};

  var selectedCategoryParentId = null;
  for (let categoryState of categoriesState) {
    debugger;
    if (categoryState.id === selectedCategoryId) {
      selectedCategoryParentNameAndId = {id:selectedCategoryId,name:categoryState.name} ;

      break;
    }
    for (let childCategoryState of categoryState.children) {
      if (childCategoryState.id === selectedCategoryId) {
        selectedCategoryParentNameAndId = {id:categoryState.id,name:categoryState.name} ;
         selectedCategoryNameAndId = {id:childCategoryState.id,name:childCategoryState.name};
        break;
      }
    }
  }
  return (
    <div>
       
       <Modal isOpen={modalState.isOpen} content={modalState.content} header={modalState.header}  type={modalState.type} okOnClick={modalState.okOnClick} negativeOnClick={modalState.negativeOnClick} positiveOnClick={modalState.positiveOnClick} />
    <Preloader isOpen={isPreloaderOpenState}/>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
        <Tabs
          value={selectedTabValue}
          onChange={onTabClick}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {categoriesState.map((x) => {
            return (
              <NewsTab
              setSelectedCategoryIdQueryParam={setSelectedCategoryIdQueryParam}
                id={x.id}
                name={x.name}
              >
                {x.children}
              </NewsTab>
            );
          })}
        </Tabs>
      </Box>

      <Breadcrumbs aria-label="breadcrumb">
        {selectedCategoryParentNameAndId.id === null ? null:( <NavLink underline="hover" id={selectedCategoryParentNameAndId.id} color="inherit" onClick={x=> {x.preventDefault(); setSelectedCategoryIdQueryParam(selectedCategoryParentNameAndId.id )}  }>
          {selectedCategoryParentNameAndId.name}
        </NavLink> )}
       
        {selectedCategoryNameAndId.id === null ? null: (<NavLink underline="hover" id={selectedCategoryNameAndId.id } color="inherit"onClick={x=> {x.preventDefault(); setSelectedCategoryIdQueryParam(selectedCategoryNameAndId.id )}  }>
          {selectedCategoryNameAndId.name}
        </NavLink> )}

      </Breadcrumbs>
      <NewsList categoryId={selectedCategoryId} baseUrl={baseUrl}/>
    </div>
  );
}

export default NewsNavbar;
