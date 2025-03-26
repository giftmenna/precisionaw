import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '../context/auth-context';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  imageUrl?: string;
}

interface TestType {
  id: string;
  title: string;
  subject: string;
  description: string;
  timeLimit: number;
  questions: Question[];
}

const subjects = ['English', 'Mathematics'];

const Test = () => {
  const { currentUser } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentTest, setCurrentTest] = useState<TestType | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [currentSelection, setCurrentSelection] = useState<string | undefined>(undefined); // New state for visual selection
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [testStarted, setTestStarted] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate('/?redirect=login');
    }
    console.log('Current user ID:', currentUser?.id);
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const { data: tests, isLoading: isLoadingTests, error, isFetching } = useQuery<TestType[]>({
    queryKey: ['tests'],
    queryFn: async () => {
      console.log('Fetching tests from Supabase');
      const { data, error, count } = await supabase.from('tests').select('*', { count: 'exact' });
      if (error) {
        console.error('Supabase fetch error:', error);
        throw error;
      }
      console.log('Raw fetched tests:', data, 'Count:', count);
      return data.map(test => ({
        id: test.id,
        title: test.title,
        subject: test.subject,
        description: test.description || '',
        timeLimit: test.time_limit,
        questions: test.questions,
      }));
    },
    enabled: true,
  });

  useEffect(() => {
    console.log('Fetch state:', { isLoadingTests, isFetching, error, tests });
    if (tests) {
      console.log('Processed tests:', tests);
      subjects.forEach(subject => {
        const test = tests.find(t => t.subject === subject);
        console.log(`Test for ${subject}:`, test);
        console.log(`${subject} question count:`, test?.questions.length || 0);
      });
    }
  }, [tests, isLoadingTests, isFetching, error]);

  useEffect(() => {
    supabase.from('tests').select('*', { count: 'exact' }).then(({ data, error, count }) => {
      console.log('Manual fetch result:', { data, error, count });
    });
    supabase.auth.getSession().then(({ data, error }) => {
      console.log('Auth session:', data, error);
    });
    console.log('Supabase config check - please share supabase.ts');
  }, []);

  const submitTestMutation = useMutation({
    mutationFn: async (data: {
      userId: string;
      testId: string;
      answers: Record<string, number>;
      timeTaken: number;
    }) => {
      if (!currentTest) throw new Error('No current test available');
      const score = currentTest.questions.reduce((acc, q) => {
        return acc + (data.answers[q.id] === q.correctAnswer ? 50 : 0);
      }, 0);
      console.log('Submitting test result:', {
        user_id: data.userId,
        test_id: data.testId,
        subject: currentTest.subject,
        score,
        answers: data.answers,
        time_taken: data.timeTaken,
      });
      const { data: result, error } = await supabase
        .from('test_results')
        .insert({
          user_id: data.userId,
          subject: currentTest.subject,
          score,
          answers: JSON.stringify(data.answers),
          time_taken: data.timeTaken,
        })
        .select()
        .single();
      if (error) {
        console.error('Submission error:', error);
        throw error;
      }
      console.log('Submission successful:', result);
      return result;
    },
    onSuccess: (data) => {
      toast({
        title: 'Test Submitted',
        description: 'Your test has been submitted successfully',
      });
      navigate(`/results/${data.id}`);
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      toast({
        title: 'Error',
        description: `Failed to submit your test: ${(error as Error).message || 'Unknown error'}. Please try again.`,
        variant: 'destructive',
      });
    },
  });

  useEffect(() => {
    if (testStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (testStarted && timeLeft === 0) {
      handleSubmitTest();
    }
  }, [testStarted, timeLeft]);

  const startTest = (subject: string) => {
    setSelectedSubject(subject);
    if (!tests) {
      toast({
        title: 'Loading Error',
        description: 'Tests are still loading. Please wait.',
        variant: 'destructive',
      });
      return;
    }

    const availableTests = tests.filter((test) => test.subject === subject);
    if (availableTests.length > 0) {
      const selectedTest = availableTests[0];
      if (selectedTest?.questions?.length > 0) {
        setCurrentTest(selectedTest);
        setTimeLeft(selectedTest.timeLimit * 60);
        setTestStarted(true);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setCurrentSelection(undefined); // Reset visual selection
      } else {
        toast({
          title: 'No Questions Available',
          description: `No questions are available for ${subject}`,
          variant: 'destructive',
        });
      }
    } else {
      toast({
        title: 'No Tests Available',
        description: `No tests are currently available for ${subject}`,
        variant: 'destructive',
      });
    }
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answerIndex });
    setCurrentSelection(answerIndex.toString()); // Update visual selection
  };

  const handleNextQuestion = () => {
    if (currentTest && currentQuestionIndex < currentTest.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentSelection(undefined); // Reset visual selection for next question
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setCurrentSelection(undefined); // Reset visual selection for previous question
    }
  };

  const handleQuestionNavigate = (index: number) => {
    setCurrentQuestionIndex(index);
    setCurrentSelection(undefined); // Reset visual selection when using navigator
  };

  const handleSubmitTest = () => {
    if (!currentTest || !currentUser) {
      console.error('Missing data for submission:', { currentTest, currentUser });
      toast({
        title: 'Error',
        description: 'Test or user data is missing. Please restart the test.',
        variant: 'destructive',
      });
      return;
    }
    const timeTaken = currentTest.timeLimit * 60 - timeLeft;
    submitTestMutation.mutate({
      userId: currentUser.id,
      testId: currentTest.id,
      answers: selectedAnswers,
      timeTaken,
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const currentQuestion = currentTest?.questions?.[currentQuestionIndex];
  const progress = currentTest?.questions
    ? Math.round(((currentQuestionIndex + 1) / currentTest.questions.length) * 100)
    : 0;

  if (isLoadingTests) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Practice Tests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-8 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-24" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Error Loading Tests</h1>
        <p className="text-red-500">{(error as Error).message}</p>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Practice Tests</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjects.map((subject) => {
            const test = tests?.find((t) => t.subject === subject);
            return (
              <Card key={subject}>
                <CardHeader>
                  <CardTitle>{test?.title || subject}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    {test?.description ||
                      (subject === 'English'
                        ? 'Test your vocabulary, grammar, and reading comprehension skills.'
                        : 'Practice algebra, geometry, and problem-solving questions.')}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="mr-2">⏱️</span>
                    <span>
                      {test?.timeLimit || 20} minutes • {test?.questions.length || 0} questions
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => startTest(subject)} disabled={!test || test.questions.length === 0}>
                    Start Test
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-3xl font-bold">{currentTest?.title || currentTest?.subject} Test</h1>
        <div className="flex items-center mt-2 sm:mt-0 space-x-4">
          <div className="text-lg font-semibold">
            Time left: <span className={timeLeft < 60 ? 'text-red-500' : ''}>{formatTime(timeLeft)}</span>
          </div>
          <Button variant="destructive" onClick={handleSubmitTest}>
            Submit Test
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {currentTest?.questions.length}
          </span>
          <span className="text-sm font-medium">{progress}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {currentQuestion && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">
              {currentQuestionIndex + 1}. {currentQuestion.question}
            </CardTitle>
            {currentQuestion.imageUrl && (
              <img
                src={currentQuestion.imageUrl}
                alt="Question diagram"
                className="mt-2 max-w-full h-auto"
              />
            )}
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={currentSelection} // Use currentSelection instead of selectedAnswers
              onValueChange={(value) => handleAnswerSelect(currentQuestion.id, parseInt(value))}
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 mb-3 p-3 border rounded-md hover:bg-muted">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <Separator />
          <CardFooter className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            {currentQuestionIndex < (currentTest?.questions.length || 0) - 1 ? (
              <Button onClick={handleNextQuestion}>Next</Button>
            ) : (
              <Button onClick={handleSubmitTest}>Submit</Button>
            )}
          </CardFooter>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Question Navigator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {currentTest?.questions.map((_, index) => (
              <Button
                key={index}
                variant={
                  index === currentQuestionIndex
                    ? 'default'
                    : selectedAnswers[currentTest.questions[index].id] !== undefined
                    ? 'outline'
                    : 'secondary'
                }
                className="h-10 w-10 p-0"
                onClick={() => handleQuestionNavigate(index)} // Use new handler
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Test;