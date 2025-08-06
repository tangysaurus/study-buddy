"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { User, Mail, Phone, MapPin, Calendar, BookOpen, Award, Target, Edit2, Save, X, Camera } from 'lucide-react'

const userProfile = {
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  role: "student", // or "professor"
  avatar: "/placeholder.svg?height=100&width=100&text=AJ",
  phone: "+1 (555) 123-4567",
  location: "Boston, MA",
  joinDate: "September 2023",
  grade: "Junior",
  major: "Computer Science",
  gpa: 3.7,
  bio: "Passionate computer science student with interests in AI and machine learning. Always eager to learn new technologies and collaborate on innovative projects.",
  
  // Academic info
  totalCourses: 4,
  completedCourses: 12,
  currentCredits: 15,
  totalCredits: 120,
  
  // Achievements
  achievements: [
    { id: 1, title: "First Course Completed", description: "Completed your first course", date: "Oct 2023", icon: "🎓" },
    { id: 2, title: "Study Streak", description: "7 days of continuous learning", date: "Nov 2023", icon: "🔥" },
    { id: 3, title: "High Achiever", description: "Maintained 90%+ average", date: "Dec 2023", icon: "⭐" },
    { id: 4, title: "AI Helper", description: "Used AI feedback 50+ times", date: "Jan 2024", icon: "🤖" },
  ],
  
  // Learning stats
  learningStats: {
    totalStudyHours: 156,
    averageScore: 87,
    completionRate: 94,
    streakDays: 12,
  },
  
  // Current courses
  currentCourses: [
    { id: "cs201", name: "Data Structures", progress: 75, grade: "A-" },
    { id: "math151", name: "Calculus I", progress: 60, grade: "B+" },
    { id: "phys201", name: "Physics I", progress: 85, grade: "A" },
    { id: "eng201", name: "World Literature", progress: 40, grade: "B" },
  ]
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(userProfile)

  const handleSave = () => {
    // Here you would typically save to a backend
    console.log("Saving profile:", editedProfile)
    setIsEditing(false)
    // Show success message
  }

  const handleCancel = () => {
    setEditedProfile(userProfile)
    setIsEditing(false)
  }

  const handleAvatarChange = () => {
    // Handle avatar upload
    console.log("Avatar change requested")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your account information and track your progress</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={editedProfile.avatar || "/placeholder.svg"} alt={editedProfile.name} />
                      <AvatarFallback className="text-2xl">
                        {editedProfile.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                        onClick={handleAvatarChange}
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-3">
                      <Input
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                        className="text-center font-semibold"
                      />
                      <Input
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                        className="text-center text-sm"
                      />
                    </div>
                  ) : (
                    <>
                      <h2 className="text-xl font-semibold mb-1">{editedProfile.name}</h2>
                      <p className="text-gray-600 mb-2">{editedProfile.email}</p>
                    </>
                  )}
                  
                  <Badge variant="secondary" className="mb-4">
                    {editedProfile.role === "student" ? "Student" : "Professor"}
                  </Badge>
                  
                  <div className="flex justify-center gap-2">
                    {isEditing ? (
                      <>
                        <Button size="sm" onClick={handleSave}>
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={editedProfile.location}
                        onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{editedProfile.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">{editedProfile.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">Joined {editedProfile.joinDate}</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Academic Info */}
            {editedProfile.role === "student" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Academic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div>
                        <Label htmlFor="grade">Grade Level</Label>
                        <Select value={editedProfile.grade} onValueChange={(value) => setEditedProfile(prev => ({ ...prev, grade: value }))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Freshman">Freshman</SelectItem>
                            <SelectItem value="Sophomore">Sophomore</SelectItem>
                            <SelectItem value="Junior">Junior</SelectItem>
                            <SelectItem value="Senior">Senior</SelectItem>
                            <SelectItem value="Graduate">Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="major">Major</Label>
                        <Input
                          id="major"
                          value={editedProfile.major}
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, major: e.target.value }))}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Grade Level</span>
                        <span className="text-sm font-medium">{editedProfile.grade}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Major</span>
                        <span className="text-sm font-medium">{editedProfile.major}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">GPA</span>
                        <span className="text-sm font-medium">{editedProfile.gpa}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Stats and Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={editedProfile.bio}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <p className="text-gray-700">{editedProfile.bio}</p>
                )}
              </CardContent>
            </Card>

            {/* Learning Stats */}
            {editedProfile.role === "student" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Learning Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <BookOpen className="w-8 h-8 text-blue-600" />
                      </div>
                      <p className="text-2xl font-bold">{userProfile.learningStats.totalStudyHours}</p>
                      <p className="text-xs text-gray-600">Study Hours</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Target className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-2xl font-bold">{userProfile.learningStats.averageScore}%</p>
                      <p className="text-xs text-gray-600">Avg Score</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Award className="w-8 h-8 text-purple-600" />
                      </div>
                      <p className="text-2xl font-bold">{userProfile.learningStats.completionRate}%</p>
                      <p className="text-xs text-gray-600">Completion</p>
                    </div>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl">🔥</span>
                      </div>
                      <p className="text-2xl font-bold">{userProfile.learningStats.streakDays}</p>
                      <p className="text-xs text-gray-600">Day Streak</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Current Courses */}
            {editedProfile.role === "student" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Courses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userProfile.currentCourses.map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{course.name}</h4>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex-1">
                              <div className="flex justify-between text-sm mb-1">
                                <span>Progress</span>
                                <span>{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className="h-2" />
                            </div>
                            <Badge variant="outline">{course.grade}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userProfile.achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{achievement.title}</h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
