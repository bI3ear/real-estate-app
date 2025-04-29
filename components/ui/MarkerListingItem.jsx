import { BathIcon, BedDouble, MapPin, Ruler, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

function MarkerListingItem({ item, closeHandler}) {
  return (
    <div className="shadow-lg rounded-xl overflow-hidden w-[200px] bg-white border border-gray-200">
      <X onClick={()=>closeHandler()}/>
      <div>
        <Image
          src={item.listingImages[0].url}
          width={800}
          height={150}
          className="object-cover h-[120px] w-full"
          alt={`Image of listing at ${item.address}`}
        />
      </div>
      <div className="flex flex-col gap-1 p-2">
        <h2 className="font-bold text-lg">${item.price.toLocaleString()}</h2>
        <h2 className="flex items-center text-xs text-gray-500 truncate">
          <MapPin className="h-3 w-3 mr-1" />
          {item.address}
        </h2>
        <div className="flex gap-1 mt-2 justify-between text-xs text-gray-600">
          <div className="flex items-center gap-1 bg-slate-100 rounded-md px-2 py-1 w-full justify-center">
            <BedDouble className="h-3 w-3" />
            {item?.bedroom}
          </div>
          <div className="flex items-center gap-1 bg-slate-100 rounded-md px-2 py-1 w-full justify-center">
            <BathIcon className="h-3 w-3" />
            {item?.bathroom}
          </div>
          <div className="flex items-center gap-1 bg-slate-100 rounded-md px-2 py-1 w-full justify-center">
            <Ruler className="h-3 w-3" />
            {item?.area}
          </div>
        </div>
      </div>
    </div>
  );
}


export default MarkerListingItem