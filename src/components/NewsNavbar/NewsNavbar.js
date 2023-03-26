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
function NewsNavbar(props) {
const baseUrl = props.baseUrl;
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);
  const [selectedTabValue, setselectedTabValue] = React.useState(null);
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
  setCategoriesState(x);
  
  }, x=> Promise.reject("Unknown Error Occured")
  
  ).catch(x=> {
  
    setModalState({isOpen:true,content:x,type:"fail",okOnClick:()=> setModalState({isOpen:false})});
  
  }).finally( () =>setIsPreloaderOpen(false))
  },[]);


  const onTabClick = (event, newValue) => {
    setselectedTabValue(newValue);
  };

  
  var selectedCategoryName = null;
  var selectedCategoryParentName = null;
  for (let categoryState of categoriesState) {
    if (categoryState.id === selectedCategoryId) {
      selectedCategoryParentName = categoryState.name;
      break;
    }
    for (let childCategoryState of categoryState.children) {
      if (childCategoryState.id === selectedCategoryId) {
        selectedCategoryParentName = categoryState.name;
        selectedCategoryName = childCategoryState.name;
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
                setSelectedCategoryId={setSelectedCategoryId}
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
        {selectedCategoryParentName === null ? null:( <Link underline="hover" color="inherit" href="/">
          {selectedCategoryParentName}
        </Link> )}
       
        {selectedCategoryName === null ? null: (<Link underline="hover" color="inherit" href="/">
          {selectedCategoryName}
        </Link> )}

      </Breadcrumbs>
    </div>
  );
}

export default NewsNavbar;
