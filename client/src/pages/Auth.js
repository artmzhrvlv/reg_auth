import React, {useContext, useState} from 'react';
import {Card, Container, Button, Form, Row} from "react-bootstrap"
import {NavLink, useLocation, useNavigate} from "react-router-dom"
import { login, registration } from '../http/userAPI';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, TABLE_ROUTE} from '../utils/consts';
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {
  const {user} = useContext(Context)
  const location = useLocation()
  const navigate = useNavigate()
  const isLogin= location.pathname === LOGIN_ROUTE
  console.log(location)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const click = async () => {
    try {
      let data;
      if (isLogin){
        data = await login(email,password)
        console.log(data)
      } else {
        data = await registration(name,email,password)
        console.log(data)

      }
  
      user.setUser(user)
      user.setIsAuth(true)
      navigate(TABLE_ROUTE)
    } catch (e) {
      alert(e.response.data.message)
    }


  }

  return (
    <Container 
      className="d-flex justify-content-center align-items-center"
      style={{height: window.innerHeight - 104}}
    >
      <Card style={{width:600}} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация':'Регистрация'}</h2>
        <Form className="d-flex flex-column">
        {isLogin ? "" :
          <Form.Control 
            className="m-3"
            placeholder='Введите ваше имя: '
            value={name}
            onChange={e => setName(e.target.value)}
          />
  }
          <Form.Control 
            className="m-3"
            placeholder='Введите ваш email: '
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Form.Control 
            className="m-3"
            placeholder='Введите ваш пароль: '
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
           <Row className="d-flex justify-content-between m-auto ">
           <Button  variant={"outline-success"} 
             onClick={click}
           >
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
             {isLogin ? 
              <div className="m-2">
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся</NavLink>
              </div>
              :
              <div className="m-2">
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
              </div>
              } 
            </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
