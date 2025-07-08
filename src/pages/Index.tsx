import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Brain, Zap } from "lucide-react";
import { TopicCard } from "@/components/TopicCard";
import { ScheduleModal } from "@/components/ScheduleModal";
import { LearningSchedule } from "@/components/LearningSchedule";

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

const Index = () => {
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [scheduledTopics, setScheduledTopics] = useState<ScheduledTopic[]>([]);
  const { toast } = useToast();

  // Load scheduled topics from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem("learningJourneyTopics");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const withDates = parsed.map((item: any) => ({
          ...item,
          date: new Date(item.date),
          scheduledAt: new Date(item.scheduledAt),
        }));
        setScheduledTopics(withDates);
      } catch (error) {
        console.error("Error loading scheduled topics:", error);
      }
    }
  }, []);

  // Save scheduled topics to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("learningJourneyTopics", JSON.stringify(scheduledTopics));
  }, [scheduledTopics]);

  const generateTopic = async () => {
    setIsGenerating(true);
    
    try {
      // Replace this URL with your actual n8n webhook URL
      const webhookUrl = "YOUR_N8N_WEBHOOK_URL_HERE";
      
      // For demo purposes, we'll simulate the API call
      // Remove this setTimeout and uncomment the fetch when you have your n8n webhook
      setTimeout(() => {
        const sampleTopics = [
          {
            title: "Learn about Quantum Computing",
            description: "A beginner-friendly intro to quantum principles and how they're revolutionizing computing."
          },
          {
            title: "Master the Art of Active Listening",
            description: "Discover techniques to become a better listener and improve your relationships."
          },
          {
            title: "Understand Blockchain Technology",
            description: "Learn the fundamentals of blockchain and how it's changing digital transactions."
          },
          {
            title: "Explore Mindfulness Meditation",
            description: "Learn simple mindfulness techniques to reduce stress and increase focus."
          },
          {
            title: "Basic Photography Composition",
            description: "Master the rule of thirds and other composition techniques for better photos."
          }
        ];
        
        const randomTopic = sampleTopics[Math.floor(Math.random() * sampleTopics.length)];
        setCurrentTopic(randomTopic);
        setIsGenerating(false);
        
        toast({
          title: "New Learning Topic Generated! 🎯",
          description: "Ready to expand your knowledge?",
        });
      }, 1500);

      // Uncomment this when you have your n8n webhook URL:
      /*
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "generate_topic",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate topic");
      }

      const data = await response.json();
      setCurrentTopic({
        title: data.title,
        description: data.description,
      });

      toast({
        title: "New Learning Topic Generated! 🎯",
        description: "Ready to expand your knowledge?",
      });
      */
    } catch (error) {
      console.error("Error generating topic:", error);
      toast({
        title: "Oops! Something went wrong",
        description: "Please try generating a topic again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleScheduleTopic = (scheduledTopic: ScheduledTopic) => {
    setScheduledTopics(prev => [scheduledTopic, ...prev]);
    toast({
      title: "Learning Session Scheduled! 📅",
      description: `Your session is set for ${scheduledTopic.time}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-learning-light/10 to-schedule-light/20 p-4">
      <div className="max-w-6xl mx-auto space-y-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-learning" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-learning to-schedule bg-clip-text text-transparent">
              Learning Journey
            </h1>
            <Brain className="h-8 w-8 text-schedule" />
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover something new every day and build the habit of continuous learning! 🚀
          </p>
        </div>

        {/* Generate Topic Section */}
        <div className="text-center space-y-6">
          <Button
            onClick={generateTopic}
            disabled={isGenerating}
            size="lg"
            className="bg-learning hover:bg-learning/90 text-primary-foreground font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
          >
            {isGenerating ? (
              <>
                <Zap className="h-5 w-5 mr-2 animate-spin" />
                Generating Magic...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Learning Topic
              </>
            )}
          </Button>
          
          {currentTopic && (
            <TopicCard
              topic={currentTopic}
              onSchedule={() => setIsScheduleModalOpen(true)}
              isLoading={isGenerating}
            />
          )}
        </div>

        {/* Learning Schedule */}
        <LearningSchedule scheduledTopics={scheduledTopics} />

        {/* Schedule Modal */}
        {currentTopic && (
          <ScheduleModal
            isOpen={isScheduleModalOpen}
            onClose={() => setIsScheduleModalOpen(false)}
            topic={currentTopic}
            onConfirm={handleScheduleTopic}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
