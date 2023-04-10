import React from 'react'
import {useSelector} from "react-redux"
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
const UserProfile = () => {
    const user = useSelector((state)=> state.user?.user?.findUser)
    console.log('user', user)
  return (
    <>
      <Meta title={"User Profile"} />
      <BreadCrumb title="Profile" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="filter-card mb-3">
              <h1 className="filter-title">User Details</h1>
              <div>
                <ul className="ps-0 mt-2">
                  <li className='h6'>Name: <span className='ps-3'>{user?.firstName+" "+user?.lastName}</span></li>
                  <li className='h6'>Email: <span className='ps-3'>{user?.email}</span></li>
                  <li className='h6'>Mobile: <span className='ps-3'>{user?.mobile}</span></li>
                </ul>
              </div>
            </div>
           
          
          </div>
         
        </div>
      </Container>
    </>
  )
}

export default UserProfile