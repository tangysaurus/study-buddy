"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Lightbulb, Send, RotateCcw, Palette } from 'lucide-react'
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { DrawingCanvas } from "@/components/drawing-canvas"

const lessonContent = {
  title: "Solving Quadratic Equations",
  description: "Learn different methods to solve quadratic equations",
  content: `
    A quadratic equation is a polynomial equation of degree 2, typically written in the form:
    
    **ax² + bx + c = 0**
    
    Where a, b, and c are constants and a ≠ 0.
    
    There are several methods to solve quadratic equations:
    
    1. **Factoring**: When the quadratic can be factored into two binomials
    2. **Quadratic Formula**: x = (-b ± √(b² - 4ac)) / 2a
    3. **Completing the Square**: Rewriting the equation in perfect square form
    4. **Graphing**: Finding where the parabola crosses the x-axis
  `,
  problems: [
    {
      id: 1,
      type: "multiple-choice",
      question: "What are the solutions to x² - 5x + 6 = 0?",
      options: ["x = 2, 3", "x = 1, 6", "x = -2, -3", "x = 2, -3"],
      correct: 0,
    },
    {
      id: 2,
      type: "short-answer",
      question: "Solve the equation x² + 4x - 5 = 0 using the quadratic formula.",
    },
    {
      id: 3,
      type: "drawing",
      question: "Graph the parabola y = x² - 4x + 3 and mark the x-intercepts.",
    },
  ],
}

export default function LessonPage({ params }: { params: { classId: string; moduleId: string } }) {
  const [currentProblem, setCurrentProblem] = useState(0)
  const [answers, setAnswers] = useState<Record<number, any>>({})
  const [showHint, setShowHint] = useState(false)
  const [aiFeedback, setAiFeedback] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)

  const classData = {
    "cs201": { name: "CS 201: Data Structures and Algorithms", department: "Computer Science" },
    "math151": { name: "MATH 151: Calculus I", department: "Mathematics" },
    "phys201": { name: "PHYS 201: General Physics I", department: "Physics" },
    "eng201": { name: "ENG 201: World Literature", department: "English" },
  }

  const currentClass = classData[params.classId as keyof typeof classData] || { name: "Unknown Class", department: "Unknown" }
  const className = currentClass.name

  const problem = lessonContent.problems[currentProblem]

  const handleAnswerChange = (value: any) => {
    setAnswers(prev => ({ ...prev, [problem.id]: value }))
  }

  const handleSubmit = () => {
    // Simulate AI feedback
    setAiFeedback("Great work! Your solution shows good understanding of the quadratic formula. Remember to always check your answers by substituting back into the original equation.")
    setShowFeedback(true)
  }

  const handleGetHint = () => {
    setShowHint(true)
  }

  const nextProblem = () => {
    if (currentProblem < lessonContent.problems.length - 1) {
      setCurrentProblem(currentProblem + 1)
      setShowHint(false)
      setShowFeedback(false)
    }
  }

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
              <BreadcrumbLink href={`/roadmap/${params.classId}`}>{className}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{lessonContent.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href={`/roadmap/${params.classId}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Roadmap
              </Button>
            </Link>
            <Badge variant="secondary">Module {params.moduleId}</Badge>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{lessonContent.title}</h1>
          <p className="text-gray-600">{lessonContent.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Information Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Lesson Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {lessonContent.content.split('\n').map((line, index) => (
                    <p key={index} className="mb-2">
                      {line.includes('**') ? (
                        <strong>{line.replace(/\*\*/g, '')}</strong>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Problem Sets Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Problem {currentProblem + 1} of {lessonContent.problems.length}</CardTitle>
                  <Progress value={(currentProblem + 1) / lessonContent.problems.length * 100} className="w-24" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-lg font-medium">{problem.question}</p>

                {problem.type === "multiple-choice" && (
                  <RadioGroup
                    value={answers[problem.id]?.toString()}
                    onValueChange={(value) => handleAnswerChange(parseInt(value))}
                  >
                    {problem.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {problem.type === "short-answer" && (
                  <Textarea
                    placeholder="Enter your answer here..."
                    value={answers[problem.id] || ""}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    rows={4}
                  />
                )}

                {problem.type === "drawing" && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Palette className="w-4 h-4" />
                      Use the drawing area below to sketch your answer
                    </div>
                    <DrawingCanvas onDrawingChange={handleAnswerChange} />
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleGetHint}>
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Get Hint
                  </Button>
                  <Button onClick={handleSubmit}>
                    <Send className="w-4 h-4 mr-2" />
                    Submit
                  </Button>
                  {currentProblem < lessonContent.problems.length - 1 && (
                    <Button onClick={nextProblem} variant="secondary">
                      Next Question
                    </Button>
                  )}
                </div>

                {showHint && (
                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="font-medium text-yellow-800">Hint:</p>
                          <p className="text-yellow-700">
                            {problem.type === "multiple-choice" && "Try factoring the quadratic first. Look for two numbers that multiply to 6 and add to -5."}
                            {problem.type === "short-answer" && "Remember the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a. Identify a=1, b=4, c=-5."}
                            {problem.type === "drawing" && "Start by finding the vertex using x = -b/2a, then plot a few points on either side."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {showFeedback && (
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="pt-4">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-white text-xs">AI</span>
                        </div>
                        <div>
                          <p className="font-medium text-green-800">AI Feedback:</p>
                          <p className="text-green-700">{aiFeedback}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
