import BlogOverViewPage from "../_components/BlgOverView";

async function getBlogs(){
    try{
        const response = await fetch(`${process.env.API_URL}blog`,{
            method:'GET',
            cache:'no-store'
        })
        const api_res = await response.json({});
        return api_res?.blogs;
    }
    catch(err){
        throw new Error(err)
    }
}

export default async function Blogs(){

        const blogList = await getBlogs();

        return (
            <div className="min-h-screen flex flex-col gap-3 p-6">

                <BlogOverViewPage blogList={blogList}/>

            </div>
        )
}