import connectToDB from "@/database";
import { NextResponse } from "next/server";
import Joi from "joi";
import md_blog from "@/models/blog";

const NewBlog = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required()
}) 

export async function POST(req){
        try{
            await connectToDB();
            const extractBlogData = await req.json();
            const {title,description} = extractBlogData;
            const {error} = NewBlog.validate({title,description});
            if(error){
                return NextResponse.json({
                    success:false,
                    message:error.details[0].message
                })
            }
            const newlyCreatedBlogItem = await md_blog.create(extractBlogData);

            if(newlyCreatedBlogItem){
                return NextResponse.json({
                    success:true,
                    message:'Blog created successfully'
                })
            }
            else{
                return NextResponse.json({
                    success:false,
                    message:'Something went wrong ! Please try again'
                })
            }
        }
        catch(err){
            console.log(err);
            return NextResponse.json({
                success:false,
                message:'Something went wrong ! Please try again'
            })
        }
}

export async function GET(){
    try{
            await connectToDB();
            const blogs = await md_blog.find()
            return NextResponse.json({
                success:true,
                message:'Blogs fetched successfully',
                blogs:blogs
            })
    }
    catch(err){
        return NextResponse.json({
            success:false,
            message:'Something went wrong! Please try again later'
        })
    }
}


export async function DELETE(req){
    try{
           const {searchParams} = new URL(req.url);
           const blog_id = searchParams.get('id');
           if(!blog_id){
            return NextResponse.json({status:500},{
                success:false,
                message:'Id not found in parameter'
            })
           }

           const apiResponse = await md_blog.findByIdAndDelete(blog_id)
           if(apiResponse){
            return NextResponse.json({
                success:true,
                message:'Blog is deleted successfully'
            })
           }
           else{
            return NextResponse.json({
                success:false,
                message:'Somrthing went wrong! Please try again later'
            })
           }
    }
    catch(err){
        return NextResponse.json({
            success:false,
            message:'Somrthing went wrong! Please try again later'
        })
    }
}


export async function PUT(req){
    try{
        const {searchParams} = new URL(req.url);
        const blog_id = searchParams.get('id');
        if(!blog_id){
            return NextResponse.json({status:500},{
                success:false,
                message:'Id not found in parameter'
            })
        }
        const extractBlogData = await req.json();
        const {title,description} = extractBlogData;
        const {error} = NewBlog.validate({title,description});
        if(error){
            return NextResponse.json({
                success:false,
                message:error.details[0].message
        })
        }
        await connectToDB();
        const UpdateBlogItem = await md_blog.findOneAndUpdate(
            {_id:blog_id},{
                title,description
            },{new:true});
        if(UpdateBlogItem){
            return NextResponse.json({
                success:true,
                message:'Blog updated successfully'
            })
        }
        else{
            return NextResponse.json({
                success:false,
                message:'Something went wrong ! Please try again'
            })
        }
    }
    catch(err){
        return NextResponse.json({
            success:false,

        })
    }
}