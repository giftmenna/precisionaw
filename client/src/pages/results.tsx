import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'wouter';
import { supabase } from '../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

interface TestResult {
  id: string;
  subject: string;
  score: number;
  time_taken: number;
  answers: Record<string, number>;
  created_at?: string;
}

const Results: React.FC = () => {
  const { id } = useParams();

  const { data: result, isLoading, error } = useQuery<TestResult>({
    queryKey: ['test_result', id],
    queryFn: async () => {
      if (!id) throw new Error('No result ID provided');
      const { data, error } = await supabase
        .from('test_results')
        .select('*')
        .eq('id', id)
        .single();
      if (error) {
        console.error('Fetch result error:', error);
        throw error;
      }
      if (!data) throw new Error('Result not found');
      console.log('Supabase fetched data:', data);
      return {
        ...data,
        answers: JSON.parse(data.answers),
      };
    },
    enabled: !!id,
  });

  console.log('Query state:', { result, isLoading, error });

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes} min ${remainingSeconds} sec`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-10 w-48 mb-6" />
        <Card className="mb-6">
          <CardHeader>
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Error Loading Result</h1>
        <p className="mb-4 text-red-500">{(error as Error).message || 'An error occurred'}</p>
        <Button asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Result Not Found</h1>
        <p className="mb-4">The test result you're looking for could not be found.</p>
        <Button asChild>
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
      </div>
    );
  }

  // Calculate total possible score and percentages
  const totalQuestions = Object.keys(result.answers).length;
  const totalPossibleScore = totalQuestions * 50;
  const correctPercentage = totalPossibleScore > 0 ? (result.score / totalPossibleScore) * 100 : 0;
  const incorrectPercentage = 100 - correctPercentage;

  // Pie chart data
  const pieData = {
    labels: ['Correct Answers', 'Incorrect Answers'],
    datasets: [
      {
        data: [correctPercentage, incorrectPercentage],
        backgroundColor: ['#4CAF50', '#F44336'], // Green for correct, Red for incorrect
        hoverBackgroundColor: ['#66BB6A', '#EF5350'],
      },
    ],
  };

  // Pie chart options
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.label}: ${context.raw.toFixed(1)}%`,
        },
      },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold">Test Results</h1>
        <Button asChild>
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{result.subject} Test</CardTitle>
          <CardDescription>
            {result.created_at
              ? `Completed on ${new Date(result.created_at).toLocaleDateString()} • ${formatTime(result.time_taken)}`
              : `Time taken: ${formatTime(result.time_taken)}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Score</span>
              <span className="text-3xl font-bold">{result.score} / {totalPossibleScore} ({correctPercentage.toFixed(1)}%)</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Time Taken</span>
              <span className="text-3xl font-bold">{formatTime(result.time_taken)}</span>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Performance</span>
              <span className="text-sm font-medium">{correctPercentage.toFixed(1)}%</span>
            </div>
            <Progress value={correctPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-semibold mb-4">Answer Breakdown</h2>
      <Card>
        <CardContent className="pt-6">
          <div className="w-full max-w-xs mx-auto" style={{ height: '250px' }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-center">
        <Button asChild className="mr-4">
          <Link href="/test">Take Another Test</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/grades">View All Results</Link>
        </Button>
      </div>
    </div>
  );
};

export default Results;