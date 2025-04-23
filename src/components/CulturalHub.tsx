import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Award, Users, User, Star, Check, X } from "lucide-react";
import CulturalFAQ from "./CulturalFAQ";
import CulturalVideo from "./CulturalVideo";
const quizQuestions = [{
  question: "What is the main purpose of the Cultural Connection Hub?",
  options: ["To provide entertainment only", "To transform waiting time into a cultural experience", "To replace human customer service", "To collect customer data"],
  correctAnswer: 1
}, {
  question: "Which feature allows real-time communication in different languages?",
  options: ["Cultural insights", "Entertainment games", "Translation module", "AR experiences"],
  correctAnswer: 2
}, {
  question: "What can customers earn by completing activities in the Cultural Connection Hub?",
  options: ["Crypto tokens", "Free products", "Rewards like discounts", "Airline miles"],
  correctAnswer: 2
}];
const CulturalHub = () => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const handleSelectAnswer = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
  };
  const checkAnswer = () => {
    if (selectedAnswer === null) return;
    setHasAnswered(true);
    if (selectedAnswer === quizQuestions[activeQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };
  const nextQuestion = () => {
    if (activeQuestionIndex < quizQuestions.length - 1) {
      setActiveQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };
  const restartQuiz = () => {
    setActiveQuestionIndex(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };
  return <div className="w-full max-w-2xl mx-auto">
      
      
      <Tabs defaultValue="quiz" className="w-full">
        
        
        <TabsContent value="insights" className="mt-0">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Discover Cultural Insights</h3>
              <div className="space-y-6">
                <div className="p-4 bg-brand-light rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="h-6 w-6 rounded-full bg-brand-purple text-white flex items-center justify-center mr-2 text-sm">1</span>
                    Language and Communication Styles
                  </h4>
                  <p className="text-muted-foreground">
                    Learn about communication norms and customs across different cultures to enhance your global interactions.
                  </p>
                </div>
                
                <div className="p-4 bg-brand-light rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="h-6 w-6 rounded-full bg-brand-purple text-white flex items-center justify-center mr-2 text-sm">2</span>
                    Business Etiquette Around the World
                  </h4>
                  <p className="text-muted-foreground">
                    Discover business customs, greeting styles, and meeting protocols in different countries.
                  </p>
                </div>
                
                <div className="p-4 bg-brand-light rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center">
                    <span className="h-6 w-6 rounded-full bg-brand-purple text-white flex items-center justify-center mr-2 text-sm">3</span>
                    Cultural Celebrations and Traditions
                  </h4>
                  <p className="text-muted-foreground">
                    Explore festivals, holidays, and traditions that shape cultural identities globally.
                  </p>
                </div>
                
                <Button className="w-full bg-brand-teal hover:bg-brand-teal/90">Explore More Cultural Content</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="quiz" className="mt-0">
          <Card>
            <CardContent className="p-6">
              {!quizCompleted ? <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="font-medium">Question {activeQuestionIndex + 1}/{quizQuestions.length}</span>
                    <span className="px-3 py-1 bg-brand-purple/10 text-brand-purple rounded-full text-sm font-medium">Score: {score}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-4">{quizQuestions[activeQuestionIndex].question}</h3>
                  
                  <div className="space-y-3 mb-6">
                    {quizQuestions[activeQuestionIndex].options.map((option, index) => <div key={index} className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedAnswer === index ? hasAnswered ? index === quizQuestions[activeQuestionIndex].correctAnswer ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50' : 'border-brand-purple bg-brand-purple/5' : 'hover:bg-muted'}`} onClick={() => handleSelectAnswer(index)}>
                        <div className="flex items-center justify-between">
                          <span>{option}</span>
                          {hasAnswered && (index === quizQuestions[activeQuestionIndex].correctAnswer ? <Check className="h-5 w-5 text-green-500" /> : selectedAnswer === index ? <X className="h-5 w-5 text-red-500" /> : null)}
                        </div>
                      </div>)}
                  </div>
                  
                  <div className="flex justify-between">
                    {!hasAnswered ? <Button onClick={checkAnswer} disabled={selectedAnswer === null} className="bg-brand-purple hover:bg-brand-purple/90">
                        Check Answer
                      </Button> : <Button onClick={nextQuestion} className="bg-brand-teal hover:bg-brand-teal/90">
                        {activeQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
                      </Button>}
                  </div>
                </div> : <div className="text-center py-6">
                  <div className="mb-4">
                    <Award className="h-16 w-16 mx-auto text-brand-purple mb-2" />
                    <h3 className="text-2xl font-semibold mb-1">Quiz Completed!</h3>
                    <p className="text-muted-foreground mb-4">
                      You scored {score} out of {quizQuestions.length}
                    </p>
                  </div>
                  
                  <div className="p-4 bg-brand-light rounded-lg mb-6">
                    <h4 className="font-semibold mb-2">You've earned a reward!</h4>
                    <p className="text-muted-foreground mb-3">
                      Use code <span className="font-bold text-brand-purple">CULTURE10</span> for 10% off your next purchase.
                    </p>
                    <Button variant="outline" className="w-full border-dashed border-brand-purple text-brand-purple">
                      Copy Code
                    </Button>
                  </div>
                  
                  <Button onClick={restartQuiz} className="bg-brand-purple hover:bg-brand-purple/90">
                    Try Another Quiz
                  </Button>
                </div>}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="community" className="mt-0">
          <Card>
            
          </Card>
        </TabsContent>

        <CulturalFAQ />

        <CulturalVideo />
      </Tabs>
    </div>;
};
export default CulturalHub;