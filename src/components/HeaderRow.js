import React, { useContext, Fragment, useState } from 'react'
import '../css/HeaderRow.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { NavContext, UserContext } from '../AppContext'

const HeaderRow = () => {

  const [ setJobListVisible, setLogInVisible, setLandingPageVisible, userLoggedIn, selectedNav, setSelectedNav, setUserProfileVisible ] = useContext(NavContext)
  const [ setUserLoggedIn, authedUser, setAuthedUser ] = useContext(UserContext)

  const [userClicked, setUserClicked] = useState(false)

  if(selectedNav) {
    // Do Nothing...
  }

  if(1 + 1 === 0){
    setUserLoggedIn(false)
    setAuthedUser({})
  }

  const checkForUser = async (props) => {
    setLandingPageVisible(false)
    if(userLoggedIn) {
      if(props === 'search') {
        setJobListVisible(true)
        setLogInVisible(false)
        setSelectedNav('search')
      } else if(props === 'post') {
        setLogInVisible(false)
        setJobListVisible(false)
        setSelectedNav('post')
      }
    } else {
      if(props === 'search') {
        setSelectedNav('search')
      } else if(props === 'post') {
        setSelectedNav('post')
      }
      setLogInVisible(true)
    }
  }

  return (
    <Fragment>
      <div className='headerRow'>
        <div className='headerTitle'>
          <p>React JobSite</p>
          <p>by Dave Edwards</p>
        </div>
        <div className='userOptions'>
          {userLoggedIn && <div className='userDetails'>
            <p onClick={() => {if(userClicked){setUserClicked(false)}else{setUserClicked(true)}}}>{authedUser.name.toUpperCase()}</p>
            <img onClick={() => {if(userClicked){setUserClicked(false)}else{setUserClicked(true)}}} alt='User' src={require(`../images/${authedUser.image}`)} />
          </div>}
          {!userLoggedIn && <p onClick={() => checkForUser('search')}>LOOK FOR WORK</p>}
          {!userLoggedIn && <p onClick={() => checkForUser('post')}>POST A JOB</p>}
        </div>
      </div>
      {userClicked && <Fragment>
        <div className='userDropdown'>
          <div className='dropdownMenu'>
            <FontAwesomeIcon className='dropdownIcon' icon={faUserCog} /><p onClick={() => {setUserClicked(false); setLandingPageVisible(false); setJobListVisible(false); setUserProfileVisible(true)}}p>EDIT PROFILE</p>
            <FontAwesomeIcon className='dropdownIcon' icon={faSignOutAlt} /><p onClick={() => {setUserLoggedIn(false); setUserClicked(false); setLandingPageVisible(true); setJobListVisible(false); setUserProfileVisible(false)}}>LOG OUT</p>
          </div>
        </div>
        <div className='dropdownPointer'></div>
      </Fragment>}
    </Fragment>
  )
}

export default HeaderRow