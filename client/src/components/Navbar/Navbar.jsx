import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import logo from '../../JSPICS/logo.gif'
import { Alert, Backdrop, Button, Drawer, IconButton, LinearProgress, Menu, MenuItem, Snackbar, Stack } from '@mui/material';
import GoogleLogin, { GoogleLogout } from 'react-google-login'
import { clientId } from '../constants/data'
import { useDispatch, useSelector } from 'react-redux'
import { authUser, cartQuant } from '../../actions/ActionIndex';
import { addUser, getCartItems, payNow, SetStockOfProduct } from '../../service/Api';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Aos from 'aos';
import EmojiEmotions from '@mui/icons-material/EmojiEmotions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import cart from '../../JSPICS/cart.jpg'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));
const Navbar = ({ cartitems, setstoringdivindex, open, setopen, message, handleAddItem, handleDecrease, handleclearcart, handledeleteItem }) => {
  const totalPrice = cartitems.reduce((price, item) => price + item.quantity * item.price, 0)
  const [categoriescolorchange, setcategoriescolorchange] = useState(0);


  const [openNavbar, setopenNavbar] = useState(true);
  const [AdminNavbar, setAdminNavbar] = useState(false);

  const navigate = useNavigate();
  const cartcount = useSelector((state) => state.CartQuantity)
  const myStatecartQuantity = useSelector((state) => state.CartQuantitystatechange)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open2 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const myState = useSelector((state) => state.AddUser);
  const onSignoutSuccess = () => {
    navigate('/login')
    console.clear();
    dispatch(authUser(''));
    localStorage.setItem('isloggedin', JSON.stringify(false))

  };
  const [Open, setOpen] = React.useState(true);
  const call2 = () => {
    setOpen(false)
  }
  const onLoginSuccess = async (res) => {
    dispatch(authUser(res.profileObj))
    await addUser(res.profileObj, call2);
  }
  const onLoginFailure = () => {
    console.log("login failed")
  }


  useEffect(() => {
    const total = async () => {
      const data = await getCartItems(`${myState.data.googleId}`);

      if (data) {
        dispatch(cartQuant(data.length))
      } else {
        dispatch(cartQuant(0));
      }

    }
    const checkuserloggedinornot = () => {
      const localdata = localStorage.getItem('isloggedin');

      if (JSON.parse(localdata) !== true) {
        setOpen(false)
      }
    }

    total();
    checkuserloggedinornot();


  }, [myStatecartQuantity.data, cartcount.data, dispatch, myState.data]);
  useEffect(() => {
    const checkisAdmin = () => {
      const path = window.location.pathname;
      if (path.includes('AdminDashboard')) {
        setopenNavbar(false)
        setAdminNavbar(true)
      } else {
        setopenNavbar(true)
        setAdminNavbar(false)
      }

    }
    checkisAdmin();
  }, [window.location.pathname]);
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const [state, setState] = React.useState({
    snackopen: false,
    vertical: 'bottom',
    horizontal: 'center',
  });


  const { vertical, horizontal } = state;
  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopen(false);
  };
  const [open3, setopen3] = useState('');
  const handleopen = () => {
    setopen3(true);
  }
  const handleclose = () => {
    setopen3(false);
  }
  const list = (anchor) => (
    <>
    {cartitems.length>0 && 
      <div style={{ height: '10vh', boxShadow: 'rgb(0 0 0 / 10%) 0px 1px 2px, rgb(0 0 0 / 8%) 10px 10px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '0', padding: '5px' }}><span style={{ cursor: 'pointer' }} onClick={handleclose}><ArrowBackIcon /></span> <span style={{ fontWeight: 'bold', fontFamily: 'system-ui' }}> CART</span> <span>{cartitems.length} items</span> </div>}
      {cartitems.length === 0 && <>
            <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{ height: '10vh', boxShadow: 'rgb(0 0 0 / 10%) 0px 1px 2px, rgb(0 0 0 / 8%) 10px 10px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '0', padding: '5px' }}><span style={{ cursor: 'pointer' }} onClick={handleclose}><ArrowBackIcon /></span> <span style={{ fontWeight: 'bold', fontFamily: 'system-ui' }}> Your cart is empty</span></div>
              <img alt="" style={{ height: '90vh', width: '30vw' }} src={cart}></img>

              <Button sx={{ position: 'sticky', bottom: '0',backgroundColor:'green',borderRadius:'0' }}
                variant="contained"
                onClick={() => {navigate('/');handleclose()}}>
                Shop Now</Button>
                </div>
          </>}
      <div style={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, width: '32vw', overflowX: 'hidden' }}>

        <div style={{ display: 'flex' }}>


          <div className='Main_cart_div'>



            {
              cartitems.map((item) => {

                return (

                  <div key={item.id} className='Data_Cart'  >

                    <div style={{ width: '30%', height: '100%' }}>
                      <img src={item.images} alt="LOADING" className='Cart_image' ></img>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', padding: '0 8%', width: '50%' }}>
                      <div style={{ fontSize: 'calc(0.9vw + 1vh )', textTransform: 'capitalize', fontWeight: '600' }}> {item.color} {item.type} </div>
                      <div
                        style={{ fontSize: 'calc(0.8vw + 1vh )', cursor: 'pointer' }}><span><CurrencyRupeeIcon sx={{ height: '3vh' }} /></span>{item.quantity * item.price} </div>
                      <div style={{ display: 'flex', fontSize: 'calc(1vw + 1vh )' }}>
                        <div style={{ marginLeft: '-1.4vw' }}>
                          <Button onClick={() => handleDecrease(item)} className='incdecbutton_cart '><Remove Add sx={{ color: 'gray', height: '3vh' }} /></Button></div>
                        <div style={{ fontSize: 'calc(1vw + 0.6vh )' }} >{item.quantity}</div>
                        <div > <Button onClick={() => handleAddItem(item)} className='incdecbutton_cart '><Add sx={{ color: 'gray', height: '3vh' }} /></Button></div>


                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div onClick={() => handledeleteItem(item)}
                        style={{ fontSize: 'calc(1vw + 1vh )', cursor: 'pointer', textAlign: 'center', fontWeight: 'bolder' }}>
                        <DeleteOutline sx={{ color: 'gray', height: '4vh' }} /> </div>


                    </div>


                  </div>
                )
              })

            }
            {cartitems.length > 0 &&
              <>
                <div className='Data_Cart' style={{ display: 'flex', flexDirection: 'column', padding: '10px' }}  >
                  <div style={{ fontSize: 'calc(0.8vw + 1vh )', fontWeight: '500', marginBottom: '2vh' }}>Price Details</div>
                  <div style={{ fontSize: 'calc(0.7vw + 1vh )', fontWeight: '400' }}>Cart MRP: <span><CurrencyRupeeIcon sx={{ height: '3vh' }} /></span>{totalPrice}</div>
                  <div style={{ fontSize: 'calc(0.7vw + 1vh )', fontWeight: '400' }}>Shipping: <span style={{ textDecoration: 'line-through' }}><CurrencyRupeeIcon sx={{ height: '3vh' }} />50</span> <span style={{ color: 'green' }}>FREE</span></div>
                  <div style={{ fontSize: 'calc(0.8vw + 1vh )', fontWeight: '500', marginTop: '2vh' }}>You Pay: <span><CurrencyRupeeIcon sx={{ height: '3vh' }} /></span>{totalPrice}</div>
                </div>
              </>
            }
          </div>

        </div>



      </div>
      {cartitems.length > 0 &&
        <div style={{ boxShadow: '0px 10px 5px #888, 0px -1px 5px #888', padding: '10px', height: '10vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', bottom: '0' }}>
          <div > Total amount : {totalPrice}Rs</div>
          <div>
            <Button
              variant="contained" color="success"
              onClick={() => { payNow(totalPrice, () => SetStockOfProduct(myState.data.googleId, cartitems, handleclearcart), myState.data.name, myState.data.googleId, cartitems) }}>
              Proceed payment</Button></div>
        </div>
      }
    </>
  );
 
  return (
    <>
      <div>
        {['right'].map((anchor) => (
          <>


            <Drawer
              open={open3}
              anchor={anchor}
              onClose={handleclose}
            >
              {list(anchor)}
            </Drawer>
          </>
        ))}
      </div>
      <Snackbar open={open} anchorOrigin={{ vertical, horizontal }} autoHideDuration={2000} onClose={handleClose1}>
        <Alert onClose={handleClose1} severity="info" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{
          color: 'black'
          , backgroundColor: ' #f2f2f0', zIndex: (theme) => theme.zIndex.drawer + 1
        }}
        open={Open}

      >
        <div style={{ height: '0px', width: '0px', visibility: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <GoogleLogin
            clientId={clientId} buttonText="Continue With Google" isSignedIn={true} onSuccess={onLoginSuccess} onFailure={onLoginFailure}
            cookiePolicy={'single_host_origin'} />

        </div>


        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>

            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
          </Stack>

          <span className='Auth_loading_text'>JS</span>

          <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>

            <LinearProgress color="inherit" />
            <LinearProgress color="inherit" />
          </Stack>
        </div>

      </Backdrop>
      {openNavbar &&
        <>

          <div className='Navbar_div'>


            <NavLink to="/" className='Navbar_Navlinks_Div'> JS</NavLink>
            <div onClick={() => setstoringdivindex(-1)}>
              <NavLink to="/category/shirt/10000" className='Navbar_Navlinks_Div' >
                Shirt
              </NavLink></div>
            <div onClick={() => setstoringdivindex(-1)}>
              <NavLink to="/category/lower/10000" className='Navbar_Navlinks_Div'>
                Lower
              </NavLink></div>
            <div onClick={() => setstoringdivindex(-1)}>
              <NavLink to="/category/tshirt/10000" className='Navbar_Navlinks_Div'>
                T-shirts
              </NavLink></div>
            <div>
              <NavLink to="/Contact" className='Navbar_Navlinks_Div'>
                Contact us
              </NavLink></div>
            <div style={{
              display:
                `${myState && myState.data && myState.data.email === ('sa873463@gmail.com' || 'kvipen164@gmail.com') ? '' : 'none'}`
            }} >

              <NavLink to="/AdminDashboard/AddItem" className='Navbar_Navlinks_Div'>
                AdminDashboard
              </NavLink>

            </div>

            <div className='Navbar_Navlinks_Menu'>

              <Button
                id="basic-button"
                aria-controls={open2 ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open2 ? 'true' : undefined}
                onClick={handleClick}
              >
                <AccountBoxIcon style={{ color: 'white' }} />
              </Button>
              <Button onClick={() => handleopen()} className=''>

                <IconButton sx={{ color: 'white' }} className='Navbar_cart_icon' aria-label="cart">
                  <StyledBadge color='secondary' badgeContent={cartitems && cartitems.length} >
                    <ShoppingCartIcon />
                  </StyledBadge>
                </IconButton>

              </Button>
              <Menu
                id="basic-menu"

                anchorEl={anchorEl}
                open={open2}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {myState && myState.data ? <><NavLink to='/profile' className="AccountLinks"><MenuItem onClick={handleClose}>{myState.data.name}</MenuItem></NavLink>
                  <NavLink to={`/order/${myState.data.googleId}`} className="AccountLinks"><MenuItem onClick={handleClose}>Your orders</MenuItem></NavLink>
                  <NavLink to='/Profile' className="AccountLinks" ><MenuItem onClick={handleClose}>Profile</MenuItem></NavLink>
                  <NavLink to='/login' className="AccountLinks" >
                    <MenuItem onClick={handleClose}>

                      <GoogleLogout className="brand"
                        clientId={clientId}
                        buttonText="Logout"
                        style={{ visibility: 'hidden' }}
                        onLogoutSuccess={onSignoutSuccess}
                      ></GoogleLogout>


                    </MenuItem></NavLink></>
                  :
                  <NavLink to='/login' className="AccountLinks"><MenuItem style={{ height: '10vh' }} onClick={handleClose}>Log in</MenuItem></NavLink>}


              </Menu>
              <div style={{ height: '0px', width: '0px', visibility: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <GoogleLogin
                  clientId={clientId} buttonText="Continue With Google" isSignedIn={true} onSuccess={onLoginSuccess} onFailure={onLoginFailure}
                  cookiePolicy={'single_host_origin'} />

              </div>
            </div>


          </div>
        </>
      }
      {AdminNavbar &&
        <div className='Navbar_div_Admin'>

          <div className='Navbar_Navlinks_Menu'>
            <div style={{

              backgroundColor: '#1B2F3D', height: '10vh', display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', color: 'whitesmoke'
            }}>
              <EmojiEmotions />
              <div>AdminDashboard</div>
            </div>

            <div style={{ height: '0px', width: '0px', visibility: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <GoogleLogin
                clientId={clientId} buttonText="Continue With Google" isSignedIn={true} onSuccess={onLoginSuccess} onFailure={onLoginFailure}
                cookiePolicy={'single_host_origin'} />

            </div>
          </div>


        </div>
      }
    </>
  )
};

export default Navbar;
