import React from "react";

import Preloader from "../../Preloader/Preloader";
import Modal from "../../Modal/Modal";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
function UpdateCategory(props) {
  const [formState, setForm] = React.useState({
    name: props.name,
    parentId: props.parentId,
  });

  const [name, parentId] = React.useState({
    name: props.name,
    parentId: props.parentId,
  });

var onFormChange = (event)=> {

var targetElement = event.target;
 if(targetElement.getAttribute("id") === "name"){

setForm(prevState => {return {...prevState,name:targetElement.value};})

 }
 if(targetElement.getAttribute("id") === "parentId"){

    setForm(prevState => {return {...prevState,parentId:targetElement.value};})
    
     }

}
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <TextField
          id="name"
          label="Name"
          value={formState.name}
          onChange={onFormChange}
        />
        <input type="text" value="1"/>
        {/* <InputLabel id="parent-category-label">ParentCategory</InputLabel>
        <br/> */}
        <Select
          labelId="parent-category-label"
          id="parent-category-select"
         value={formState.parentId}
         onChange={onFormChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}


export default UpdateCategory;