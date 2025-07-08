import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Sparkles } from "lucide-react";

interface Topic {
  title: string;
  description: string;
}

interface TopicCardProps {
  topic: Topic;
  onSchedule: () => void;
  isLoading?: boolean;
}

export function TopicCard({ topic, onSchedule, isLoading }: TopicCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto border-2 border-learning/20 bg-gradient-to-br from-learning-light to-white shadow-lg">
      <CardHeader className="text-center pb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="h-6 w-6 text-learning" />
          <span className="text-sm font-medium text-learning uppercase tracking-wide">
            Today's Learning Challenge
          </span>
        </div>
        <CardTitle className="text-2xl font-bold text-foreground">
          {topic.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardDescription className="text-center text-lg text-muted-foreground">
          {topic.description}
        </CardDescription>
        <div className="flex justify-center">
          <Button 
            onClick={onSchedule}
            disabled={isLoading}
            className="bg-schedule hover:bg-schedule/90 text-schedule-foreground font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Clock className="h-4 w-4 mr-2" />
            Schedule This Learning
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}