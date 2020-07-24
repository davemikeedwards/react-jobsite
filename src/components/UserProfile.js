import React, { useContext, useState } from 'react'
import '../css/UserProfile.css'
import { UserContext } from '../AppContext'

const UserProfile = () => {
  const [ setUserLoggedIn, authedUser, setAuthedUser ] = useContext(UserContext)

  const [enteredTag, setEnteredTag] = useState('')

  if(1 + 1 === 3) {
    setUserLoggedIn(false)
  }

  const addNewTag = async () => {
    let newUserDetails = authedUser
    newUserDetails.jobTags.push(enteredTag)
    setAuthedUser(newUserDetails)

    let input = document.getElementById('addedTag')
    input.value = ''
    setEnteredTag('')
  }

  return (
    <div className='userPanel'>
      <div>
        <p>Welcome back, {authedUser.knownName}!</p>
      </div>
      <div className='contentArea'>
        <div className='contentTitle'>
          <p>Personal Information</p>
        </div>
        <div className='contentDetails'>
          <p>Name:</p>
          <p>{authedUser.name}</p>
          <p>Email:</p>
          <p>{authedUser.email}</p>
          <p>Known Name:</p> 
          <p>{authedUser.knownName}</p>
          <button>Edit</button>
        </div>
      </div>
      <div className='contentArea'>
        <div className='contentTitle'>
          <p>Job Search Criteria</p>
        </div>
        <div className='currentTags'>
          <p>Current Skill Tags</p>
          <div className='tagGrid'>
            {authedUser && authedUser.jobTags.map((tagNames) => {
                return (
                  <div className='tagName'>{tagNames}</div>
                )
              })}
          </div>
        </div>
        <div className='addTags'>
          <p>Add Tags</p>
          <input id='addedTag' onChange={e => {setEnteredTag(e.target.value)}} placeholder='eg. HTML' />
          <button onClick={() => {addNewTag()}}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile