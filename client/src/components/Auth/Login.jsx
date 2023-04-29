import React, { useEffect, useState } from 'react'
import { addUser,LoginApi, LoginApiArtist, searchinArtist, searchinusers } from '../service/Api';
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useContext } from 'react';
import { AccountContext } from '../context/AccountProvider';
import Checkbox from '@mui/material/Checkbox';

const Login = ({notify}) => {
  const navigate = useNavigate();
  const [page, setpage] = useState('signup');
  const [loginasArtist,setloginasArtist] = useState(false)
  const { Account, setAccount,setisArtist } = useContext(AccountContext);

  let name, value
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setAccount({ ...Account, [name]: value });
  }
  const Postdata = async (e) => {
    e.preventDefault();
    const res = await addUser(Account)

    if (res) {
      if (res === 200) {
        notify("user logged in successfully");
        //navigate('/')

      } else {
        notify(res)
      }


    } else {
      notify("An unknown error occured")
    }

  }
  const LoginUserdata = async (e) => {
    e.preventDefault();
    const res = await LoginApi(Account)

    if (res) {
      if (res === 200) {
        notify("user logged in successfully");
        navigate('/')

      } else {
        notify(res)
      }


    } else {
      notify("An unknown error occured")
    }

  }
  const LoginArtistdata = async (e) => {
    e.preventDefault();
    const res = await LoginApiArtist(Account)


    if (res) {
      if (res === 200) {
        setisArtist(true)
        
        notify("user logged in successfully");
        navigate('/')

      } else {
        notify(res)
      }


    } else {
      notify("An unknown error occured")
    }

  }
  

  useEffect(() => {
    const check=async()=>{
      const res = localStorage.getItem("token");
      const store=  JSON.parse(res)

      const data = JSON.parse(localStorage.getItem("isArtist"));
     
      if(data===true)
      {
        const search = await searchinArtist(store);

        if(!search){
          navigate('/auth')
        }else{
          setAccount({name:store.name,email:store.email,password:store.password});
          setisArtist(true)
          navigate('/')

        }

      }else{
        const search =await  searchinusers(store);

        if(!search){
          navigate('/auth')
        }else{
          setAccount({name:store.name,email:store.email,password:store.password});
          navigate('/')
        }
      }


    }

    check();

  }, []);
  return (

    <section class="login">


      {page === 'signup' &&
        <>
          <div class="login_box">
            <div class="left">
              {/* <div class="top_link"><a href="#">Return home</a></div> */}
              <div class="contact">
                <form action="">
                  <h3>SIGN UP</h3>
                  <input type="text" value={Account.name} name="name"
                    onChange={handleInputs} placeholder="USERNAME" />
                  <input type="text" value={Account.email} name="email"
                    onChange={handleInputs} placeholder="Email" />
                  <input type="text" value={Account.password} name="password"
                    onChange={handleInputs} placeholder="PASSWORD" />
                  <button onClick={Postdata} class="submit">Sign Up</button>
                  <p class="signin">Already have an account? <span style={{cursor:'pointer',color:'black'}} onClick={() => setpage("signin")}>sign In</span></p>

                </form>

              </div>
            </div>
            <div class="right">
              <div class="right-text">
                <h2>Musica</h2>
                <h5>A Music WebApp</h5>
              </div>
              <div class="right-inductor"><img src="https://lh3.googleusercontent.com/fife/ABSRlIoGiXn2r0SBm7bjFHea6iCUOyY0N2SrvhNUT-orJfyGNRSMO2vfqar3R-xs5Z4xbeqYwrEMq2FXKGXm-l_H6QAlwCBk9uceKBfG-FjacfftM0WM_aoUC_oxRSXXYspQE3tCMHGvMBlb2K1NAdU6qWv3VAQAPdCo8VwTgdnyWv08CmeZ8hX_6Ty8FzetXYKnfXb0CTEFQOVF4p3R58LksVUd73FU6564OsrJt918LPEwqIPAPQ4dMgiH73sgLXnDndUDCdLSDHMSirr4uUaqbiWQq-X1SNdkh-3jzjhW4keeNt1TgQHSrzW3maYO3ryueQzYoMEhts8MP8HH5gs2NkCar9cr_guunglU7Zqaede4cLFhsCZWBLVHY4cKHgk8SzfH_0Rn3St2AQen9MaiT38L5QXsaq6zFMuGiT8M2Md50eS0JdRTdlWLJApbgAUqI3zltUXce-MaCrDtp_UiI6x3IR4fEZiCo0XDyoAesFjXZg9cIuSsLTiKkSAGzzledJU3crgSHjAIycQN2PH2_dBIa3ibAJLphqq6zLh0qiQn_dHh83ru2y7MgxRU85ithgjdIk3PgplREbW9_PLv5j9juYc1WXFNW9ML80UlTaC9D2rP3i80zESJJY56faKsA5GVCIFiUtc3EewSM_C0bkJSMiobIWiXFz7pMcadgZlweUdjBcjvaepHBe8wou0ZtDM9TKom0hs_nx_AKy0dnXGNWI1qftTjAg=w1920-h979-ft" alt="" /></div>
            </div>
          </div>
        </>}
        {page === 'signin' &&
        <>
          <div class="login_box">
            <div class="left">
              {/* <div class="top_link"><a href="#">Return home</a></div> */}
              <div class="contact">
                <form action="">
                  <h3>SIGN IN</h3>
                  <input type="text" value={Account.email} name="email"
                    onChange={handleInputs} placeholder="Email" />
                  <input type="text" value={Account.password} name="password"
                    onChange={handleInputs} placeholder="PASSWORD" />
                  <Checkbox onClick={()=>loginasArtist===false?setloginasArtist(true):setloginasArtist(false)}   checked={loginasArtist}  />Login as artist
                  <button onClick={loginasArtist===false ? LoginUserdata:LoginArtistdata} class="submit">Sign In</button>
                  <p  class="signin">Didn't have an account? <span style={{cursor:'pointer',color:'black'}} onClick={() => setpage("signup")}>sign up</span></p>                 
                </form>

              </div>
            </div>
            <div class="right">
              <div class="right-text">
                <h2>Musica</h2>
                <h5>A Music WebApp</h5>
              </div>
              <div class="right-inductor"><img src="https://lh3.googleusercontent.com/fife/ABSRlIoGiXn2r0SBm7bjFHea6iCUOyY0N2SrvhNUT-orJfyGNRSMO2vfqar3R-xs5Z4xbeqYwrEMq2FXKGXm-l_H6QAlwCBk9uceKBfG-FjacfftM0WM_aoUC_oxRSXXYspQE3tCMHGvMBlb2K1NAdU6qWv3VAQAPdCo8VwTgdnyWv08CmeZ8hX_6Ty8FzetXYKnfXb0CTEFQOVF4p3R58LksVUd73FU6564OsrJt918LPEwqIPAPQ4dMgiH73sgLXnDndUDCdLSDHMSirr4uUaqbiWQq-X1SNdkh-3jzjhW4keeNt1TgQHSrzW3maYO3ryueQzYoMEhts8MP8HH5gs2NkCar9cr_guunglU7Zqaede4cLFhsCZWBLVHY4cKHgk8SzfH_0Rn3St2AQen9MaiT38L5QXsaq6zFMuGiT8M2Md50eS0JdRTdlWLJApbgAUqI3zltUXce-MaCrDtp_UiI6x3IR4fEZiCo0XDyoAesFjXZg9cIuSsLTiKkSAGzzledJU3crgSHjAIycQN2PH2_dBIa3ibAJLphqq6zLh0qiQn_dHh83ru2y7MgxRU85ithgjdIk3PgplREbW9_PLv5j9juYc1WXFNW9ML80UlTaC9D2rP3i80zESJJY56faKsA5GVCIFiUtc3EewSM_C0bkJSMiobIWiXFz7pMcadgZlweUdjBcjvaepHBe8wou0ZtDM9TKom0hs_nx_AKy0dnXGNWI1qftTjAg=w1920-h979-ft" alt="" /></div>
            </div>
          </div>
        </>}

    </section>
  )
}

export default Login