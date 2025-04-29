"use client"
import { Button } from '@/components/ui/button'
import GoogleAddressSearch from '@/components/ui/GoogleAddressSearch'
import { supabase } from '@/lib/supabase/client';
import { useUser } from '@clerk/nextjs';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddNewListing() {
  const [selectedAddress,setSelectedAddress]=useState();
  const [coordinates,setCoordinates]=useState();
  const {user}=useUser();
  const [loader,setLoader]=useState(false);
  const router=useRouter();
  const nextHandler=async()=>{
      setLoader(true)
      const { data, error } = await supabase
      .from('listing')
      .insert([
        { address: selectedAddress.label,
          coordinates: coordinates,
          createdBy: user?.primaryEmailAddress.emailAddress
        },
      ])
      .select()

      if(data)
      {
        setLoader(false)
        console.log("New Data Added,",data);
        toast("New address added for listing")
        router.replace('/edit-listing/'+data[0].id)
      }
      if(error)
      {
        setLoader(false)
        console.log("Error");
        toast("Server side error")
      }
        
  }
  return (
    <div className='mt-10 md:mx-56 lg:mx-80'>
      <div className='p-10 flex flex-col gap-5 items-center jusify-center'>
          <h2 className='font-bold text-2xl'> Add New Listing </h2>
          <div className='p-10 rounded-lg border w-full shadow-md flex flex-col gap-5'>
              <h2 className='text-grey-500'>Enter address which you want to list</h2>
              <GoogleAddressSearch
                selectedAddress={(value)=>setSelectedAddress(value)}
                setCoordinates={(value)=>setCoordinates(value)}
              />
              <Button 
              disabled={!selectedAddress || !coordinates || loader}
              onClick={nextHandler}>
                {loader?<Loader className='animate-spin'/>:'Next'}
              </Button>
          </div>
      </div>
    </div>
  )
}

export default AddNewListing