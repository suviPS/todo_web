import React, {useState} from "react";
import { showRegisterFun, showLoginFun, apiRegister, apiLogin } from "./authSlice";
import { useSelector, useDispatch } from "react-redux";
import './Auth.css';

export function Auth() {
  const showRegister = useSelector((state) => state.auth.showRegister)
  const showLogin = useSelector((state) => state.auth.showLogin)
  const statusMessage = useSelector((state) => state.auth.statusMessage)
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = (e) => {
    e.preventDefault()
    dispatch(apiRegister({ email: email, password: password }))
  }
  const login = (e) => {
    e.preventDefault()
    dispatch(apiLogin({ email: email, password: password }))
  }

  let content = 
    <div>
      <h2>Kreirajte nalog i ulogujte se da bi pristupili aplikaciji!</h2>
      <div className="navigationButtons">
        <button className="button" onClick={() => dispatch(showRegisterFun())} >Registracija</button>
        <button className="button" onClick={() => dispatch(showLoginFun())} >Prijava</button>
      </div>
    </div>

  if(showRegister && !showLogin){
    content = 
      <div className="authContainer">
        <h2>Kreirajte nalog:</h2>
        <form className="authForm">
          <div className="inputWrapper">
            <label className="label" htmlFor="email">Email:</label>
            <input className="input" type="email" onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="inputWrapper">
            <label className="label" htmlFor="password">Lozinka:</label>
            <input className="input" type="password" onChange={(event) => setPassword(event.target.value)} />
          </div>
          <button className="button" onClick={ (event) =>  register(event) }>Registracija</button>
        </form>

        <br/>
        <p>{statusMessage}</p>
    </div>
  } else if(!showRegister && showLogin){
    content = 
      <div className="authContainer">
        <h2>Ulogujte se:</h2>
        <form className="authForm">
          <div className="inputWrapper">
            <label className="label" htmlFor="email">Email:</label>
            <input className="input" type="email" onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="inputWrapper">
            <label className="label" htmlFor="password">Lozinka:</label>
            <input className="input" type="password" onChange={(event) => setPassword(event.target.value)} />
          </div>
          <button className="button" onClick={ (event) =>  login(event) }>Login</button>
        </form>

        <br/>
        <p>{statusMessage}</p>
    </div>
  }

  return (
  <React.Fragment>
    {content}
  </React.Fragment>)
}