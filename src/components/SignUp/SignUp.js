import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
//import   'react-datepicker/src/stylesheets/datepicker.scss';
//import 'react-datepicker/src/stylesheets/mixins.scss';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


function SignUp(props) {
  const [startDate, setStartDate] = useState(new Date());
  const [errorMessageState, setErrorMessage] = useState({password:""});
  console.log("sate changed");
  const [formState, setForm] = useState({
    userName: "",
    password: "",
    passwordAgain: "",    
    email: "",
    birthDate: "",
  });
const onFormChange = (event)=>{
  debugger;



const inputValue = event.target.value;
if (event.target.id === "userName"){
  setForm(prevState => {

    return {...prevState,userName:inputValue}
  })
}

if (event.target.id === "email"){
  setForm(prevState => {

    return {...prevState,email:inputValue}
  })
}
if (event.target.id === "password"){
  if(inputValue === formState.passwordAgain){
    setErrorMessage(prevState=>{return {...prevState,password:""}} )
    
      }
     else{
        setErrorMessage(prevState=> {return {...prevState,password:"Lütfen 2 alana da aynı parolayı giriniz"}})
        
          }

  setForm(prevState => {

    return {...prevState,password:inputValue}
  })
}
if (event.target.id === "passwordAgain"){
 
  if(inputValue === formState.password){
setErrorMessage(prevState=>{return {...prevState,password:""}} )

  }
 else{
    setErrorMessage(prevState=> {return {...prevState,password:"Lütfen 2 alana da aynı parolayı giriniz"}})
    
      }
  setForm(prevState => {

    return {...prevState,passwordAgain:inputValue}
  })
}


if (event.target.id === "birthDate"){
  setForm(prevState => {

    return {...prevState,birthDate:inputValue}
  })
}
}

const onSaveClick = (event) => {


  
}




  return (
    <div  className="col-md-4">
      
      <div className="clearfix  form-group">
        <label className="col-md-4">Username</label>
        <div className="col-md-8" > 
        <input className="form-control" onChange={onFormChange} type="text" placeholder="Username" id="userName" value={formState.userName} />
        </div>
      </div>
      <div className="clearfix  form-group">
        <label className="col-md-4">E-Mail</label>
        <div className="col-md-8" > 
        <input type="text" className="form-control"  placeholder="e-mail"  onChange={onFormChange} id="email"  value={formState.email}/>
      </div>
      </div>
      <div className="clearfix  form-group">
        <label className="col-md-4">Password</label>
        <div className="col-md-8" > 
        <input type="text" className="form-control"  placeholder="Password" onChange={onFormChange} id="password"  value={formState.password} />
        <div class="input-group-addon">
        <a href=""><i class="fa fa-eye-slash" aria-hidden="true"></i></a>
        <a href=""><i class="fa fa-eye" aria-hidden="true"></i></a>
      </div>
        <input type="text" className="form-control"  placeholder="Password Again" onChange={onFormChange} id="passwordAgain"  value={formState.passwordAgain}/>
        <p id="passwordError">{errorMessageState.password}</p>
       </div>
      

      </div>
      <div className="clearfix  form-group">
        <label className="col-md-4">Birthdate</label>
        <div className="col-md-8" > 
    <DatePicker
      showIcon
      className="form-control"
      selected={formState.birthDate}
      onChange={(date)=>  setForm(prevState=> {return {...prevState,birthDate:date}} )
      }
    />
         </div>
      </div>
      <button onClick={onSaveClick}>Kaydet</button>
   
    </div>
  );
}

export default SignUp;
