import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase/client';
import { useUser } from '@clerk/nextjs';
import { BathIcon, BedDouble, MapPin, Ruler, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

function UserListing() {
    const { user } = useUser();
    const [listing, setListing] = useState([]);

    useEffect(() => {
        if (user) {
            GetUserListing();
        }
    }, [user]);

    const GetUserListing = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select(`*,listingImages(url,listing_id)`)
            .eq('createdBy', user?.primaryEmailAddress.emailAddress);

        if (error) {
            console.error('Error fetching user listings:', error);
            return;
        }

        setListing(data);
        console.log(data);
    };

    const handleDelete = async (listingId) => {
        try {
            // Start a transaction to delete from both tables
            const { error: imageError } = await supabase
                .from('listingImages')
                .delete()
                .eq('listing_id', listingId);

            if (imageError) {
                console.error('Error deleting images:', imageError);
                toast('Failed to delete images. Please try again.');
                return;
            }

            const { error: listingError } = await supabase
                .from('listing')
                .delete()
                .eq('id', listingId);

            if (listingError) {
                console.error('Error deleting listing:', listingError);
                toast('Failed to delete listing. Please try again.');
                return;
            }

            // Update the UI after successful deletion
            setListing((prev) => prev.filter((item) => item.id !== listingId));
            toast('Listing deleted successfully.');
        } catch (error) {
            console.error('Unexpected error during deletion:', error);
            toast('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2 className="font-bold text-2xl mb-6">Manage your listing</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {listing.length > 0 ? (
                    listing.map((item, index) => (
                        <div
                            className="p-4 border rounded-2xl shadow-sm hover:shadow-md transition cursor-pointer flex flex-col bg-white"
                            key={index}
                        >
                            <div className="relative w-full h-56 overflow-hidden rounded-xl">
                                <Image
                                    src={item?.listingImages[0]?.url || null}
                                    layout="fill"
                                    objectFit="cover"
                                    alt={`Image of listing at ${item.address}`}
                                />
                            </div>

                            <div className="flex flex-col gap-3 mt-4 flex-1">
                                <h2 className="font-bold text-xl text-primary">{item.price.toLocaleString()} ฿</h2>
                                <p className="flex items-center gap-2 text-sm text-gray-500">
                                    <MapPin className="h-4 w-4" />
                                    {item.address}
                                </p>

                                <div className="grid grid-cols-3 gap-2 mt-2">
                                    <div className="flex flex-col items-center bg-gray-100 p-2 rounded-md text-gray-600 text-xs">
                                        <BedDouble className="h-4 w-4 mb-1" />
                                        {item?.bedroom} Beds
                                    </div>
                                    <div className="flex flex-col items-center bg-gray-100 p-2 rounded-md text-gray-600 text-xs">
                                        <BathIcon className="h-4 w-4 mb-1" />
                                        {item?.bathroom} Baths
                                    </div>
                                    <div className="flex flex-col items-center bg-gray-100 p-2 rounded-md text-gray-600 text-xs">
                                        <Ruler className="h-4 w-4 mb-1" />
                                        {item?.area} sqft
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                                <Link href={'/edit-listing/' + item.id}>
                                    <Button size="sm" className="flex-1">
                                        Edit
                                    </Button>
                                </Link>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <Trash />
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No listings found.</p>
                )}
            </div>
        </div>
    );
}

export default UserListing;