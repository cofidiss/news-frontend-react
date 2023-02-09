import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
//import   'react-datepicker/src/stylesheets/datepicker.scss';
//import 'react-datepicker/src/stylesheets/mixins.scss';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import '../../../src/bootstrap/bootstrap.css';

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
    <div  className="col-md-5">
      <div>
        <label>Kullanıcı Adı</label>
        <input className="form-control" onChange={onFormChange} type="text" id="userName" value={formState.userName} />
      </div>
      <div>
        <label>E-Mail</label>
        <input type="text" className="form-control" onChange={onFormChange} id="email"  value={formState.email}/>
      </div>
      <div>
        <label>Parola</label>
        <input type="text" className="form-control" onChange={onFormChange} id="password"  value={formState.password} />
        <input type="text" className="form-control"  onChange={onFormChange} id="passwordAgain"  value={formState.passwordAgain}/>
        <p id="passwordError">{errorMessageState.password}</p>
      </div>
      <div>
        <label>Doğum Tarihi</label>
        
    <DatePicker
      showIcon
      selected={formState.birthDate}
      onChange={(date)=>  setForm(prevState=> {return {...prevState,birthDate:date}} )
      }
    />
      
      </div>
      <button onClick={onSaveClick}>Kaydet</button>
   
    </div>
  );
}

export default SignUp;
