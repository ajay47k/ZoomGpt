"use client"
import type React from "react"

import { useEffect } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Video } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useMutation, useQuery } from "@tanstack/react-query"
import { login, verifyEmail } from "@/lib/api"
import { CheckCircle, XCircle } from "lucide-react";
export default function VerifyForm() {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
  const router = useRouter()

//   const {
//     mutate:signIn,
//     isPending,
//     isError
//   }=useMutation({
//     mutationFn:login,
//     onSuccess:()=>{
//       router.replace("/dashboard")      
//     }
//   })
    const {id}=useParams()
    const code = id || ""; // Fallback to empty string if id is undefined
    const safeCode = Array.isArray(code) ? code[0] ?? "" : code ?? ""; // fallback to empty string if undefined
    // console.log(params)
    const {
        isPending,
        isSuccess,
        isError
    }=useQuery({
        queryKey: ["emailVerification", safeCode],
        queryFn: () => verifyEmail({ code: safeCode }),
    });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // console.log({ email, password })
    

  //   // Handle login logic here
  //   window.location.href = "/dashboard"
  }
    useEffect(() => {
    if (isSuccess||isError) {
      const timeout = setTimeout(() => {
        router.replace("/login")
      }, 5000)

      // Cleanup timeout on unmount
      return () => clearTimeout(timeout)
    }
  }, [isSuccess,isError])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Video className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">ZoomGPT</span>
          </div>
          {isError && <p className="text-red-500 text-sm">Link is either expired or invalid</p>}
          {isSuccess && <p className="text-black-500 text-sm">Email Verified!</p> }
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
           <Button type="submit" className="w-full" isLoading={isPending} disabled={true} >
              {isError && (
    <p className="text-red-500 text-sm flex items-center justify-center gap-2">
        <XCircle className="w-5 h-5" />
    </p>
    )}
    {isSuccess && (
    <p className="text-green-600 text-sm flex items-center justify-center gap-2">
        <CheckCircle className="w-5 h-5" />
    </p>
    )}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {"Get a new Link "}
              <button
              type="button"
              onClick={() => router.replace("/signup")}
              className="text-blue-600 hover:underline bg-transparent border-none "
            >
               Click Here
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
