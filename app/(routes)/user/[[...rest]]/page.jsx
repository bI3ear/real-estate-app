"use client"
import { UserButton, UserProfile } from '@clerk/nextjs'
import { Building2 } from 'lucide-react'
import React from 'react'
import UserListing from '../_components/UserListing'


function User() {
  return (
    <div className='mt-10 md:mx-30 lg:mx-125'>
        <UserProfile>
            <UserButton.UserProfilePage label='My Listing' labelIcon={<Building2 className='h-5 w-5'/>} url="my-listing">
                <UserListing/>
            </UserButton.UserProfilePage>
        </UserProfile> 
    </div>
  )
}

export default User