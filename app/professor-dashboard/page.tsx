"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Navigation } from "@/components/navigation"
import { ClapperboardIcon as ChalkboardTeacher, Users, BookOpen, BarChart3, Plus, Settings, Upload, X } from 'lucide-react'
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const professorClasses = [
  {
    id: "cs101-prof",
    name: "CS 101: Introduction to Computer Science",
    department: "Computer Science",
    credits: 3,
    enrolledStudents: 45,
    totalModules: 8,
    completedAssignments: 12,
    avgProgress: 78,
  }
]

export default function ProfessorDashboard() {
  const [showCreateCourse, setShowCreateCourse] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showAnalytics, setShowAnalytics] = useState(false)

  const handleCreateCourse = () => {
    window.location.href = "/"
  }

  const handleUploadFiles = () => {
    setShowUploadModal(true)
  }

  const handleViewReports = () => {
    setShowAnalytics(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Professor Dashboard</h1>
          <p className="text-gray-600">Manage your courses and track student progress</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">1</p>
                  <p className="text-sm text-gray-600">Active Courses</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">45</p>
                  <p className="text-sm text-gray-600">Total Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">78%</p>
                  <p className="text-sm text-gray-600">Avg Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <ChalkboardTeacher className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-gray-600">Course Modules</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">My Courses</h2>
              <Button onClick={handleCreateCourse}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Course
              </Button>
            </div>
            
            <div className="space-y-4">
              {professorClasses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{course.name}</CardTitle>
                        <CardDescription>
                          {course.department} • {course.credits} credits
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">
                        {course.enrolledStudents} students
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-blue-600">{course.totalModules}</p>
                        <p className="text-xs text-gray-600">Modules</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-600">{course.completedAssignments}</p>
                        <p className="text-xs text-gray-600">Assignments</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-purple-600">{course.avgProgress}%</p>
                        <p className="text-xs text-gray-600">Avg Progress</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Manage
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Resources
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <ChalkboardTeacher className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="font-semibold mb-2">Create New Course</h3>
                    <p className="text-sm text-gray-600 mb-4">Set up a new course with AI-generated roadmap</p>
                    <Button className="w-full" onClick={handleCreateCourse}>Get Started</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-green-600" />
                    <h3 className="font-semibold mb-2">Upload Resources</h3>
                    <p className="text-sm text-gray-600 mb-4">Add materials to existing courses</p>
                    <Button variant="outline" className="w-full" onClick={handleUploadFiles}>Upload Files</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 mx-auto mb-4 text-purple-600" />
                    <h3 className="font-semibold mb-2">View Analytics</h3>
                    <p className="text-sm text-gray-600 mb-4">Track student progress and engagement</p>
                    <Button variant="outline" className="w-full" onClick={handleViewReports}>View Reports</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      {/* Upload Files Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Upload Course Resources
                <Button variant="ghost" size="sm" onClick={() => setShowUploadModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
              <CardDescription>Add materials to your courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="courseSelect">Select Course</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cs101">CS 101: Introduction to Computer Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="fileUpload">Files</Label>
                <div className="mt-2">
                  <input
                    id="fileUpload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('fileUpload')?.click()}
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose Files
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1">Upload</Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowUploadModal(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Analytics View */}
      {showAnalytics && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Course Analytics
                <Button variant="ghost" size="sm" onClick={() => setShowAnalytics(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </CardTitle>
              <CardDescription>Student progress and engagement metrics</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">78%</p>
                      <p className="text-sm text-gray-600">Average Progress</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">92%</p>
                      <p className="text-sm text-gray-600">Completion Rate</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">4.2</p>
                      <p className="text-sm text-gray-600">Avg Rating</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Student Progress</h3>
                <div className="space-y-3">
                  {[
                    { name: "Alice Johnson", progress: 95, modules: "8/8" },
                    { name: "Bob Smith", progress: 87, modules: "7/8" },
                    { name: "Carol Davis", progress: 72, modules: "6/8" },
                    { name: "David Wilson", progress: 68, modules: "5/8" },
                    { name: "Emma Brown", progress: 45, modules: "4/8" },
                  ].map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-gray-600">Modules: {student.modules}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{student.progress}%</p>
                        <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Module Engagement</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { module: "Module 1", engagement: 98 },
                    { module: "Module 2", engagement: 94 },
                    { module: "Module 3", engagement: 89 },
                    { module: "Module 4", engagement: 85 },
                    { module: "Module 5", engagement: 78 },
                    { module: "Module 6", engagement: 72 },
                    { module: "Module 7", engagement: 65 },
                    { module: "Module 8", engagement: 58 },
                  ].map((item, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="text-center">
                          <p className="text-lg font-bold">{item.engagement}%</p>
                          <p className="text-xs text-gray-600">{item.module}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
