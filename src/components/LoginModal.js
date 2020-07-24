import React, { useState, useContext } from 'react'
import '../css/LoginModal.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import { UserContext, SecondaryNavContext } from '../AppContext'

const LoginModal = () => {

  const [ setUserLoggedIn, authedUser, setAuthedUser ] = useContext(UserContext)
  const [ selectedNav, setJobListVisible, setLogInVisible ] = useContext(SecondaryNavContext)

  if(authedUser) {
    // Do Nothing...
  }

  const [usernameVisible, setUsernameVisible] = useState(true)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [userFocus, setUserFocus] = useState(true)
  const [passFocus, setPassFocus] = useState(false)
  const [enteredUsername, setEnteredUsername] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [showNoUser, setShowNoUser] = useState(false)
  const [showNoPass, setShowNoPass] = useState(false)
  const [logInSuccess, setLogInSuccess] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState({})

  const users = [
    {
      name: 'David Edwards',
      username: 'daveMikeEdwards',
      email: 'dave.mike.edwards@gmail.com',
      password: 'madskills123',
      knownName: 'Dave',
      image: 'Dave.jpg',
      jobTags: ['React']
    },
    {
      name: 'Adam Sandler',
      username: 'happyGilmore',
      email: 'adam.sandler@gmail.com',
      password: 'bi6daddy',
      knownName: 'Adam',
      image: 'Adam.png',
      jobTags: ['React', 'MySQL']
    }
  ]

  const checkUsername = async () => {
    let userSearch = []

    users.forEach((user) => {
      if(user.username === enteredUsername) {
        userSearch.push(user)
      }
    })

    if(userSearch.length > 0) {
      setUsernameVisible(false)
      setPasswordVisible(true)
      setUserFocus(false)
      setPassFocus(true)
      setShowNoUser(false)
    } else {
      setShowNoUser(true)
    }
  }

  const checkPassword = async () => {
    let passSearch = []

    users.forEach((user) => {
      if(user.username === enteredUsername && user.password === enteredPassword) {
        passSearch.push(user)
        setLoggedInUser(user)
        setAuthedUser(user)
      }
    })

    if(passSearch.length > 0) {
      setShowNoPass(false)
      setPasswordVisible(false)
      setLogInSuccess(true)
      setUserLoggedIn(true)
    } else {
      setShowNoPass(true)
    }
  }

  const displayCorrectPortal = async () => {
    if(selectedNav === 'search') {
      setJobListVisible(true)
      setLogInVisible(false)
    } else if(selectedNav === 'post') {
      setLogInVisible(false)
    }
  }

  return (
    <div className='outerArea'>
      <div className='modalBox'>
        {logInSuccess && <div className='welcomeBlock'>
          <p>Welcome Back {loggedInUser.knownName}!</p>
          <img alt='User' src={require(`../images/${loggedInUser.image}`)} />
        </div>}
        {!logInSuccess && <div className='modalHeader'>
          <p>Login to your account</p>
        </div>}
        {showNoUser && <div className='modalUserError'>
          <p>No user found, try again or sign up.</p>
        </div>}
        {showNoPass && <div className='modalUserError'>
          <p>Incorrect password, please try again.</p>
        </div>}
        {usernameVisible && <div className='modalUsername'>
          <FontAwesomeIcon icon={faUser} className='usernameIcon' />
          <input onChange={e => {setEnteredUsername(e.target.value)}} autoFocus={userFocus} placeholder='Enter username' />
          <button onClick={checkUsername} className='usernameButton'>Continue</button>
        </div>}
        {passwordVisible && <div className='modalPassword'>
          <FontAwesomeIcon icon={faLock} className='passwordIcon' />
          <input onChange={e => {setEnteredPassword(e.target.value)}} autoFocus={passFocus} placeholder='Enter password' type='password' />
          <button onClick={checkPassword} className='passwordButton'>Log In</button>
        </div>}
        <hr />
        {!logInSuccess && <div className='createAccount'>
          <p>Don't have an account?</p>
          <button>Create Account</button>
        </div>}
        {logInSuccess && <div className='continueToPortal'>
          <button onClick={() => {displayCorrectPortal()}}>GO TO PORTAL</button>
        </div>}
      </div>
    </div>
  )
}

export default LoginModal