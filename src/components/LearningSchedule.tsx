import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, BookOpen, Trophy } from "lucide-react";
import { format, isAfter, isSameDay } from "date-fns";

interface Topic {
  title: string;
  description: string;
}

interface ScheduledTopic {
  id: string;
  topic: Topic;
  date: Date;
  time: string;
  scheduledAt: Date;
}

interface LearningScheduleProps {
  scheduledTopics: ScheduledTopic[];
}

export function LearningSchedule({ scheduledTopics }: LearningScheduleProps) {
  const now = new Date();
  const upcoming = scheduledTopics.filter(item => isAfter(item.date, now) || isSameDay(item.date, now));
  const past = scheduledTopics.filter(item => !isAfter(item.date, now) && !isSameDay(item.date, now));

  if (scheduledTopics.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-muted-foreground">
            <BookOpen className="h-5 w-5" />
            My Learning Schedule
          </CardTitle>
          <CardDescription>
            Your scheduled learning sessions will appear here
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-learning">
          <BookOpen className="h-6 w-6" />
          My Learning Schedule
        </CardTitle>
        <CardDescription>
          Track your learning journey and stay motivated!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {upcoming.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-schedule">
              <Calendar className="h-5 w-5" />
              Upcoming Sessions
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {upcoming.map((item) => (
                <Card key={item.id} className="border-schedule/30 bg-schedule-light/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">
                          {item.topic.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.topic.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-schedule">
                            <Calendar className="h-4 w-4" />
                            {format(item.date, "MMM dd, yyyy")}
                          </span>
                          <span className="flex items-center gap-1 text-schedule">
                            <Clock className="h-4 w-4" />
                            {item.time}
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-schedule/20 text-schedule border-schedule/30">
                        Scheduled
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {past.length > 0 && (
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-success">
              <Trophy className="h-5 w-5" />
              Completed Learning
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {past.map((item) => (
                <Card key={item.id} className="border-success/30 bg-success/5">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">
                          {item.topic.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {item.topic.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-success">
                            <Calendar className="h-4 w-4" />
                            {format(item.date, "MMM dd, yyyy")}
                          </span>
                          <span className="flex items-center gap-1 text-success">
                            <Clock className="h-4 w-4" />
                            {item.time}
                          </span>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-success/20 text-success border-success/30">
                        Completed
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}