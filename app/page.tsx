"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, Calculator, Atom, Globe, Palette, Music, FlaskConical, Users, Eye, Headphones, Hand, PenTool, Search, X, GraduationCap, User, ClapperboardIcon as ChalkboardTeacher, Upload, Sparkles } from 'lucide-react'
import { Badge } from "@/components/ui/badge"

const universityClasses = [
  // Computer Science
  { id: "cs101", name: "CS 101: Introduction to Computer Science", department: "Computer Science", credits: 3, professor: "Dr. Smith" },
  { id: "cs201", name: "CS 201: Data Structures and Algorithms", department: "Computer Science", credits: 4, professor: "Prof. Johnson" },
  { id: "cs301", name: "CS 301: Database Systems", department: "Computer Science", credits: 3, professor: "Dr. Chen" },
  
  // Mathematics
  { id: "math151", name: "MATH 151: Calculus I", department: "Mathematics", credits: 4, professor: "Dr. Williams" },
  { id: "math152", name: "MATH 152: Calculus II", department: "Mathematics", credits: 4, professor: "Prof. Davis" },
  { id: "math251", name: "MATH 251: Multivariable Calculus", department: "Mathematics", credits: 4, professor: "Dr. Brown" },
  { id: "math341", name: "MATH 341: Linear Algebra", department: "Mathematics", credits: 3, professor: "Prof. Miller" },
  
  // Physics
  { id: "phys201", name: "PHYS 201: General Physics I", department: "Physics", credits: 4, professor: "Dr. Anderson" },
  { id: "phys202", name: "PHYS 202: General Physics II", department: "Physics", credits: 4, professor: "Prof. Taylor" },
  { id: "phys301", name: "PHYS 301: Modern Physics", department: "Physics", credits: 3, professor: "Dr. Wilson" },
  
  // Chemistry
  { id: "chem101", name: "CHEM 101: General Chemistry I", department: "Chemistry", credits: 4, professor: "Dr. Garcia" },
  { id: "chem102", name: "CHEM 102: General Chemistry II", department: "Chemistry", credits: 4, professor: "Prof. Martinez" },
  { id: "chem301", name: "CHEM 301: Organic Chemistry I", department: "Chemistry", credits: 4, professor: "Dr. Rodriguez" },
  
  // Biology
  { id: "bio101", name: "BIO 101: Introduction to Biology", department: "Biology", credits: 4, professor: "Dr. Thompson" },
  { id: "bio201", name: "BIO 201: Cell Biology", department: "Biology", credits: 3, professor: "Prof. White" },
  { id: "bio301", name: "BIO 301: Genetics", department: "Biology", credits: 3, professor: "Dr. Lee" },
  
  // English
  { id: "eng101", name: "ENG 101: Composition I", department: "English", credits: 3, professor: "Prof. Clark" },
  { id: "eng201", name: "ENG 201: World Literature", department: "English", credits: 3, professor: "Dr. Lewis" },
  { id: "eng301", name: "ENG 301: Advanced Writing", department: "English", credits: 3, professor: "Prof. Walker" },
  
  // History
  { id: "hist101", name: "HIST 101: World History I", department: "History", credits: 3, professor: "Dr. Hall" },
  { id: "hist201", name: "HIST 201: American History", department: "History", credits: 3, professor: "Prof. Young" },
  { id: "hist301", name: "HIST 301: Modern European History", department: "History", credits: 3, professor: "Dr. King" },
  
  // Psychology
  { id: "psyc101", name: "PSYC 101: Introduction to Psychology", department: "Psychology", credits: 3, professor: "Dr. Wright" },
  { id: "psyc201", name: "PSYC 201: Developmental Psychology", department: "Psychology", credits: 3, professor: "Prof. Green" },
  { id: "psyc301", name: "PSYC 301: Cognitive Psychology", department: "Psychology", credits: 3, professor: "Dr. Adams" },
  
  // Economics
  { id: "econ101", name: "ECON 101: Microeconomics", department: "Economics", credits: 3, professor: "Prof. Baker" },
  { id: "econ102", name: "ECON 102: Macroeconomics", department: "Economics", credits: 3, professor: "Dr. Nelson" },
  { id: "econ301", name: "ECON 301: Intermediate Microeconomics", department: "Economics", credits: 3, professor: "Prof. Carter" },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({
    name: "",
    role: "", // "student" or "professor"
    selectedClasses: [] as string[],
    // Professor-specific fields
    className: "",
    courseCode: "",
    department: "",
    credits: "",
    description: "",
    uploadedFiles: [] as File[],
    roadmapPrompt: "",
    generatedRoadmap: [] as any[],
  })

  // Add search state
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState(false)

  // Get unique departments
  const departments = ["all", ...Array.from(new Set(universityClasses.map(c => c.department)))]

  // Filter classes based on search and department
  const filteredClasses = universityClasses.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === "all" || classItem.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  const handleClassToggle = (classId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedClasses: prev.selectedClasses.includes(classId)
        ? prev.selectedClasses.filter(id => id !== classId)
        : [...prev.selectedClasses, classId]
    }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setFormData(prev => ({
      ...prev,
      uploadedFiles: [...prev.uploadedFiles, ...files]
    }))
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }))
  }

  const generateRoadmap = async () => {
    setIsGeneratingRoadmap(true)
    
    // Simulate AI roadmap generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const sampleRoadmap = [
      {
        id: 1,
        title: "Course Introduction & Fundamentals",
        description: "Overview of key concepts and foundational knowledge",
        duration: "Week 1-2",
        topics: ["Course overview", "Basic terminology", "Historical context"]
      },
      {
        id: 2,
        title: "Core Concepts",
        description: "Deep dive into the main theoretical framework",
        duration: "Week 3-5",
        topics: ["Primary theories", "Key principles", "Case studies"]
      },
      {
        id: 3,
        title: "Practical Applications",
        description: "Hands-on exercises and real-world examples",
        duration: "Week 6-8",
        topics: ["Lab work", "Projects", "Problem solving"]
      },
      {
        id: 4,
        title: "Advanced Topics",
        description: "Complex concepts and current research",
        duration: "Week 9-12",
        topics: ["Recent developments", "Research methods", "Future directions"]
      },
      {
        id: 5,
        title: "Assessment & Review",
        description: "Final projects and comprehensive review",
        duration: "Week 13-15",
        topics: ["Final project", "Peer review", "Course reflection"]
      }
    ]
    
    setFormData(prev => ({
      ...prev,
      generatedRoadmap: sampleRoadmap
    }))
    setIsGeneratingRoadmap(false)
  }

  const handleNext = () => {
    if (formData.role === "student") {
      if (step < 1) {
        setStep(step + 1)
      } else {
        window.location.href = "/classes"
      }
    } else if (formData.role === "professor") {
      if (step < 2) {
        setStep(step + 1)
      } else {
        window.location.href = "/professor-dashboard"
      }
    } else {
      if (step < 1) {
        setStep(step + 1)
      }
    }
  }

  const canProceed = () => {
    switch (step) {
      case 0:
        return formData.name && formData.role
      case 1:
        if (formData.role === "student") {
          return formData.selectedClasses.length > 0
        } else if (formData.role === "professor") {
          return formData.className && formData.courseCode && formData.department && formData.credits && formData.description
        }
        return false
      case 2:
        if (formData.role === "professor") {
          return true // Files are optional
        }
        return false
      case 3:
        return formData.role === "professor" // Final step for professors
      default:
        return false
    }
  }

  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-24">
          <div className="text-center mb-24">
            <h1 className="text-5xl font-bold text-gray-900 mb-8">
              Welcome to Bearious!
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
              AI-powered roadmaps, problem sets, and feedback for Berkeley students — with streamlined course organization for professors..
            </p>
            <div className="flex justify-center gap-16 mb-20">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-10 h-10 text-blue-600" />
                </div>
                <p className="text-base font-medium">Personalized Learning</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Atom className="w-10 h-10 text-green-600" />
                </div>
                <p className="text-base font-medium">AI-Powered Feedback</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-purple-600" />
                </div>
                <p className="text-base font-medium">Interactive Learning</p>
              </div>
            </div>
          </div>

          {/* Step 1: Basic Info & Role Selection */}
          <Card className="max-w-md mx-auto">
            <CardHeader>
              <CardTitle>Let's get started!</CardTitle>
              <CardDescription>Tell us a bit about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="name">What's your name?</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <Label>I am a...</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div
                    onClick={() => setFormData(prev => ({ ...prev, role: "student" }))}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.role === "student"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-center">
                      <User className={`w-8 h-8 mx-auto mb-2 ${formData.role === "student" ? "text-blue-600" : "text-gray-600"}`} />
                      <p className="font-medium">Student</p>
                      <p className="text-xs text-gray-500">Learn from courses</p>
                    </div>
                  </div>
                  
                  <div
                    onClick={() => setFormData(prev => ({ ...prev, role: "professor" }))}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.role === "professor"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="text-center">
                      <ChalkboardTeacher className={`w-8 h-8 mx-auto mb-2 ${formData.role === "professor" ? "text-blue-600" : "text-gray-600"}`} />
                      <p className="font-medium">Professor</p>
                      <p className="text-xs text-gray-500">Create courses</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button onClick={handleNext} disabled={!canProceed()} className="w-full">
                Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === 1 && formData.role === "student") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-6xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2">
                <GraduationCap className="w-6 h-6" />
                Select Your Classes
              </CardTitle>
              <CardDescription>Search and choose the courses you're currently taking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search and Filter Section */}
              <div className="mb-6 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by course name, professor, or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {departments.map((dept) => (
                    <Button
                      key={dept}
                      variant={selectedDepartment === dept ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedDepartment(dept)}
                    >
                      {dept === "all" ? "All Departments" : dept}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Selected Classes Summary */}
              {formData.selectedClasses.length > 0 && (
                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-blue-900">Selected Classes ({formData.selectedClasses.length})</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedClasses.map((classId) => {
                      const classItem = universityClasses.find(c => c.id === classId)
                      return (
                        <Badge key={classId} variant="secondary" className="bg-blue-100 text-blue-800">
                          {classItem?.name}
                          <button
                            onClick={() => handleClassToggle(classId)}
                            className="ml-2 hover:bg-blue-200 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Classes Grid */}
              <div className="max-h-96 overflow-y-auto mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredClasses.map((classItem) => {
                    const isSelected = formData.selectedClasses.includes(classItem.id)
                    return (
                      <div
                        key={classItem.id}
                        onClick={() => handleClassToggle(classItem.id)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-sm mb-1">{classItem.name}</h3>
                            <p className="text-xs text-gray-600 mb-1">
                              {classItem.department} • {classItem.credits} credits
                            </p>
                            <p className="text-xs text-gray-500">{classItem.professor}</p>
                          </div>
                          <Checkbox
                            checked={isSelected}
                            className="mt-1"
                            readOnly
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
                
                {filteredClasses.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Search className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No classes found matching your search.</p>
                    <p className="text-sm">Try adjusting your search terms or department filter.</p>
                  </div>
                )}
              </div>

              <Button onClick={handleNext} disabled={!canProceed()} className="w-full">
                Get Started!
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === 1 && formData.role === "professor") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChalkboardTeacher className="w-6 h-6" />
                Create Your Class
              </CardTitle>
              <CardDescription>Set up your course information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="courseCode">Course Code</Label>
                  <Input
                    id="courseCode"
                    value={formData.courseCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, courseCode: e.target.value }))}
                    placeholder="e.g., CS 101"
                  />
                </div>
                <div>
                  <Label htmlFor="credits">Credits</Label>
                  <Select value={formData.credits} onValueChange={(value) => setFormData(prev => ({ ...prev, credits: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Credits" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Credit</SelectItem>
                      <SelectItem value="2">2 Credits</SelectItem>
                      <SelectItem value="3">3 Credits</SelectItem>
                      <SelectItem value="4">4 Credits</SelectItem>
                      <SelectItem value="5">5 Credits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="className">Class Name</Label>
                <Input
                  id="className"
                  value={formData.className}
                  onChange={(e) => setFormData(prev => ({ ...prev, className: e.target.value }))}
                  placeholder="e.g., Introduction to Computer Science"
                />
              </div>
              
              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={formData.department} onValueChange={(value) => setFormData(prev => ({ ...prev, department: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Science">Computer Science</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Physics">Physics</SelectItem>
                    <SelectItem value="Chemistry">Chemistry</SelectItem>
                    <SelectItem value="Biology">Biology</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                    <SelectItem value="Psychology">Psychology</SelectItem>
                    <SelectItem value="Economics">Economics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="description">Course Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what students will learn in this course..."
                  rows={4}
                />
              </div>
              
              <Button onClick={handleNext} disabled={!canProceed()} className="w-full">
                Continue
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === 2 && formData.role === "professor") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-6 h-6" />
                Upload Course Resources
              </CardTitle>
              <CardDescription>Add materials that will help generate your course roadmap (optional)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="fileUpload">Course Materials</Label>
                <div className="mt-2">
                  <input
                    id="fileUpload"
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                    onChange={handleFileUpload}
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
                <p className="text-xs text-gray-500 mt-1">
                  Supported formats: PDF, Word, PowerPoint, Text files
                </p>
              </div>

              {formData.uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files</Label>
                  <div className="space-y-2">
                    {formData.uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button onClick={handleNext} className="w-full">
                Continue to Roadmap Generation
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === 3 && formData.role === "professor") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-24">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                Generate Course Roadmap
              </CardTitle>
              <CardDescription>Let AI create a personalized learning path for your students</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="roadmapPrompt">Course Goals & Requirements</Label>
                <Textarea
                  id="roadmapPrompt"
                  value={formData.roadmapPrompt}
                  onChange={(e) => setFormData(prev => ({ ...prev, roadmapPrompt: e.target.value }))}
                  placeholder="Describe what you want students to achieve, any specific topics to cover, assessment methods, etc..."
                  rows={4}
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={generateRoadmap} 
                  disabled={isGeneratingRoadmap}
                  className="flex-1"
                >
                  {isGeneratingRoadmap ? (
                    <>
                      <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                      Generating Roadmap...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate AI Roadmap
                    </>
                  )}
                </Button>
              </div>

              {formData.generatedRoadmap.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Generated Course Roadmap</h3>
                  <div className="space-y-4">
                    {formData.generatedRoadmap.map((module, index) => (
                      <Card key={module.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold">{module.title}</h4>
                            <Badge variant="secondary">{module.duration}</Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{module.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {module.topics.map((topic: string, topicIndex: number) => (
                              <Badge key={topicIndex} variant="outline" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              <Button onClick={handleNext} className="w-full" disabled={formData.generatedRoadmap.length === 0}>
                Create Course
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return null
}
