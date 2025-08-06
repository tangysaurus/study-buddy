"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Circle, Play, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

const modules = [
  {
    id: 1,
    title: "Introduction to Algebra",
    description: "Basic algebraic concepts and operations",
    progress: 100,
    completed: true,
    lessons: 5,
  },
  {
    id: 2,
    title: "Linear Equations",
    description: "Solving and graphing linear equations",
    progress: 100,
    completed: true,
    lessons: 7,
  },
  {
    id: 3,
    title: "Quadratic Functions",
    description: "Understanding parabolas and quadratic equations",
    progress: 80,
    completed: false,
    lessons: 6,
    currentLesson: 5,
  },
  {
    id: 4,
    title: "Polynomial Operations",
    description: "Adding, subtracting, and multiplying polynomials",
    progress: 0,
    completed: false,
    lessons: 8,
  },
  {
    id: 5,
    title: "Factoring",
    description: "Factoring techniques for polynomials",
    progress: 0,
    completed: false,
    lessons: 9,
  },
  {
    id: 6,
    title: "Rational Functions",
    description: "Working with rational expressions and equations",
    progress: 0,
    completed: false,
    lessons: 6,
  },
]

const classData = {
  "cs201": { name: "CS 201: Data Structures and Algorithms", department: "Computer Science" },
  "math151": { name: "MATH 151: Calculus I", department: "Mathematics" },
  "phys201": { name: "PHYS 201: General Physics I", department: "Physics" },
  "eng201": { name: "ENG 201: World Literature", department: "English" },
}

export default function RoadmapPage({ params }: { params: { classId: string } }) {
  const currentClass = classData[params.classId as keyof typeof classData] || { name: "Unknown Class", department: "Unknown" }
  const className = currentClass.name
  const overallProgress = Math.round(modules.reduce((acc, module) => acc + module.progress, 0) / modules.length)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/classes">Classes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{className}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/classes">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Classes
              </Button>
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{className} Roadmap</h1>
          <p className="text-gray-600 mb-4">Track your progress through the course modules</p>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-gray-600">{overallProgress}% Complete</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {modules.map((module, index) => (
            <Card key={module.id} className={`transition-all ${module.progress > 0 ? 'border-blue-200' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {module.completed ? (
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    ) : module.progress > 0 ? (
                      <div className="relative">
                        <Circle className="w-8 h-8 text-blue-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 bg-blue-500 rounded-full" />
                        </div>
                      </div>
                    ) : (
                      <Circle className="w-8 h-8 text-gray-300" />
                    )}
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{module.title}</h3>
                      <div className="flex items-center gap-2">
                        {module.completed && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Completed
                          </Badge>
                        )}
                        {module.progress > 0 && !module.completed && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                            In Progress
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-3">{module.description}</p>
                    
                    {module.progress > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {module.lessons} lessons
                        {module.currentLesson && ` • Lesson ${module.currentLesson} of ${module.lessons}`}
                      </span>
                      
                      <Link href={`/lesson/${params.classId}/${module.id}`}>
                        <Button 
                          variant={module.progress > 0 ? "default" : "outline"}
                          disabled={index > 0 && modules[index - 1].progress === 0}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          {module.completed ? "Review" : module.progress > 0 ? "Continue" : "Start Lesson"}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
