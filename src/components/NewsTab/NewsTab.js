import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function NewsTab(props){
debugger;
const setSelectedCategoryIdQueryParam = props.setSelectedCategoryIdQueryParam;
const name = props.name;
const id = props.id;
const children = props.children;
const [anchorEl, setAnchorEl] = React.useState(null);
const onTabHover = (event) => {
  setAnchorEl(event.currentTarget);
};
const handleClose = (e) => {

  setAnchorEl(null);
};
const onCategoryClick = e=> {
	debugger;
	console.log("clciked");
	var selectedCategoryid=	e.currentTarget.getAttribute("categoryid");
	setSelectedCategoryIdQueryParam(parseInt(selectedCategoryid));
	setAnchorEl(null);
}
const ITEM_HEIGHT = 48;
return (

<div>
	
	<Tab label={name} categoryid={id} onMouseEnter={onTabHover} onClick={onCategoryClick}/> 
	<Menu  
	id="long-menu"

	MenuListProps={{
	  'aria-labelledby': 'long-button',
	}}
	anchorEl={anchorEl}
	open={Boolean(anchorEl)}
	onClose={handleClose}
	PaperProps={{
	  style: {
		maxHeight: ITEM_HEIGHT * 4.5,
		width: '20ch',
	  },
	}}
  >
	{children.map((option) => (
	  <MenuItem key={option.id} categoryid={option.id}  onClick={onCategoryClick}>
		{option.name}
	  </MenuItem>
	))}
  </Menu>

</div>  ) }



	
	





	
export default NewsTab;