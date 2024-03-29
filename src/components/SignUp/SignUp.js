import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
//import   'react-datepicker/src/stylesheets/datepicker.scss';
//import 'react-datepicker/src/stylesheets/mixins.scss';
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Preloader from "../Preloader/Preloader";
import Modal from "../Modal/Modal";
import  bootstrap from '../../css/bootstrap.module.css';
import  icons from '../../css/icons.module.css';

function SignUp(props) {
  const baseUrl = props.baseUrl;
  const [modalState, setModalState] = useState({isOpen:false,header:null,content:null,type:null,okOnClick:null,negativeOnClick:null,positiveOnClick:null});

  const [startDate, setStartDate] = useState(new Date());
  const [isPreloaderOpenState, setIsPreloaderOpen] = useState(false);
  const [passwordsVisible, setPasswordsVisible] = useState({
    passwordVisible: false,
    passwordAgainVisible: false,
  });
  const [errorMessageState, setErrorMessage] = useState({ password: "" });
  console.log("sate changed");
  const [formState, setForm] = useState({
    userName: "",
    password: "",
    passwordAgain: "",
    email: "",
    birthDate: "",
  });
  const onFormChange = (event) => {


    const inputValue = event.target.value;
    if (event.target.id === "userName") {
      setForm((prevState) => {
        return { ...prevState, userName: inputValue };
      });
    }

    if (event.target.id === "email") {
      setForm((prevState) => {
        return { ...prevState, email: inputValue };
      });
    }
    if (event.target.id === "password") {
      if (inputValue === formState.passwordAgain) {
        setErrorMessage((prevState) => {
          return { ...prevState, password: "" };
        });
      } else {
        setErrorMessage((prevState) => {
          return {
            ...prevState,
            password: "Passwords does not match!",
          };
        });
      }

      setForm((prevState) => {
        return { ...prevState, password: inputValue };
      });
    }
    if (event.target.id === "passwordAgain") {
      if (inputValue === formState.password) {
        setErrorMessage((prevState) => {
          return { ...prevState, password: "" };
        });
      } else {
        setErrorMessage((prevState) => {
          return {
            ...prevState,
            password: "Passwords does not match!",
          };
        });
      }
      setForm((prevState) => {
        return { ...prevState, passwordAgain: inputValue };
      });
    }

    if (event.target.id === "birthDate") {
      setForm((prevState) => {
        return { ...prevState, birthDate: inputValue };
      });
    }
  };

  const onSaveClick = (event) => {

    setIsPreloaderOpen(true);

    fetch(`${baseUrl}/api/User/SignUp`, {
      method: 'POST', // or 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(formState)
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
setModalState({isOpen:true,content:x.message,type:"success",okOnClick:()=> setModalState({isOpen:false})});

  }, x=> Promise.reject("Unknown Error Occured")
  
  ).catch(x=> {
debugger;
    setModalState({isOpen:true,content:x,type:"fail",okOnClick:()=> setModalState({isOpen:false})});

  }).finally( () =>setIsPreloaderOpen(false))
  };

  const onPasswordVisibleClick = (event) => {
    debugger;

    var passwordVisibleIcon = event.target;

    if (passwordVisibleIcon.id === "passwordVisibleIcon") {
      setPasswordsVisible((prevState) => {
        return { ...prevState, passwordVisible: !prevState.passwordVisible };
      });
    }

    if (passwordVisibleIcon.id === "passwordAgainVisibleIcon") {
      setPasswordsVisible((prevState) => {
        return {
          ...prevState,
          passwordAgainVisible: !prevState.passwordAgainVisible,
        };
      });
    }
  };

  return (
    <div className={`${bootstrap["clearfix"]}`}>  
      
      <Modal isOpen={modalState.isOpen} content={modalState.content} header={modalState.header}  type={modalState.type} okOnClick={modalState.okOnClick} negativeOnClick={modalState.negativeOnClick} positiveOnClick={modalState.positiveOnClick} />
    <Preloader isOpen={isPreloaderOpenState}/>
    <div className={`${bootstrap["col-md-4"]} ${bootstrap["clearfix"]}`} style={{float:"none",margin:"auto"}}>
<h2  className={`${bootstrap["form-group"]}`} style={{textAlign:"center"}}>SignUp</h2>

      <div className={`${bootstrap["clearfix"]} ${bootstrap["form-group"]}`}>
        <label className={`${bootstrap["col-md-4"]}`}>Username</label>
        <div className={`${bootstrap["col-md-8"]}`}>
          <input
            className={`${bootstrap["form-control"]}`}
            onChange={onFormChange}
            type="text"
            placeholder="Username"
            id="userName"
            value={formState.userName}
          />
        </div>
      </div>
      <div className={`${bootstrap["clearfix"]} ${bootstrap["form-group"]}`}>
        <label className={`${bootstrap["col-md-4"]} `}>E-Mail</label>
        <div className={`${bootstrap["col-md-8"]} `}>
          <input
            type="text"
            className={`${bootstrap["form-control"]} `}
            placeholder="e-mail"
            onChange={onFormChange}
            id="email"
            value={formState.email}
          />
        </div>
      </div>
      <div className={`${bootstrap["clearfix"]} ${bootstrap["form-group"]} `}>
        <label className={`${bootstrap["col-md-4"]} `}>Password</label>
        <div className={`${bootstrap["col-md-8"]} `}>
          <div style={{ display: "flex",marginBottom: "0.5rem" }}>
            <input
              type={passwordsVisible.passwordVisible ? "text" : "password"}
              style={{
                display: "flex",
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
              }}
              className={`${bootstrap["form-control"]} `}
              placeholder="Password"
              onChange={onFormChange}
              id="password"
              value={formState.password}
            />
            <div className={`${bootstrap["input-group-addon"]} `}style={{ display: "flex",justifyContent: "center",
    alignItems: "center"}}>
              <i
                id="passwordVisibleIcon"
                onClick={onPasswordVisibleClick}
                className={
                  passwordsVisible.passwordVisible
                  ? `${icons["fa"]} ${icons["fa-eye"]}`
                  : `${icons["fa"]} ${icons["fa-eye-slash"]}`
                }
                aria-hidden="true"
              ></i>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <input
              type={passwordsVisible.passwordAgainVisible ? "text" : "password"}
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
              className={`${bootstrap["form-control"]} `}
              placeholder="Password Again"
              onChange={onFormChange}
              id="passwordAgain"
              value={formState.passwordAgain}
            />
               <div className={`${bootstrap["input-group-addon"]} `} style={{ display: "flex",justifyContent: "center",
    alignItems: "center"}}>
            <i
              id="passwordAgainVisibleIcon"
              onClick={onPasswordVisibleClick}
              className={
                passwordsVisible.passwordAgainVisible
                ? `${icons["fa"]} ${icons["fa-eye"]}`
                : `${icons["fa"]} ${icons["fa-eye-slash"]}`
              }
              aria-hidden="true"
            ></i>
            </div>
          </div>
          <p style={{color:"#dc3545"}} id="passwordError">{errorMessageState.password}</p>
        </div>

      </div>

      <div className={`${bootstrap["clearfix"]} ${bootstrap["form-group"]} `}>
        <label className={`${bootstrap["col-md-4"]}  `}>Birthdate</label>
        <div className={`${bootstrap["col-md-8"]}  `}>
          <DatePicker
            showIcon
            className={`${bootstrap["form-control"]}  `}
            selected={formState.birthDate}
            onChange={(date) =>
              setForm((prevState) => {
                return { ...prevState, birthDate: date };
              })
            }
          />
        </div>
      </div>
      <button className={`${bootstrap["btn"]}  ${bootstrap["btn-primary"]} `}  onClick={onSaveClick}>SignUp</button>
    </div>
    </div>
  );
}

export default SignUp;
