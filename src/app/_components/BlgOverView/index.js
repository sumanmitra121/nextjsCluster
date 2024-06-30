'use client'

import { useEffect, useState } from "react";
import { AddNewBlog } from "../AddNewBlog";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Pencil,Trash  } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

const initialFormData = {
    title:'',
    description:''
}

function BlogOverViewPage({blogList}) {
    const [openBlogDialog, setOpenBlogDialog] = useState(false);
    const [Loding,setLoading] = useState(false);
    const [formData,setFormData] = useState(initialFormData);
    const router = useRouter();

    useEffect(()=>{
        router.refresh();
    },[])
  
    async function handleBlog(){
        try{
                setLoading(true);
                let apiResponse;
                if(formData?._id){
                    const {_id,...rest} = formData;
                    apiResponse = await fetch(`/api/blog?id=${_id}`,
                        {
                            method:'PUT',
                            body:JSON.stringify(rest)
                        }
                    )
                }
                else{
                    apiResponse = await fetch('/api/blog',
                        {
                            method:'POST',
                            body:JSON.stringify(formData)
                        }
                    )
                }
               
                const res = await apiResponse.json();
                setLoading(false);
                if(res?.success){
                    setFormData(initialFormData);
                    setOpenBlogDialog(false);
                    router.refresh();
                }
        }
        catch(err){
            console.log(err);
            setLoading(false);
            setFormData(initialFormData)
        }
    }

   const  deleteBlogs = async (blog_id) =>{
            const apiResponse = await fetch(`/api/blog?id=${blog_id}`,{
                method:'DELETE'
            });
            const res = await apiResponse.json();
            if(res?.success){
                router.refresh();
            }
    }

    const openDialog = (blog) =>{
                console.log(blog)
                setOpenBlogDialog(true);
                setFormData({
                    title:blog?.title,
                    description:blog?.description,
                    _id:blog?._id
                })
    }


    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-gray-600 font-medium text-md uppercase">Blog List Section</h1>
                <AddNewBlog openBlogDialog={openBlogDialog} handleBlog={handleBlog} setOpenBlogDialog={setOpenBlogDialog} Loding={Loding} formData={formData} setLoading={setLoading} setFormData={setFormData}/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-1">
                {
                    blogList && blogList.length > 0 ?
                    blogList.map(item =>{
                           return <Card key={item._id} className="border border-neutal-100 hover:scale-110 transition-all">
                            <CardContent>
                                <CardTitle className="my-5 line-clamp-1 text-sm font-bold text-gray-500">{item.title}</CardTitle>
                                <CardDescription className='line-clamp-2 text-sm font-medium text-gray-700'>{item.description}</CardDescription>

                                <div className="mt-5 flex gap-3 justify-end items-center ">
                                        <Button variant="ghost" className="text-purple-700" onClick={()=> openDialog(item)}>
                                            <Pencil className="mx-2" size={15}/>
                                            Edit
                                        </Button>
                                        <Button variant="ghost"  className="text-red-700" onClick={()=> deleteBlogs(item._id)}>
                                            <Trash  className="mx-2"size={15}/>
                                            Delete
                                        </Button>
                                </div>
                            </CardContent>
                            </Card>
                    }) : <div className="col-span-1 sm:col-span-2 
                    gap-10 lg:col-span-4 flex flex-col 
                    items-center justify-center
                    min-h-[calc(100vh-112px)]
                    ">
                            <Image src='/blog.svg'
                            alt="Add Blog"
                            className="dark:invert"
                            width={200}
                            height={100}
                            priority/>
                            <div className="flex flex-col gap-4 justify-center items-center">
                                <div className="text-center">
                                <h4 className="mb-1 font-semibold text-sm text-gray-600">No Blog Added Yet!!</h4>
                                <p className="text-xs font-medium text-gray-500"> If any blog available, they will be shown here</p>
                                </div>
                                <AddNewBlog 
                                openBlogDialog={openBlogDialog} 
                                handleBlog={handleBlog} 
                                setOpenBlogDialog={setOpenBlogDialog} 
                                Loding={Loding} formData={formData} 
                                setLoading={setLoading} 
                                setFormData={setFormData}
                                variant="secondary"
                                />
                                
                            </div>
                          
                    </div>
                }
            </div>
         

        </>
    )
}

export default BlogOverViewPage;