import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressTrackerProps {
  totalSubjects: number
  completedTasksToday: number
  totalTasksToday: number
}

export function ProgressTracker({ totalSubjects, completedTasksToday, totalTasksToday }: ProgressTrackerProps) {
  const dailyProgress = totalTasksToday > 0 ? (completedTasksToday / totalTasksToday) * 100 : 0

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Study Progress</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          <p className="text-sm font-medium">Total Subjects</p>
          <p className="text-2xl font-bold">{totalSubjects}</p>
        </div>
        <div>
          <p className="text-sm font-medium">Daily Task Completion</p>
          <div className="flex items-center gap-2">
            <Progress value={dailyProgress} className="h-2" />
            <span className="text-sm text-muted-foreground">{dailyProgress.toFixed(0)}%</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {completedTasksToday} of {totalTasksToday} tasks completed today
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
