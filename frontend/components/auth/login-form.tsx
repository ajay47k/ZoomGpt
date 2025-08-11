"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Video } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { login } from "@/lib/api"
  import { usePathname } from "next/navigation"
import { useSearchParams } from "next/navigation"
export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const searchParams = useSearchParams()
  const router = useRouter()
  // If you need the current path, use usePathname() from 'next/navigation'

   // Get redirectUrl from URL query parameter, fallback to dashboard
  const redirectUrl = searchParams.get("redirectUrl") || "/dashboard"
  
  const {
    mutate:signIn,
    isPending,
    isError
  }=useMutation({
    mutationFn:login,
    onSuccess:()=>{
      router.replace(redirectUrl)      
    }
  })
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // console.log({ email, password })
    signIn({ email, password })

  //   // Handle login logic here
  //   window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Video className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">ZoomGPT</span>
          </div>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Sign in to your account</CardDescription>
          {isError && <p className="text-red-500 text-sm">Invalid email or password</p>}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
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
            <Button type="submit" className="w-full" isLoading={isPending}>
              Sign In
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {"Don't have an account? "}
              <button
              type="button"
              onClick={() => router.push("/signup")}
              className="text-blue-600 hover:underline bg-transparent border-none "
            >
               Sign up
            </button>
          </div>
          <div className="mt-4 text-center text-sm">
            {"Forgot password ? "}
              <button
              type="button"
              onClick={() => router.push("/forgot")}
              className="text-blue-600 hover:underline bg-transparent border-none "
            >
              Forgot
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
