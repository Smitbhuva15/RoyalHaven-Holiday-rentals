"use client"
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
import { Button } from "../ui/button"
import { Trash } from "lucide-react"
import { useSWRConfig } from "swr"


export default function DeleteIconBtn({id,userId}) {
    const { mutate } = useSWRConfig()
   

    const delteHome=async()=>{
       
      try {
        const res=await fetch(`/api/home/${id}`,{
            method:'DELETE'
        })
        if(res.ok){
            console.log('Home successfully Deleted!!')
            mutate(`/api/user/${userId}`)
        }
        else{
            const errmessage=await res.json()
            console.log(errmessage)
        }
      } catch (error) {
        console.log("Internal server Error!!")
      } 
    }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button  size="icon" variant="destructive" ><Trash /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
          This action cannot be undone. This will permanently delete your
          added home and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          
          <AlertDialogAction variant="destructive" onClick={()=>{delteHome()}}  >Delete</AlertDialogAction>
          
    
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
