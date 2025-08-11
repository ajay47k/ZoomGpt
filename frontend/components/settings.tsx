"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Lock, Trash2, Upload, Mail } from "lucide-react"

export default function Settings() {
  const [profileData, setProfileData] = useState({
    displayName: "John Doe",
    email: "john.doe@company.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "Product Manager",
    organization: "Tech Corp",
    timeZone: "America/New_York",
  })

  const [showSmtpConfig, setShowSmtpConfig] = useState(false)
  const [smtpConfig, setSmtpConfig] = useState({
    email: "",
    password: "",
  })

  const handleProfileChange = (field: string, value: string) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const timeZones = [
    { value: "America/New_York", label: "Eastern Time (ET)" },
    { value: "America/Chicago", label: "Central Time (CT)" },
    { value: "America/Denver", label: "Mountain Time (MT)" },
    { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
    { value: "Europe/London", label: "Greenwich Mean Time (GMT)" },
    { value: "Europe/Paris", label: "Central European Time (CET)" },
    { value: "Asia/Tokyo", label: "Japan Standard Time (JST)" },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {/* Profile & Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Profile & Account Settings
          </CardTitle>
          <CardDescription>Update your personal information and account preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Picture */}
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder.svg?height=80&width=80" />
              <AvatarFallback className="text-lg">
                {profileData.displayName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <Label>Profile Picture</Label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={profileData.displayName}
                  onChange={(e) => handleProfileChange("displayName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => handleProfileChange("phone", e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  value={profileData.jobTitle}
                  onChange={(e) => handleProfileChange("jobTitle", e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Organization</Label>
                <Input
                  id="organization"
                  value={profileData.organization}
                  onChange={(e) => handleProfileChange("organization", e.target.value)}
                  placeholder="Optional"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeZone">Time Zone</Label>
                <Select value={profileData.timeZone} onValueChange={(value) => handleProfileChange("timeZone", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeZones.map((tz) => (
                      <SelectItem key={tz.value} value={tz.value}>
                        {tz.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Management */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Account Management</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    <span className="font-medium">Change Password</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Update your account password</p>
                </div>
                <Button variant="outline">Change Password</Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">SMTP Configuration</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Configure your Google App Password for sending meeting invites
                  </p>
                </div>
                <Button variant="outline" onClick={() => setShowSmtpConfig(!showSmtpConfig)}>
                  {showSmtpConfig ? "Hide" : "Configure"}
                </Button>
              </div>

              {showSmtpConfig && (
                <div className="p-4 border rounded-lg bg-gray-50 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpEmail">Gmail Address</Label>
                    <Input
                      id="smtpEmail"
                      type="email"
                      placeholder="your-email@gmail.com"
                      value={smtpConfig.email}
                      onChange={(e) => setSmtpConfig((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">Google App Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      placeholder="Enter your Google App Password"
                      value={smtpConfig.password}
                      onChange={(e) => setSmtpConfig((prev) => ({ ...prev, password: e.target.value }))}
                    />
                    <p className="text-xs text-muted-foreground">
                      Generate an App Password in your Google Account settings under Security → 2-Step Verification →
                      App passwords
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Test Connection
                    </Button>
                    <Button size="sm">Save SMTP Settings</Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Danger Zone */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>

            <div className="p-4 border border-red-200 rounded-lg bg-red-50">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4 text-red-600" />
                    <span className="font-medium text-red-600">Delete Account</span>
                  </div>
                  <p className="text-sm text-red-600">Permanently delete your account and all associated data</p>
                </div>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
