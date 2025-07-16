"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddSubjectForm } from "@/components/add-subject-form"
import { DailySchedule } from "@/components/daily-schedule"
import { CalendarView } from "@/components/calendar-view"
import { ProgressTracker } from "@/components/progress-tracker"
import { v4 as uuidv4 } from "uuid" // For unique IDs

interface Subject {
  id: string
  name: string
  goal: string
  dailyStudyTime: number // in minutes
  examDates: string[] // ISO date strings
}

interface DailyTask {
  id: string
  subjectId: string
  subjectName: string
  duration: number // in minutes
  completed: boolean
}

export default function DailyStudyPlanner() {
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([])

  // Simulate daily task generation (simplified scheduler)
  useEffect(() => {
    const generatedTasks: DailyTask[] = subjects.map((subject) => ({
      id: uuidv4(),
      subjectId: subject.id,
      subjectName: subject.name,
      duration: subject.dailyStudyTime,
      completed: false,
    }))
    setDailyTasks(generatedTasks)
  }, [subjects])

  const handleAddSubject = (newSubject: Omit<Subject, "id">) => {
    setSubjects((prevSubjects) => [...prevSubjects, { id: uuidv4(), ...newSubject }])
  }

  const handleToggleTaskCompletion = (taskId: string) => {
    setDailyTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    )
  }

  const completedTasksCount = dailyTasks.filter((task) => task.completed).length
  const totalTasksCount = dailyTasks.length

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Daily Study Planner</h1>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule" className="mt-6">
            <DailySchedule
              subjects={subjects.map((s) => ({ id: s.id, name: s.name, dailyStudyTime: s.dailyStudyTime }))}
            />
          </TabsContent>

          <TabsContent value="subjects" className="mt-6">
            <AddSubjectForm onAddSubject={handleAddSubject} />
            <div className="mt-6 grid gap-4">
              {subjects.length === 0 ? (
                <p className="text-center text-muted-foreground">No subjects added yet.</p>
              ) : (
                subjects.map((subject) => (
                  <div key={subject.id} className="rounded-md border p-4">
                    <h3 className="font-semibold text-lg">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground">{subject.goal}</p>
                    <p className="text-sm text-muted-foreground">Daily Study: {subject.dailyStudyTime} mins</p>
                    {subject.examDates.length > 0 && (
                      <p className="text-sm text-muted-foreground">Exams: {subject.examDates.join(", ")}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-6">
            <CalendarView subjects={subjects} />
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            <ProgressTracker
              totalSubjects={subjects.length}
              completedTasksToday={completedTasksCount}
              totalTasksToday={totalTasksCount}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
