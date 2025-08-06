"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RotateCcw, Palette } from 'lucide-react'

interface DrawingCanvasProps {
  onDrawingChange: (drawing: string) => void
}

export function DrawingCanvas({ onDrawingChange }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentColor, setCurrentColor] = useState("#000000")
  const [lineWidth, setLineWidth] = useState(2)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = 600
    canvas.height = 400

    // Set initial styles
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.strokeStyle = currentColor
    ctx.lineWidth = lineWidth

    // Fill with white background
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    setIsDrawing(true)
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.lineTo(x, y)
    ctx.stroke()
  }

  const stopDrawing = () => {
    if (!isDrawing) return
    
    setIsDrawing(false)
    
    // Convert canvas to data URL and notify parent
    const canvas = canvasRef.current
    if (canvas) {
      const dataURL = canvas.toDataURL()
      onDrawingChange(dataURL)
    }
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    onDrawingChange("")
  }

  const changeColor = (color: string) => {
    setCurrentColor(color)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    ctx.strokeStyle = color
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4" />
          <span className="text-sm font-medium">Tools:</span>
        </div>
        
        <div className="flex gap-2">
          {["#000000", "#ff0000", "#0000ff", "#00ff00", "#ff00ff"].map((color) => (
            <button
              key={color}
              onClick={() => changeColor(color)}
              className={`w-6 h-6 rounded-full border-2 ${
                currentColor === color ? "border-gray-400" : "border-gray-200"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>

        <Button variant="outline" size="sm" onClick={clearCanvas}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="cursor-crosshair bg-white"
          style={{ width: "100%", height: "300px" }}
        />
      </div>
      
      <p className="text-xs text-gray-500">
        Click and drag to draw. Use different colors and the clear button as needed.
      </p>
    </div>
  )
}
