import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface Topic {
  title: string;
  description: string;
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: Topic;
  onConfirm: (scheduledTopic: {
    id: string;
    topic: Topic;
    date: Date;
    time: string;
    scheduledAt: Date;
  }) => void;
}

export function ScheduleModal({ isOpen, onClose, topic, onConfirm }: ScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) return;

    const scheduledTopic = {
      id: Date.now().toString(),
      topic,
      date: selectedDate,
      time: selectedTime,
      scheduledAt: new Date(),
    };

    onConfirm(scheduledTopic);
    onClose();
    setSelectedDate(undefined);
    setSelectedTime("");
  };

  const handleClose = () => {
    onClose();
    setSelectedDate(undefined);
    setSelectedTime("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-learning">
            <CalendarIcon className="h-5 w-5" />
            Schedule Your Learning Session
          </DialogTitle>
          <DialogDescription>
            Choose when you'd like to learn about: <strong>{topic.title}</strong>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-3">
            <Label htmlFor="date" className="text-sm font-medium">
              Select Date
            </Label>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => date < new Date()}
                className={cn("rounded-md border bg-background")}
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Select Time Slot
            </Label>
            <Input
              id="time"
              type="text"
              placeholder="e.g., 10:00-11:00 AM"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="text-center"
            />
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!selectedDate || !selectedTime}
            className="bg-success hover:bg-success/90 text-success-foreground"
          >
            Confirm Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}