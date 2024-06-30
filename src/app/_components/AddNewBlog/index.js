import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon } from "lucide-react";
export function AddNewBlog({variant,openBlogDialog, setOpenBlogDialog,formData,setFormData,Loding,setLoading,handleBlog}){
    return (
        <>
            <div>
                <Button onClick={() => setOpenBlogDialog(true)} variant={variant ? variant : 'outline'}>
                    <PlusIcon/>
                    Add Blog
                </Button>
            </div>
            <Dialog open={openBlogDialog} onOpenChange={() => {
                    setOpenBlogDialog(false);
                    setFormData({
                        title:'',
                        description:''
                    })
                }}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{formData?._id ?  'Edit' : 'Add'} Blog</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>

                    </DialogDescription>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-4 items-center gap-1">
                            <Label htmlFor="title" className="text-left">
                                Title
                            </Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter Blog Title"
                                value={formData.title}
                                onChange={(event)=>{
                                    setFormData(
                                        {
                                            ...formData,
                                            title:event.target.value
                                        }
                                    )
                                }}
                                className="col-span-4"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <Label htmlFor="description" className="text-left">
                                Description
                            </Label>
                            {/* <Input
                                className="col-span-3"
                                id="description"
                                placeholder="Enter Blog Description"
                                name="description"
                                value={formData.description}
                                onChange={(event)=>{
                                    setFormData(
                                        {
                                            ...formData,
                                            description:event.target.value
                                        }
                                    )
                                }}
                            /> */}
                            <Textarea
                                className="col-span-4"
                                id="description"
                                placeholder="Enter Blog Description"
                                name="description"
                                value={formData.description}
                                onChange={(event)=>{
                                    setFormData(
                                        {
                                            ...formData,
                                            description:event.target.value
                                        }
                                    )
                                }}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" onClick={handleBlog} className={`${!Loding ? 'disabled:opacity-5  disabled:cursor-none' : 'opacity-100 cursor-auto'}`}>
                            {Loding ? 'Saving' : 'Save'} changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}