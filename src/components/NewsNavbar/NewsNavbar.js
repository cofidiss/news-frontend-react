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
function NewsNavbar(props) {
  debugger;
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(null);
  const [selectedTabValue, setselectedTabValue] = React.useState(null);
  const [categoriesState, setCategoriesState] = React.useState([
    {
      id: 1,
      name: "ktg1",
      htmlElement: null,
      children: [
        { id: -1, name: "ktg1child1" },
        { id: -2, name: "ktg1child2" },
      ],
    },
    {
      id: 2,
      name: "ktg2",
      htmlElement: null,
      children: [
        { id: -3, name: "ktg2child1" },
        { id: -4, name: "ktg2child2" },
      ],
    },
  ]);
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
