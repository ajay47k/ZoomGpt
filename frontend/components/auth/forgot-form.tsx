"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Video } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { forgotPassword } from "@/lib/api"
export default function Forgot() {
  const [email, setEmail] = useState("")
  // const [password, setPassword] = useState("")
  const router = useRouter()
  const {
    mutate: triggerForgotPassword,
    isPending,
    isSuccess,
    isError,
    error
  } = useMutation({
    mutationFn: forgotPassword, // use the imported function
    onSuccess: () => {
    setTimeout(() => {
      router.replace("/login");
    }, 4000);
  },
  onError: (error) => {
     setTimeout(() => {
      router.replace("/login");
    }, 5000);
  }
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    triggerForgotPassword(email)
    // Handle login logic here
    // window.location.href = "/dashboard"
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Video className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">ZoomGPT</span>
          </div>
          <CardTitle>Forgot Password</CardTitle>
          {!isSuccess && <CardDescription>Enter Email associated with the Account</CardDescription>}
        </CardHeader>
        <>
        {isError && (
  <div className="flex justify-center items-center px-4">
    <p className="text-red-500 text-sm text-center">
      {error?.response?.data?.message || error?.message || "An error occurred"}
    </p>
  </div>
)}
        </>
        {!isSuccess &&<CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{}</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" isLoading={isPending} disabled={isPending}>
              Reset password
            </Button>
          </form>
            <div className="mt-4 text-center text-sm">
            {"Go Back To Sign In ? "}
            <button
              type="button"
              onClick={() => router.replace("/login")}
              className="text-blue-600 hover:underline bg-transparent border-none p-0 m-0"
            >
              Sign in
            </button>
          </div>
        </CardContent>}
        {isSuccess && (<CardContent>
          <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-green-500 text-sm">Email request Sent Successfully!!</p>
          </div>
          </CardContent>)}
      </Card>
    </div>
  )
}
