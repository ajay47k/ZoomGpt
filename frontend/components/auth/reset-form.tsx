"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Video } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { login, resetPassword } from "@/lib/api"
export default function ResetForm() {
    const searchParams=useSearchParams()
    const code=searchParams.get("code")
    const safeCode = Array.isArray(code) ? code[0] ?? "" : code ?? ""; // fallback to empty string if undefined
    const exp =Number(searchParams.get("exp"))
    const [password,setPassword]=useState("")
    const now= Date.now()
    const linkisValid = code && exp && now < exp
//   const [password, setPassword] = useState("")
  const router = useRouter()
  const {
    mutate:resetPasswordTrigger,
    isPending,
    isError,
    error
  }=useMutation({
    mutationFn:resetPassword,
    onSuccess:()=>{
      router.replace("/login")      
    },
    onError: (error) => {
      console.error("Reset password error:", error)
      // Show error for 5 seconds before redirecting
      setTimeout(() => {
        router.replace("/login")
      }, 10000)
    }
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    resetPasswordTrigger({ password, verificationCode:safeCode })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Video className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">ZoomGPT</span>
          </div>
          <CardTitle>Reset Password</CardTitle>
        
        <CardDescription>Reset Your Password</CardDescription>
           </CardHeader>
        {linkisValid && 
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password"></Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your new Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={
                  (e) => {
                    if (e.key === "Enter") {
                      handleSubmit(e)
                    }
                  }
                }
                required
              />
            </div>
            <Button type="submit" className="w-full" isLoading={isPending} disabled={isPending}>
              Reset Password!!
            </Button>
          </form>
        </CardContent>} 
        {
            !linkisValid&&
            <CardContent>
                <p className="text-red-500 text-sm text-center">
                    Invalid or expired link.
                </p>
            </CardContent>
        }
        {linkisValid && isError && 
        <CardContent>
            <p className="text-red-500 text-sm text-center">
    Error: {error.errors[0].message || "An error occurred"}
  </p>
        </CardContent>}
      </Card>
    </div>

)}
