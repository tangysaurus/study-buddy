"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Navigation } from "@/components/navigation"
import { Badge } from "@/components/ui/badge"
import { Bell, Shield, Palette, Globe, Download, Trash2, Key, Mail, Smartphone, Monitor, Moon, Sun, Volume2, Eye, Lock, AlertTriangle, CheckCircle } from 'lucide-react'

const settingsData = {
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    weeklyDigest: false,
    courseReminders: true,
    assignmentDeadlines: true,
    achievementAlerts: true,
    marketingEmails: false,
  },
  privacy: {
    profileVisibility: "public", // public, friends, private
    showProgress: true,
    showAchievements: true,
    allowMessages: true,
    dataCollection: true,
  },
  appearance: {
    theme: "system", // light, dark, system
    language: "en",
    timezone: "America/New_York",
    compactMode: false,
    animations: true,
  },
  learning: {
    studyReminders: true,
    reminderTime: "18:00",
    weeklyGoal: 10, // hours
    difficultyLevel: "intermediate",
    autoplay: false,
    soundEffects: true,
  },
  account: {
    twoFactorEnabled: false,
    lastPasswordChange: "2024-01-15",
    connectedAccounts: ["Google", "Microsoft"],
  }
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(settingsData)
  const [activeTab, setActiveTab] = useState("notifications")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSave = () => {
    // Save settings to backend
    console.log("Saving settings:", settings)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleExportData = () => {
    // Export user data
    console.log("Exporting user data...")
    // Create and download a JSON file
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'my-data.json'
    link.click()
  }

  const handleDeleteAccount = () => {
    // Handle account deletion
    console.log("Account deletion requested")
    setShowDeleteConfirm(false)
  }

  const tabs = [
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "learning", label: "Learning", icon: Monitor },
    { id: "account", label: "Account", icon: Key },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and privacy settings</p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-green-800">Settings saved successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                          activeTab === tab.id
                            ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {tab.label}
                      </button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-6">
                {/* Notifications Tab */}
                {activeTab === "notifications" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-gray-600">Receive notifications via email</p>
                          </div>
                          <Switch
                            id="email-notifications"
                            checked={settings.notifications.emailNotifications}
                            onCheckedChange={(checked) =>
                              setSettings(prev => ({
                                ...prev,
                                notifications: { ...prev.notifications, emailNotifications: checked }
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                            <p className="text-sm text-gray-600">Receive push notifications on your device</p>
                          </div>
                          <Switch
                            id="push-notifications"
                            checked={settings.notifications.pushNotifications}
                            onCheckedChange={(checked) =>
                              setSettings(prev => ({
                                ...prev,
                                notifications: { ...prev.notifications, pushNotifications: checked }
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="course-reminders">Course Reminders</Label>
                            <p className="text-sm text-gray-600">Get reminded about upcoming lessons</p>
                          </div>
                          <Switch
                            id="course-reminders"
                            checked={settings.notifications.courseReminders}
                            onCheckedChange={(checked) =>
                              setSettings(prev => ({
                                ...prev,
                                notifications: { ...prev.notifications, courseReminders: checked }
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="assignment-deadlines">Assignment Deadlines</Label>
                            <p className="text-sm text-gray-600">Notifications for upcoming deadlines</p>
                          </div>
                          <Switch
                            id="assignment-deadlines"
                            checked={settings.notifications.assignmentDeadlines}
                            onCheckedChange={(checked) =>
                              setSettings(prev => ({
                                ...prev,
                                notifications: { ...prev.notifications, assignmentDeadlines: checked }
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="achievement-alerts">Achievement Alerts</Label>
                            <p className="text-sm text-gray-600">Celebrate your accomplishments</p>
                          </div>
                          <Switch
                            id="achievement-alerts"
                            checked={settings.notifications.achievementAlerts}
                            onCheckedChange={(checked) =>
                              setSettings(prev => ({
                                ...prev,
                                notifications: { ...prev.notifications, achievementAlerts: checked }
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="weekly-digest">Weekly Digest</Label>
                            <p className="text-sm text-gray-600">Summary of your weekly progress</p>
                          </div>
                          <Switch
                            id="weekly-digest"
                            checked={settings.notifications.weeklyDigest}
                            onCheckedChange={(checked) =>
                              setSettings(prev => ({
                                ...prev,
                                notifications: { ...prev.notifications, weeklyDigest: checked }
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy Tab */}
                {activeTab === "privacy" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Privacy Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="profile-visibility">Profile Visibility</Label>
                          <Select
                            value={settings.privacy.profileVisibility}
                            onValueChange={(value) =>
                              setSettings(prev => ({
                                ...prev,
                                privacy: { ...prev.privacy, profileVisibility: value }
                              }))
                            }
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="public">Public - Anyone can see</SelectItem>
                              <SelectItem value="friends">Friends Only</SelectItem>
                              <SelectItem value="private">Private - Only me</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="show-progress">Show Learning Progress</Label>
                            <p className="text-sm text-gray-600">Display your course progress publicly</p>
                          </div>
                          <Switch
                            id="show-progress"
                            checked={settings.privacy.showProgress}
                            onCheckedChange={(checked) =>
                              setSettings(prev => ({
                                ...prev,
                                privacy: { ...prev.privacy, showProgress: checked }
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="show-achievements">Show Achievements</Label>
                            <p className="text-sm text-gray-600">Display your badges and achievements</p>
                          </div>
                          <Switch
                            id="show-achievements"
                            checked={settings.privacy.showAchievements}
                            onCheckedChange={(checked) =>
                              setSettings(prev => ({
                                ...prev,
                                privacy: { ...prev.privacy, showAchievements: checked }
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="allow-messages">Allow Messages</Label>
                            <p className="text-sm text-gray-600">Let other users send you messages</p>
                          </div>
                          <Switch
                            id="allow-messages"
                            checked={settings.privacy.allowMessages}
                            onCheckedChange={(checked) =>
                              setSettings(prev => ({
                                ...prev,
                                privacy: { ...prev.privacy, allowMessages: checked }
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="data-collection">Analytics & Data Collection</Label>
                            <p className="text-sm text-gray-600">Help improve the platform with usage data</p>
                          </div>
                          <Switch
                            id="data-collection"
                            checked={settings.privacy.dataCollection}
                            onCheckedChange={(checked) =>
                              setSettings(prev => ({
                                ...prev,
                                privacy: { ...prev.privacy, dataCollection: checked }
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Appearance Tab */}
                {activeTab === "appearance" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Appearance & Display</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="theme">Theme</Label>
                          <Select
                            value={settings.appearance.theme}
                            onValueChange={(value) =>
                              setSettings(prev => ({
                                ...prev,
                                appearance: { ...prev.appearance, theme: value }
                              }))
                            }
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">
                                <div className="flex items-center gap-2">
                                  <Sun className="w-4 h-4" />
                                  Light
                                </div>
                              </SelectItem>
                              <SelectItem value="dark">
                                <div className="flex items-center gap-2">
                                  <Moon className="w-4 h-4" />
                                  Dark
                                </div>
                              </SelectItem>
                              <SelectItem value="system">
                                <div className="flex items-center gap-2">
                                  <Monitor className="w-4 h-4" />
                                  System
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="language">Language</Label>
                          <Select
                            value={settings.appearance.language}
                            onValueChange={(value) =>
                              setSettings(prev => ({
                                ...prev,
                                appearance: { ...prev.appearance, language: value }
                              }))
                            }
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                              <SelectItem value="de">Deutsch</SelectItem>
                              <SelectItem value="zh">中文</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label htmlFor="timezone">Timezone</Label>
                          <Select
                            value={settings.appearance.timezone}
                            onValueChange={(value) =>
                              setSettings(prev => ({
                                ...prev,
                                appearance: { ...prev.appearance, timezone: value }
                              }))
                            }
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="America/New_York">Eastern Time</SelectItem>
                              <SelectItem value="America/Chicago">Central Time</SelectItem>
                              <SelectItem value="America/Denver">Mountain Time</SelectItem>
                              <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                              <SelectItem value="Europe/London">GMT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="compact-mode">Compact Mode</Label>
                            <p className="text-sm text-gray-600">Use less spacing for a denser layout</p>
                          </div>
                          <Switch
                            id="compact-mode"
                            checked={settings.appearance.compactMode}
                            onCheckedChange={(checked) =>
                              setSettings(prev => ({
                                ...prev,
                                appearance: { ...prev.appearance, compactMode: checked }
                              }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="animations">Animations</Label>
                            <p className="text-sm text-gray-600">Enable smooth transitions and animations</p>
                          </div>
                          <Switch
                            id="animations"
                            checked={settings.appearance.animations}
                            onCheckedChange={(checked) =>
                              setSettings(prev => ({
                                ...prev,
                                appearance: { ...prev.appearance, animations: checked }
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Learning Tab */}
                {activeTab === "learning" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Learning Preferences</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="study-reminders">Study Reminders</Label>
                            <p className="text-sm text-gray-600">Get reminded to study at your preferred time</p>
                          </div>
                          <Switch
                            id="study-reminders"
                            checked={settings.learning.studyReminders}
                            onCheckedChange={(checked) =>
                              setSettings(prev => ({
                                ...prev,
                                learning: { ...prev.learning, studyReminders: checked }
                              }))
                            }
                          />
                        </div>

                        <div>
                          <Label htmlFor="reminder-time">Reminder Time</Label>
                          <Input
                            id="reminder-time"
                            type="time"
                            value={settings.learning.reminderTime}
                            onChange={(e) =>
                              setSettings(prev => ({
                                ...prev,
                                learning: { ...prev.learning, reminderTime: e.target.value }
                              }))
                            }
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label htmlFor="weekly-goal">Weekly Study Goal (hours)</Label>
                          <Input
                            id="weekly-goal"
                            type="number"
                            min="1"
                            max="40"
                            value={settings.learning.weeklyGoal}
                            onChange={(e) =>
                              setSettings(prev => ({
                                ...prev,
                                learning: { ...prev.learning, weeklyGoal: parseInt(e.target.value) }
                              }))
                            }
                            className="mt-2"
                          />
                        </div>

                        <div>
                          <Label htmlFor="difficulty-level">Difficulty Level</Label>
                          <Select
                            value={settings.learning.difficultyLevel}
                            onValueChange={(value) =>
                              setSettings(prev => ({
                                ...prev,
                                learning: { ...prev.learning, difficultyLevel: value }
                              }))
                            }
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">Intermediate</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label htmlFor="sound-effects">Sound Effects</Label>
                            <p className="text-sm text-gray-600">Play sounds for interactions and achievements</p>
                          </div>
                          <Switch
                            id="sound-effects"
                            checked={settings.learning.soundEffects}
                            onCheckedChange={(checked) =>
                              setSettings(prev => ({
                                ...prev,
                                learning: { ...prev.learning, soundEffects: checked }
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Account Tab */}
                {activeTab === "account" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Account Security</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <Label>Two-Factor Authentication</Label>
                            <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {settings.account.twoFactorEnabled ? (
                              <Badge variant="secondary" className="bg-green-100 text-green-800">Enabled</Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-red-100 text-red-800">Disabled</Badge>
                            )}
                            <Button variant="outline" size="sm">
                              {settings.account.twoFactorEnabled ? "Disable" : "Enable"}
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <Label>Password</Label>
                            <p className="text-sm text-gray-600">Last changed: {settings.account.lastPasswordChange}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            Change Password
                          </Button>
                        </div>

                        <div className="p-4 border rounded-lg">
                          <Label className="mb-2 block">Connected Accounts</Label>
                          <div className="space-y-2">
                            {settings.account.connectedAccounts.map((account) => (
                              <div key={account} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline">{account}</Badge>
                                  <span className="text-sm text-gray-600">Connected</span>
                                </div>
                                <Button variant="ghost" size="sm" className="text-red-600">
                                  Disconnect
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Data Management</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <Label>Export Data</Label>
                            <p className="text-sm text-gray-600">Download a copy of your data</p>
                          </div>
                          <Button variant="outline" size="sm" onClick={handleExportData}>
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                          <div>
                            <Label className="text-red-800">Delete Account</Label>
                            <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                          </div>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => setShowDeleteConfirm(true)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end pt-6 border-t">
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="w-5 h-5" />
                Delete Account
              </CardTitle>
              <CardDescription>
                This action cannot be undone. This will permanently delete your account and remove all your data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button 
                  variant="destructive" 
                  className="flex-1"
                  onClick={handleDeleteAccount}
                >
                  Yes, Delete Account
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
