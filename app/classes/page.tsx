"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, Atom, Globe, BookOpen, Plus, User } from 'lucide-react'
import Link from "next/link"
import { Navigation } from "@/components/navigation"

const enrolledClasses = [
  {
    id: "cs201",
    name: "CS 201: Data Structures and Algorithms",
    department: "Computer Science",
    professor: "Prof. Johnson",
    credits: 4,
    progress: 75,
    modules: 12,
    completedModules: 9,
  },
  {
    id: "math151",
    name: "MATH 151: Calculus I",
    department: "Mathematics", 
    professor: "Dr. Williams",
    credits: 4,
    progress: 60,
    modules: 10,
    completedModules: 6,
  },
  {
    id: "phys201",
    name: "PHYS 201: General Physics I",
    department: "Physics",
    professor: "Dr. Anderson",
    credits: 4,
    progress: 85,
    modules: 8,
    completedModules: 7,
  },
  {
    id: "eng201",
    name: "ENG 201: World Literature",
    department: "English",
    professor: "Dr. Lewis",
    credits: 3,
    progress: 40,
    modules: 15,
    completedModules: 6,
  },
]

export default function ClassesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Classes</h1>
          <p className="text-gray-600">Continue your learning journey</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {enrolledClasses.map((classItem) => {
            const Icon = BookOpen // Assuming BookOpen is the icon for all classes for simplicity
            return (
              <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg leading-tight">{classItem.name}</CardTitle>
                      <CardDescription className="mt-1">
                        <div className="flex items-center gap-1 text-sm">
                          <User className="w-3 h-3" />
                          {classItem.professor}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {classItem.department} • {classItem.credits} credits
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{classItem.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${classItem.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{classItem.completedModules} of {classItem.modules} modules</span>
                      <Badge variant="secondary">
                        {classItem.modules - classItem.completedModules} remaining
                      </Badge>
                    </div>

                    <Link href={`/roadmap/${classItem.id}`}>
                      <Button className="w-full">
                        View Roadmap
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Floating Add Class Button */}
        <div className="fixed bottom-6 right-6">
          <Button size="lg" className="rounded-full shadow-lg">
            <Plus className="w-5 h-5 mr-2" />
            Add Class
          </Button>
        </div>
      </div>
    </div>
  )
}
