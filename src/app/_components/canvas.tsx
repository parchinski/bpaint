'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const rainbowColors = [
  { name: 'Red', hex: '#FF0000' },
  { name: 'Orange', hex: '#FF7F00' },
  { name: 'Yellow', hex: '#FFFF00' },
  { name: 'Green', hex: '#00FF00' },
  { name: 'Blue', hex: '#0000FF' },
  { name: 'Indigo', hex: '#4B0082' },
  { name: 'Violet', hex: '#9400D3' },
]

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#000000')
  const [brushSize, setBrushSize] = useState(5)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.lineCap = 'round'
        context.lineJoin = 'round'
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.beginPath()
        context.moveTo(
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY
        )
        setIsDrawing(true)
      }
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.strokeStyle = color
        context.lineWidth = brushSize
        context.lineTo(
          e.nativeEvent.offsetX,
          e.nativeEvent.offsetY
        )
        context.stroke()
      }
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height)
      }
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <h1 className="text-2xl font-bold">MS Paint Clone</h1>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        className="border border-gray-300"
      />
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-3xl">
        <div className="flex flex-col items-center">
          <Label htmlFor="color" className="mb-2">Custom Color</Label>
          <Input
            id="color"
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-16 h-16"
          />
        </div>
        <div className="flex flex-col items-center">
          <Label htmlFor="brushSize" className="mb-2">Brush Size: {brushSize}</Label>
          <Input
            id="brushSize"
            type="range"
            min="1"
            max="50"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-40"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="mb-2">Rainbow Colors</span>
          <div className="flex flex-wrap gap-2">
            {rainbowColors.map((rainbowColor) => (
              <Button
                key={rainbowColor.name}
                onClick={() => setColor(rainbowColor.hex)}
                className="w-8 h-8 p-0"
                style={{ backgroundColor: rainbowColor.hex }}
                title={rainbowColor.name}
              />
            ))}
          </div>
        </div>
        <Button onClick={clearCanvas} className="self-end">Clear Canvas</Button>
      </div>
    </div>
  )
}
