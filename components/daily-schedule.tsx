"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format } from "date-fns"

interface DailyScheduleProps {
  subjects: {
    id: string
    name: string
    dailyStudyTime: number
  }[]
}

interface DailyTask {
  id: string
  subjectName: string
  duration: number // in minutes
  completed: boolean
}

export function DailySchedule({ subjects }: DailyScheduleProps) {
  const [tasks, setTasks] = useState<DailyTask[]>(() => {
    // Generate initial tasks based on subjects
    return subjects.map((subject) => ({
      id: `task-${subject.id}-${Date.now()}`,
      subjectName: subject.name,
      duration: subject.dailyStudyTime,
      completed: false,
    }))
  })

  const handleToggleComplete = (id: string) => {
    setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const today = format(new Date(), "EEEE, MMMM d, yyyy")

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Daily Schedule</CardTitle>
        <p className="text-sm text-muted-foreground">{today}</p>
      </CardHeader>
      <CardContent>
        {tasks.length === 0 ? (
          <p className="text-center text-muted-foreground">No tasks scheduled for today. Add some subjects!</p>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="grid gap-4">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between rounded-md border p-4 transition-colors ${
                    task.completed ? "bg-muted text-muted-foreground line-through" : "hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => handleToggleComplete(task.id)}
                    />
                    <Label htmlFor={`task-${task.id}`} className="grid gap-1 font-medium leading-none">
                      <span className="text-base">{task.subjectName}</span>
                      <span className="text-sm text-muted-foreground">{task.duration} minutes</span>
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
