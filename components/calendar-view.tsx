import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format, isSameMonth, isToday, parseISO } from "date-fns"

interface CalendarViewProps {
  subjects: {
    name: string
    examDates: string[]
  }[]
}

export function CalendarView({ subjects }: CalendarViewProps) {
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  const examEvents = subjects.flatMap((subject) =>
    subject.examDates.map((dateString) => ({
      date: parseISO(dateString),
      subject: subject.name,
    })),
  )

  // Generate days for the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay() // 0 for Sunday, 1 for Monday

  const calendarDays = []
  // Add empty slots for days before the 1st of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null)
  }
  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(new Date(currentYear, currentMonth, i))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upcoming Exams</CardTitle>
        <p className="text-sm text-muted-foreground">{format(today, "MMMM yyyy")}</p>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="grid grid-cols-7 gap-1 text-center text-sm">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="font-semibold text-muted-foreground">
                {day}
              </div>
            ))}
            {calendarDays.map((date, index) => (
              <div
                key={index}
                className={`relative flex h-12 w-full items-center justify-center rounded-md border ${
                  date && isToday(date) ? "bg-primary text-primary-foreground" : "bg-background"
                }`}
              >
                {date ? (
                  <>
                    {format(date, "d")}
                    {examEvents.some((event) => format(event.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")) && (
                      <span className="absolute bottom-1 right-1 h-2 w-2 rounded-full bg-red-500" />
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-2">
            <h3 className="font-semibold">Exams this month:</h3>
            {examEvents.filter((event) => isSameMonth(event.date, today)).length === 0 ? (
              <p className="text-muted-foreground">No exams scheduled this month.</p>
            ) : (
              examEvents
                .filter((event) => isSameMonth(event.date, today))
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((event, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{event.subject}</span>
                    <span className="font-medium">{format(event.date, "MMM d")}</span>
                  </div>
                ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
