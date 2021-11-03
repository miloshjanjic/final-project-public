import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LOGOUT } from '../constants/UserConstants';
// import decode from 'jwt-decode';

export function Header() {

  // const loggedUser = useSelector(state => state.UsersReducer.users)
  // const userId = loggedUser._id;

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  //console.log(`Navigation user: ${user}`);

  const logout = () => {
    dispatch({ type: LOGOUT });

    history.push('/login');
    setUser(null);
  };

  async function setUserForHeader() {
    setUser(JSON.parse(localStorage.getItem('profile')))
  };


  useEffect(async () => {
    console.log("user changed")
    await setUserForHeader();
  }, []);


  return (
    <header className='header'>
      <button className='headerLogo'>
        <Link to='/' className='headerLink' id='homeBtn'>___________________</Link>
      </button>
      <ul>
        <li className='headerNav'>
          <Link to='/breakfast' className='headerLink'>BREAKFAST</Link>
        </li>
        <span className='headerOr'>o</span>
        <li className='headerNav'>
          <Link to='/brunch' className='headerLink'>BRUNCH</Link>
        </li>
        <span className='headerOr'>o</span>
        <li className='headerNav'>
          <Link to='/lunch' className='headerLink'>LUNCH</Link>
        </li>
        <span className='headerOr'>o</span>
        <li className='headerNav'>
          <Link to='/dinner' className='headerLink'>DINNER</Link>
        </li>
      </ul>

      {user ?
        <div>
          <button className='loginBtn'>
            <Link to='/recipes' className='headerLink'>MY RECIPES</Link>
          </button>
          <span className='headerOr'>or</span>
           <button className='registerBtn'>
            <Link to={"/" + user.user._id + "/myProfile"} className='headerLink'>MY PROFILE</Link>
          </button>
          <button className='registerBtn' onClick={logout}>LOGOUT
            {/* <Link to='/login' className='headerLink'></Link> */}
          </button>
        </div> :
        <div>
          <button className='registerBtn'>
            <Link to='/register' className='headerLink'>REGISTER</Link>
          </button>
          <button className='loginBtn'>
            <Link to='/login' className='headerLink'>LOG IN</Link>
          </button>
        </div>
      }

      {/* <button className='loginBtn'>
        <Link to='/recipes' className='headerLink'>MY RECIPES</Link>
      </button>
      <span className='headerOr'>or</span>
      <button className='registerBtn'>
        <Link to='/:userId/myProfile' className='headerLink'>MY PROFILE</Link>
      </button>
      <button className='registerBtn'>
        <Link to='/register' className='headerLink'>REGISTER</Link>
      </button>
      <button className='loginBtn'>
        <Link to='/login' className='headerLink'>LOG IN</Link>
      </button> */}


      {/* {(!userId) ?
        <button className='loginBtn'><Link to='/login' className='headerLink'>LOG IN</Link></button> :
        <button className='loginBtn'><Link to='/:userId/myProfile' className='headerLink'>MY PROFILE</Link></button>}
      <span className='headerOr'>or</span>
      {(!userId) ?
        <button className='registerBtn'><Link to='/register' className='headerLink'>REGISTER</Link></button> :
        <button className='loginBtn'><Link to='/recipes' className='headerLink'>MY RECIPES</Link></button>} */}

    </header>
  )
};