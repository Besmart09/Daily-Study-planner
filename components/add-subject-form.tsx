"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

interface AddSubjectFormProps {
  onAddSubject: (subject: {
    name: string
    goal: string
    dailyStudyTime: number
    examDates: string[]
  }) => void
}

export function AddSubjectForm({ onAddSubject }: AddSubjectFormProps) {
  const [name, setName] = useState("")
  const [goal, setGoal] = useState("")
  const [dailyStudyTime, setDailyStudyTime] = useState(60) // default to 60 minutes
  const [examDatesInput, setExamDatesInput] = useState("") // comma-separated dates

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() === "" || goal.trim() === "") {
      alert("Please fill in subject name and goal.")
      return
    }

    const examDates = examDatesInput
      .split(",")
      .map((date) => date.trim())
      .filter((date) => date !== "")
      .sort()

    onAddSubject({
      name,
      goal,
      dailyStudyTime,
      examDates,
    })

    setName("")
    setGoal("")
    setDailyStudyTime(60)
    setExamDatesInput("")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Add New Subject</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="subject-name">Subject Name</Label>
            <Input
              id="subject-name"
              placeholder="e.g., Calculus I"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="study-goal">Study Goal</Label>
            <Textarea
              id="study-goal"
              placeholder="e.g., Master derivatives and integrals"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="daily-study-time">Daily Study Time (minutes)</Label>
            <Input
              id="daily-study-time"
              type="number"
              value={dailyStudyTime}
              onChange={(e) => setDailyStudyTime(Number.parseInt(e.target.value) || 0)}
              min="0"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="exam-dates">Upcoming Exam Dates (comma-separated, YYYY-MM-DD)</Label>
            <Input
              id="exam-dates"
              placeholder="e.g., 2025-08-15, 2025-12-01"
              value={examDatesInput}
              onChange={(e) => setExamDatesInput(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Subject
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
