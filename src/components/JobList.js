import React, { useState, useContext, Fragment } from 'react'
import '../css/JobList.css'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../AppContext'

const JobList = () => {

  const [matchPersonalCriteria, setMatchPersonalCriteria] = useState({text: 'OFF', value: false, border: '1px solid rgba(67, 185, 102, 1)', backgroundColor: 'rgba(67, 185, 102, 0.5)'})
  const [ setUserLoggedIn, authedUser, setAuthedUser ] = useContext(UserContext)

  const [walesVisible, setWalesVisible] = useState(false)
  const [englandVisible, setEnglandVisible] = useState(false)
  const [scotlandVisible, setScotlandVisible] = useState(false)
  const [regionFilters, setRegionFilters] = useState([
    {
      name: 'London',
      checked: true,
      country: 'England'
    },
    {
      name: 'North East',
      checked: true,
      country: 'England'
    },
    {
      name: 'North West',
      checked: true,
      country: 'England'
    },
    {
      name: 'Yorkshire & The Humber',
      checked: true,
      country: 'England'
    },
    {
      name: 'East Midlands',
      checked: true,
      country: 'England'
    },
    {
      name: 'West Midlands',
      checked: true,
      country: 'England'
    },
    {
      name: 'East of England',
      checked: true,
      country: 'England'
    },
    {
      name: 'South East',
      checked: true,
      country: 'England'
    },
    {
      name: 'South West',
      checked: true,
      country: 'England'
    },
    {
      name: 'Highlands & Islands',
      checked: true,
      country: 'Scotland'
    },
    {
      name: 'Grampian',
      checked: true,
      country: 'Scotland'
    },
    {
      name: 'Central',
      checked: true,
      country: 'Scotland'
    },
    {
      name: 'Strathclyde',
      checked: true,
      country: 'Scotland'
    },
    {
      name: 'Lothian',
      checked: true,
      country: 'Scotland'
    },
    {
      name: 'Borders',
      checked: true,
      country: 'Scotland'
    },
    {
      name: 'Dumfires & Galloway',
      checked: true,
      country: 'Scotland'
    },
    {
      name: 'North Wales',
      checked: true,
      country: 'Wales'
    },
    {
      name: 'Mid Wales',
      checked: true,
      country: 'Wales'
    },
    {
      name: 'West Wales',
      checked: true,
      country: 'Wales'
    },
    {
      name: 'South Wales',
      checked: true,
      country: 'Wales'
    }
  ])

  if(1 + 1 === 0){
    setUserLoggedIn(false)
    setAuthedUser({})
  }

  const tags = [
    {
      name: 'React Developer', 
      skills: ['React', 'MongoDB', 'Jest'],
      region: 'London',
      country: 'England',
      description: 'React developer needed in a NoSQL environment, testing skills essential (Preferably using Jest). Some knowledge of MongoDB would be desirable - but not essential.'
    },
    {
      name: 'Vue Developer', 
      skills: ['Vue', 'VueX', 'CSS', 'MySQL', '.Net Core', 'Docker'], 
      region: 'North West',
      country: 'England',
      description: 'Vue developer with strong CSS skills and a firm understanding of VueX is required. .Net Core and Docker are desirables for this role.'
    }
  ]

  const [filteredTags, setFilteredTags] = useState(tags)

  const togglePersonalCriteria = async () => {
    if(matchPersonalCriteria.value) {
      setMatchPersonalCriteria({text: 'OFF', value: false, border: '1px solid rgba(67, 185, 102, 1)', backgroundColor: 'rgba(67, 185, 102, 0.5)'})
      setFilteredTags(tags)
    } else {
      setMatchPersonalCriteria({text: 'ON', value: true, border: '1px solid rgba(67, 185, 102, 0.25)', backgroundColor: 'rgba(67, 185, 102, 0.75)'})
      let matchedAds = []

      authedUser.jobTags.forEach((tag) => {
        for(let i = 0; i < tags.length; i++) {
          tags[i].skills.forEach((adTags) => {
            if(tag === adTags) {
              matchedAds.push(tags[i])
            }
          })
        }
      })
  
      setFilteredTags(matchedAds)
    }
  }

  const checkRegionAdMatches = async () => {
    let matchedAds = []

    for(let i = 0; i < regionFilters.length; i++) {
      if(regionFilters[i].checked){
        tags.forEach((adTags) => {
          if(regionFilters[i].name === adTags.region) {
            matchedAds.push(adTags)
          }
        })
      }
    }
  
    setFilteredTags(matchedAds)
  }

  const toggleRegion = async (region) => {
    let newRegions = [regionFilters]
    let updatedRegions = []
    debugger

    newRegions.forEach((reg) => {
      for(let i = 0; i < regionFilters.length; i++) {
        if(region === reg[i].name) {
          if(reg[i].checked) {
            reg[i].checked = false
          } else {
            reg[i].checked = true
          }
        }
        updatedRegions.push(reg[i])
      }
    })

    setRegionFilters(updatedRegions)
    checkRegionAdMatches()
  }

  return (
    <div className='jobList'>
      <div className='jobFilter'>
        <h1>Filter Results</h1>
        <div className='filterOptions'>
          <p>Match personal criteria</p>
          <div style={{ border: matchPersonalCriteria.border, backgroundColor: matchPersonalCriteria.backgroundColor }} onClick={() => {togglePersonalCriteria()}} className='toggle'>
            <p>{matchPersonalCriteria.text}</p>
          </div>
          <p>Region filter</p>
          <div className='regionFilter'>
            <p className='countrySelector'>England</p>
            <FontAwesomeIcon className='dropIcon' onClick={() => {if(englandVisible){setEnglandVisible(false)}else{setEnglandVisible(true)}}} icon={faSortDown} />
            {regionFilters && englandVisible && _.map(regionFilters, (region) => {
              if(region.country === 'England') {
                return (
                  <Fragment>
                    <p>{region.name}</p>
                    <div onClick={() => {toggleRegion(region.name)}} className='checkBox'>
                      {region.checked && <p>&#10004;</p>}
                    </div>
                  </Fragment>
                )
              }
            })}
            <p className='countrySelector'>Scotland</p>
            <FontAwesomeIcon className='dropIcon' onClick={() => {if(scotlandVisible){setScotlandVisible(false)}else{setScotlandVisible(true)}}} icon={faSortDown} />
            {regionFilters && scotlandVisible && _.map(regionFilters, (region) => {
              if(region.country === 'Scotland') {
                return (
                  <Fragment>
                    <p>{region.name}</p>
                    <div onClick={() => {toggleRegion(region.name)}} className='checkBox'>
                      {region.checked && <p>&#10004;</p>}
                    </div>
                  </Fragment>
                )
              }
            })}
            <p className='countrySelector'>Wales</p>
            <FontAwesomeIcon className='dropIcon' onClick={() => {if(walesVisible){setWalesVisible(false)}else{setWalesVisible(true)}}} icon={faSortDown} />
            {regionFilters && walesVisible && _.map(regionFilters, (region) => {
              if(region.country === 'Wales') {
                return (
                  <Fragment>
                    <p>{region.name}</p>
                    <div onClick={() => {toggleRegion(region.name)}} className='checkBox'>
                      {region.checked && <p>&#10004;</p>}
                    </div>
                  </Fragment>
                )
              }
            })}
          </div>
        </div>
      </div>
      <div className='jobListing'>
        <div className='header'>
          <h1>Current Jobs</h1>
        </div>
        <div className='jobListGrid'>
          {filteredTags && _.map(filteredTags, (tag) => {
            return (
              <div className='jobCard'>
                <p>{tag.name}</p>
                <p>{tag.region}, {tag.country}</p>
                <p>{tag.description}</p>
                <div className='tagGrid'>
                  {tag.skills.map((tagNames) => {
                    return (
                      <div className='tagName'>{tagNames}</div>
                    )
                  })}
                </div>
              </div>
            )
          })}
          {(filteredTags.length < 1) && <div className='noJobs'>
            <p>Sorry, no job listings matched your search criteria.</p>
          </div>}
        </div>
      </div>
    </div>
  )
}

export default JobList