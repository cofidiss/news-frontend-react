import * as React from 'react';
import {default  as MUAppBar }from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Preloader from "../Preloader/Preloader";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";
function AppBar(props) {
  const navigate = useNavigate();
  debugger;
  const baseUrl = props.baseUrl;
  const [modalState, setModalState] = React.useState({isOpen:false,header:null,content:null,type:null,okOnClick:null,negativeOnClick:null,positiveOnClick:null});
  const [isPreloaderOpenState, setIsPreloaderOpen] = React.useState(false);

    const shouldGetAuthInfoCalledCounter = props.shouldGetAuthInfoCalledCounter;
    
    const [authenticationPropState, setAuthenticationProp] = React.useState({isAuthenticated:false,initials:null});
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const getAuthInfo = () => {

   setIsPreloaderOpen(true);

    fetch(`${baseUrl}/api/User/GetAuthInfo`, {
      method: 'GET', // or 'PUT'
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
setAuthenticationProp({isAuthenticated:x.isAuthenticated,initials:x.initials});

  }, x=> Promise.reject("Unknown Error Occured")
  
  ).catch(x=> {
debugger;
    setModalState({isOpen:true,content:x,type:"fail",okOnClick:()=> setModalState({isOpen:false})});

  }).finally( () =>   setIsPreloaderOpen(false))
  };
  React.useEffect(  getAuthInfo,[shouldGetAuthInfoCalledCounter])

var onLogout =  (e)=> {

setIsPreloaderOpen(true);

fetch(`${baseUrl}/api/User/Logout`, {
  method: 'POST', // or 'PUT'
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


}, x=> Promise.reject("Unknown Error Occured")

).catch(x=> {
debugger;
setModalState({isOpen:true,content:x,type:"fail",okOnClick:()=> setModalState({isOpen:false})});

}).finally( () =>   {setIsPreloaderOpen(false);getAuthInfo();navigate("/");})

}  
const pages = ['Products', 'Pricing', 'Blog'];
const settings = [{name:'Logout',onClick:onLogout}];
  return (<div> 

     
<Modal isOpen={modalState.isOpen} content={modalState.content} header={modalState.header}  type={modalState.type} okOnClick={modalState.okOnClick} negativeOnClick={modalState.negativeOnClick} positiveOnClick={modalState.positiveOnClick} />
    <Preloader isOpen={isPreloaderOpenState}/>

    <MUAppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar >{authenticationPropState.initials}</Avatar>
                
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {authenticationPropState.isAuthenticated ?      <MenuItem key={"Logout"} onClick={onLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>:  <MenuItem key={"Login"} onClick={() => {navigate("/login");}}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>}
            
         
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </MUAppBar>  </div>
  );
}
export default AppBar;


