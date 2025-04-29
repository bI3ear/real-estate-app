"use client"
import React, { useEffect, useState } from 'react'
import Listing from './Listing'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
const GoogleMapSection = dynamic(() => import('./GoogleMapSection'), { ssr: false });

function ListingMapView({type}) {
    const [listing,setListing] = useState([]);
    const [searchedAddress,setSearchedAddress] = useState();
    const [bedCount,setBedCount] = useState(0);
    const [bathCount,setBathCount] = useState(0);
    const [parkingCount,setParkingCount] = useState(0);
    const [homeType,setHomeType] = useState();
    const [coordinates,setCoordinates] = useState();
    useEffect(()=>{
        getLatestListings();
    },[])

    const getLatestListings=async()=>{
        const {data, error} = await supabase
        .from('listing')
        .select(`*,listingImages(url,listing_id)`)
        .eq('active',true)
        .eq('type',type)
        .order('id', { ascending: false })

        if(data){
            setListing(data)
        }
        if(error) {
            toast('Something went wrong')
        }
    }

    const handlerSearchClick = async () => {
        console.log(searchedAddress);
        const searchTerm = searchedAddress?.value?.structured_formatting?.main_text || '';
        let query = supabase
            .from('listing')
            .select(`*,listingImages(url,listing_id)`)
            .eq('active', true)
            .eq('type', type)
            .gte('bedroom', Number(bedCount)) // Ensure bedCount is a number
            .gte('bathroom', Number(bathCount)) // Ensure bathCount is a number
            .gte('parking', Number(parkingCount)) // Ensure parkingCount is a number
            .like('address', `%${searchTerm}%`) // Search by address
            .order('id', { ascending: false });
    
        if (homeType) {
            query = query.eq('homeType', homeType);
        }
    
        const { data, error } = await query;
        if (data) {
            setListing(data);
        } else if (error) {
            console.error('Error fetching filtered listings:', error);
            toast('Something went wrong while searching.');
        }
    };
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
            <Listing listing = {listing} handlerSearchClick = {handlerSearchClick} searchedAddress = {(v)=>setSearchedAddress(v)} setBathCount={setBathCount} setBedCount={setBedCount} setParkingCount={setParkingCount} setHomeType={setHomeType} setCoordinates={setCoordinates}/>
        </div>
        <div className='fixed right-3 h-full md:w-[350px] lg:w-[600px] xl:w-[800px]'>
            <GoogleMapSection coordinates={coordinates} listing={listing}/>
        </div>
    </div>
  )
}

export default ListingMapView