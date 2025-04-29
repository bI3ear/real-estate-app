import { MarkerF, OverlayView } from '@react-google-maps/api'
import React, { useState } from 'react'
import MarkerListingItem from './MarkerListingItem';

function MarkerItem({ item }) {
    const [selectedListing, setSelectedListing] = useState(null);
  return (
    <div>
        <MarkerF position={item.coordinates} onClick={()=>setSelectedListing(item)} icon={{
            url: './placeholder.png',
            scaledSize:{
                width: 70,
                height: 70
            }
        }}>
        </MarkerF>
        {selectedListing && <OverlayView position={selectedListing.coordinates} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <div>
                <MarkerListingItem item = {selectedListing} closeHandler={()=>setSelectedListing(null)}/>
            </div>
        </OverlayView>}
    </div>
  )
}

export default MarkerItem