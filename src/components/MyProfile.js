import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../actions/UserActions';
import { useHistory, useParams } from 'react-router-dom';
import FileBase from 'react-file-base64';
import '../assets/index.css';

export function MyProfile() {
  //const loggedUser = useSelector(state => state.UsersReducer.users); //! oldest
  //const [user,setUser] = useState(loggedUser); //! oldest
  //const token = JSON.parse(localStorage.getItem('profile')).token;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')).user); //! work  !!!

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [avatar, setAvatar] = useState('');

  //const { userId } = useParams();
  const userId = user._id;
  // console.log(userId);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(userId, user)).then(
      response => {
        console.log(`This is MyProfile response: ${response}`);
        if (response != undefined) {
          //setUser(response);
          // localStorage.setItem('profile',JSON.stringify({
          //   response
          // }))
        }
      }
    ).catch(error => {
      console.log(error);
    });
    history.push(`/${userId}/myProfile`);
  };

  return (
    <div id="myProfile">
      <div className='h2'>My Profile</div>
      <div className='formBody'>
        <div className='formAvatar'>
          <img src={user.avatar} alt="Avatar" className="avatar" />
          <div><FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setUser({ ...user, avatar: base64 })}
          //onDone={({ base64 }) => setAvatar(base64)}
          /></div>
        </div>
        <div>
          <form className='form'>
            <p>First Name</p>
            <input
              type='text'
              placeholder="firstName"
              defaultValue={user.firstName} // defaultValue={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            //onChange={(e) => setFirstName(e.target.value)}
            ></input>
            <p>Email</p>
            <input
              type='email'
              placeholder='.....@yahoo.com'
              defaultValue={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            //onChange={(e) => setUser({ setEmail: e.target.value })}
            //onChange={(e) => setEmail(e.target.value)}
            ></input>
            <p>Password</p>
            <input
              type='password'
              placeholder='******'
              defaultValue={user.password} //{12345}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            //onChange={(e) => setPassword(e.target.value)}
            ></input>
            <br /><br />
            <button className='greenBtn' onClick={handleSubmit}>UPDATE ACCOUNT</button>
          </form>
        </div>
        <div>
          <form className='form'>
            <p>Last Name</p>
            <input
              type='text'
              placeholder='Doo'
              defaultValue={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            //onChange={(e) => setLastName(e.target.value)}
            ></input>
            <p>Birthday</p>
            <input
              type='string'
              placeholder='YYYY-MM-DD'
              defaultValue={user.birthday}
              // .format('YYYY-MM-DD') 
              // yourDate.toISOString().split('T')[0]
              onChange={(e) => setUser({ ...user, birthday: e.target.value })}
            //onChange={(e) => setBirthday(e.target.value)}
            ></input>
            <p>Repeat Password</p>
            <input
              type='password'
              placeholder='*****'
              defaultValue={user.repeatPassword} //{12345}
              onChange={(e) => setUser({ ...user, repeatPassword: e.target.value })}
            //onChange={(e) => setRepeatPassword(e.target.value)}
            ></input>
          </form>
        </div>
      </div>
    </div >
  )
};