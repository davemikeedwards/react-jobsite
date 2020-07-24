import React, { Fragment, useState } from 'react'
import './App.css'
import HeaderRow from './components/HeaderRow'
import JobList from './components/JobList'
import LogInModal from './components/LoginModal'
import LandingPage from './components/LandingPage'
import UserProfile from './components/UserProfile'
import { NavContext, UserContext, SecondaryNavContext } from './AppContext'

const App = () => {

  const [jobListVisible, setJobListVisible] = useState(false)
  const [logInVisible, setLogInVisible] = useState(false)
  const [landingPageVisible, setLandingPageVisible] = useState(true)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [userProfileVisible, setUserProfileVisible] = useState(false)
  const [authedUser, setAuthedUser] = useState({})
  const [selectedNav, setSelectedNav] = useState('')

  return (
    <NavContext.Provider value={[ setJobListVisible, setLogInVisible, setLandingPageVisible, userLoggedIn, selectedNav, setSelectedNav, setUserProfileVisible ]}>
      <Fragment>
        <UserContext.Provider value={[ setUserLoggedIn, authedUser, setAuthedUser ]}>
          <HeaderRow />
          {landingPageVisible && <LandingPage />}
          <SecondaryNavContext.Provider value={[ selectedNav, setJobListVisible, setLogInVisible ]}>
            {logInVisible && <LogInModal />}
          </SecondaryNavContext.Provider>
          {jobListVisible && <JobList />}
          {userProfileVisible && <UserProfile />}
        </UserContext.Provider>
      </Fragment>
    </NavContext.Provider>
  )
}

export default App