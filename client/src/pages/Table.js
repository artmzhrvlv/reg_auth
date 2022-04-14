import { observer } from 'mobx-react-lite';
import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom"
import Container from "react-bootstrap/Container";
import {Context} from "../index";
import {Button} from "react-bootstrap";
//import {LOGIN_ROUTE} from "../utils/consts";
import { getAllUsers, removeUser } from '../http/userAPI';
import { LOGIN_ROUTE} from '../utils/consts';


const Table = observer(() => {
  const {user} = useContext(Context)
  const navigateExit = useNavigate()
  const [ users, setUsers ] = useState([]);


  const handleRemoveUser = async (userId) => {
    try {
      let data;
        data = await removeUser(userId)
        console.log(data,'was successfully deleted')
        getUsersInfo()
      }
     catch (e) {
      alert(e.response.data.message)
    }
  }
  
  
  const getUsersInfo = async () => {
    try {
      let data;
        data = await getAllUsers()
        setUsers(data);
      }
     catch (e) {
      alert(e.response.data.message)
    }
  }


  useEffect(() => {
    getUsersInfo()
  }, [])
  

  const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
      localStorage.clear()
      navigateExit(LOGIN_ROUTE)
  }
  return (
    <Container>  
        <table className='table'>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Delete</th>
            <th scope="col">CreateAt</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user) => (
            <tr key={user.id}>
    
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button 
                type="button"
                className="btn btn-info"
                onClick={() => handleRemoveUser(user.id)}
                
                >
                  Delete
                </Button>
              </td>
              <td>{user.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
       type="button"
       className="btn btn-danger "
       onClick={() => logOut()}
        >
        Выйти
        </button>         
    </Container>
  )
});

export default Table;
