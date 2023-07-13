
import { useState, useEffect } from "react";
import Preloader from "../Preloader/Preloader";
import Modal from "../Modal/Modal";
import  bootstrap from '../../css/bootstrap.module.css';
import  icons from '../../css/icons.module.css';

function Login(props){

    const baseUrl = props.baseUrl;
    const [modalState, setModalState] = useState({isOpen:false,header:null,content:null,type:null,okOnClick:null,negativeOnClick:null,positiveOnClick:null});
  const setShouldGetAuthInfoCalledCounter = props.setShouldGetAuthInfoCalledCounter;
    const [startDate, setStartDate] = useState(new Date());
    const [isPreloaderOpenState, setIsPreloaderOpen] = useState(false);
    const [passwordsVisible, setPasswordsVisible] = useState({
      passwordVisible: false
    });
    const [errorMessageState, setErrorMessage] = useState({ password: "" });
    console.log("sate changed");
    const [formState, setForm] = useState({
      userName: "",
      password: ""
   
    });

    const onPasswordVisibleClick = (event) => {
        debugger;
    
        var passwordVisibleIcon = event.target;
    
        if (passwordVisibleIcon.id === "passwordVisibleIcon") {
          setPasswordsVisible((prevState) => {
            return { ...prevState, passwordVisible: !prevState.passwordVisible };
          });
        }
    
     
      };
    

    const onFormChange = (event) => {


        const inputValue = event.target.value;
        if (event.target.id === "userName") {
          setForm((prevState) => {
            return { ...prevState, userName: inputValue };
          });
        }
    
    
        if (event.target.id === "password") {         
          setForm((prevState) => {
            return { ...prevState, password: inputValue };
          });
        }
      
       
      };



      const onLoginClick = (event) => {

        setIsPreloaderOpen(true);
    
        fetch(`${baseUrl}/api/User/Login`, {
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
    setShouldGetAuthInfoCalledCounter(prevState => ++prevState)
    setModalState({isOpen:true,content:x.message,type:"success",okOnClick:()=> setModalState({isOpen:false})});
    
      }, x=> Promise.reject("Unknown Error Occured")
      
      ).catch(x=> {
    debugger;
        setModalState({isOpen:true,content:x,type:"fail",okOnClick:()=> setModalState({isOpen:false})});
    
      }).finally( () =>setIsPreloaderOpen(false))
      };
    


    return (
        <div className={`${bootstrap["clearfix"]}`}>  
          
          <Modal isOpen={modalState.isOpen} content={modalState.content} header={modalState.header}  type={modalState.type} okOnClick={modalState.okOnClick} negativeOnClick={modalState.negativeOnClick} positiveOnClick={modalState.positiveOnClick} />
        <Preloader isOpen={isPreloaderOpenState}/>
        <div className={`${bootstrap["col-md-4"]} ${bootstrap["clearfix"]}`} style={{float:"none",margin:"auto"}}>
    <h2  className={`${bootstrap["form-group"]}`} style={{textAlign:"center"}}>Login</h2>
    
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
     
          
            </div>
    
          </div>
    
   
          <button className={`${bootstrap["btn"]}  ${bootstrap["btn-primary"]} `}  onClick={onLoginClick}>Login</button>
        </div>
        </div>
      );


}


export default Login;