"use client"
import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Formik } from 'formik'
import { toast } from 'sonner'
import { supabase } from '@/lib/supabase/client'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import FileUpload from '../_components/FileUpload'
import Error from 'next/error'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Loader } from 'lucide-react'
  

function EditListing({ params: paramsPromise }) {
    const { user } = useUser()
    const router = useRouter()
    const [images, setImages] = useState([])
    const params = use(paramsPromise) // Unwrap the params Promise
    const [listing, setListing] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        if (user) {
            verifyUserRecord()
        }
    }, [user])

    const verifyUserRecord = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select('*, listingImages(listing_id,url)')
            .eq('createdBy', user?.primaryEmailAddress.emailAddress)
            .eq('id', params.id)

        if (data) {
            console.log(data)
            setListing(data[0])
        }
        if (data?.length <= 0) {
            router.replace('/')
        }
    }

    const onSubmitHandler = async (formValue) => {
        const { data, error } = await supabase
            .from('listing')
            .update(formValue)
            .eq('id', params.id)
            .select()

        if (data) {
            console.log(data)
            toast('Listing updated and published')
            setLoader(false)
        }
        for (const image of images) {
            setLoader(true);
            const file = image;
            const fileName = Date.now().toString();
            const fileExt = file.name.split('.').pop();
            const {data , error} = await supabase.storage
            .from('listingimages')
            .upload(`${fileName}`, file, {
                contentType: `image/${fileExt}`,
                upsert: false
            });

            if (error) {
                console.error('Error uploading file:', error.message);
            }
            else {
                const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL+fileName;
                console.log('Image URL:', imageUrl);
                const { data, error } = await supabase
                    .from('listingImages')
                    .insert([
                        { url: imageUrl, listing_id: params?.id }
                    ])
                    .select();

                    if(data) {
                        setLoader(false)
                    }

                    if(error) {
                        setLoader(false)
                    }
            }
            setLoader(false);
        }        
    }
    const publishBtnHandler = async () => {
        setLoader(true)
        const { data, error } = await supabase
        .from('listing')
        .update({ active: true })
        .eq('id', params?.id)
        .select()

        if (data) {
            console.log(data)
            toast('Listing updated and published')
            setLoader(false)
        }
    }

    return (
        <div className="px-10 md:px-36 my-10">
            <h2 className="font-bold text-2xl mb-6">
                Enter some more details about your listing
            </h2>
            <Formik
                initialValues={{
                    type: '',
                    propertyType: '',
                    profileImage:user?.imageUrl,
                    fullName: user?.fullName,
                }}
                onSubmit={(values) => {
                    console.log(values)
                    onSubmitHandler(values)
                }}
            >
                {({ values, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <>
                            <div className="p-5 rounded-lg shadow-md grid gap-7">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    <div className="flex flex-col gap-2">
                                        <Label className="text-gray-500">Rent or Sell</Label>
                                        <RadioGroup defaultValue={listing?.type} onValueChange={(v) => (values.type = v)}>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Sell" id="Sell" />
                                                <Label htmlFor="Sell" className="text-lg">Sell</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="Rent" id="Rent" />
                                                <Label htmlFor="Rent" className="text-lg">Rent</Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <Label className="text-gray-500">Property Type</Label>
                                        <Select onValueChange={(e) => (values.propertyType = e)} name="propertyType" defaultValue={listing?.propertyType}>
                                            <SelectTrigger>
                                                <SelectValue placeholder={listing?.propertyType?listing?.propertyType:"Select Property Type"} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Single Family House">Single Family House</SelectItem>
                                                <SelectItem value="Town House">Town House</SelectItem>
                                                <SelectItem value="Condo">Condo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    <div className="flex gap-2 flex-col">
                                        <h2 className="text-gray-500">Bedroom</h2>
                                        <Input placeholder="Ex.1" name="bedroom" onChange={handleChange} defaultValue={listing?.bedroom}/>
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <h2 className="text-gray-500">Bathroom</h2>
                                        <Input placeholder="Ex.1" name="bathroom" onChange={handleChange} defaultValue={listing?.bathroom}/>
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <h2 className="text-gray-500">Built in</h2>
                                        <Input placeholder="Ex.2020" name="builtIn" onChange={handleChange} defaultValue={listing?.buildIn}/>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    <div className="flex gap-2 flex-col">
                                        <h2 className="text-gray-500">Parking</h2>
                                        <Input placeholder="Ex.1" name="parking" onChange={handleChange} defaultValue={listing?.parking}/>
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <h2 className="text-gray-500">Lot Size (Sq.ft)</h2>
                                        <Input placeholder="Ex.1000 sq.ft" name="lotSize" onChange={handleChange} defaultValue={listing?.lotSize}/>
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <h2 className="text-gray-500">Area (Sq.ft)</h2>
                                        <Input placeholder="Ex.1000 sq.ft" name="area" onChange={handleChange} defaultValue={listing?.area}/>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                    <div className="flex gap-2 flex-col">
                                        <h2 className="text-gray-500">Selling Price</h2>
                                        <Input placeholder="1,590,000" name="price" onChange={handleChange} defaultValue={listing?.price}/>
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <h2 className="text-gray-500">HOA (Per Month)</h2>
                                        <Input placeholder="Ex. 4000 baht" name="hoa" onChange={handleChange} defaultValue={listing?.hoa}/>
                                    </div>
                                </div>
                                <div className="flex gap-2 flex-col">
                                    <h2 className="text-gray-500">Description</h2>
                                    <Textarea placeholder="" name="description" onChange={handleChange} defaultValue={listing?.description}/>
                                </div>
                            </div>
                            <div>
                                <h2 className='font-lg text-gray-500 my-2'>Upload Property Image</h2>
                                <FileUpload setImages={(value) => setImages(value)} imageList = {listing.listingImages}  />
                            </div>
                            
                            <div className="flex justify-end gap-4 mt-8">
                                <Button disabled = {loader} variant="outline" className="w-[150px] ">
                                    {loader ? <Loader className='animate-spin' /> : ' Save'}
                                </Button>
                                
                                <AlertDialog>
                                <AlertDialogTrigger asChild>
                                <Button type="button" disabled = {loader} className="w-[150px] bg-gradient-to-r from-[#eaa33c] to-[#eaa33c] text-white hover:opacity-90">
                                    {loader ? <Loader className='animate-spin' /> : ' Save & Publish'}
                                </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Do really want to publish this listing?
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={()=>publishBtnHandler()}>{loader?<Loader className='animate-spin'/>:'Continue'}</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                </AlertDialog>

                            </div>
                        </>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default EditListing