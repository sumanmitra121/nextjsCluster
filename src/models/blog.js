import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:String,
    description:String
})

const md_blog = mongoose.models.md_blog || mongoose.model("md_blog",blogSchema)

export default md_blog;