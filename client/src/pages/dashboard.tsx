import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useAuth } from '../context/auth-context';
import { Skeleton } from '@/components/ui/skeleton';
import { TestResult } from '../types';
import { supabase } from '../lib/supabase';

const fetchTestResults = async (userId: string): Promise<TestResult[]> => {
  console.log('Fetching test results for user_id:', userId);
  const { data, error } = await supabase
    .from('test_results')
    .select('*')
    .eq('user_id', userId);
  if (error) {
    console.error('Supabase Error:', error);
    throw new Error(error.message);
  }
  console.log('Fetched data:', data);
  return data as TestResult[];
};

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [personalizedContent, setPersonalizedContent] = useState({
    recentActivity: [],
    completedTests: 0,
    averageScore: 0,
    nextGoal: '',
    learningStreak: 0,
  });

  console.log('Current User:', currentUser);
  const { data: results, isLoading, error } = useQuery<TestResult[]>({
    queryKey: ['test_results', currentUser?.id],
    queryFn: () => {
      if (!currentUser?.id) throw new Error('User ID is missing');
      return fetchTestResults(currentUser.id);
    },
    enabled: !!currentUser?.id,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    if (currentUser && results) {
      const completedTests = results.length;
      const averageScore = completedTests
        ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / completedTests)
        : 0;
      setPersonalizedContent({
        recentActivity: results.slice(0, 5).map((r) => ({
          id: r.id,
          type: 'test',
          subject: r.subject,
          score: r.score,
          date: r.timestamp || 'N/A', // Fallback since timestamp is missing
        })),
        completedTests,
        averageScore,
        nextGoal: completedTests > 10 ? 'Master Advanced Topics' : 'Complete 10 Tests',
        learningStreak: calculateStreak(results), // Will return 0 without timestamp
      });
    }
  }, [currentUser, results]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-10 w-32 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="text-red-500">Error: {(error as Error).message}</div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <Button asChild>
              <Link href="/test">Take a Practice Test</Link>
            </Button>
          </div>
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No tests taken yet. Start a practice test to see your progress!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const subjectPerformance = results.reduce((acc, result) => {
    if (!acc[result.subject]) acc[result.subject] = [];
    acc[result.subject].push(result.score);
    return acc;
  }, {} as Record<string, number[]>);

  const barChartData = Object.keys(subjectPerformance).map((subject) => {
    const scores = subjectPerformance[subject];
    return {
      subject,
      average: Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length),
    };
  });

  const pieChartData = results.map((result) => ({
    name: result.subject,
    value: result.correctAnswers,
  }));

  const COLORS = ['#3f51b5', '#ff9800', '#4caf50', '#f44336', '#2196f3'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button asChild>
            <Link href="/test">Take a Practice Test</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{results.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{`${personalizedContent.averageScore}%`}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Best Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {barChartData.sort((a, b) => b.average - a.average)[0]?.subject || 'N/A'}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="performance">Performance by Subject</TabsTrigger>
            <TabsTrigger value="accuracy">Question Accuracy</TabsTrigger>
          </TabsList>
          <TabsContent value="performance" className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Your average scores across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Average Score']} />
                    <Bar dataKey="average" fill="#3f51b5" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="accuracy" className="w-full">
            <Card>
              <CardHeader>
                <CardTitle>Question Accuracy</CardTitle>
                <CardDescription>Distribution of correct answers by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [value, 'Correct Answers']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Tests</CardTitle>
            <CardDescription>Your latest test attempts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results
                // Sort by id as a fallback since timestamp is missing
                .sort((a, b) => b.id.localeCompare(a.id)) // Assumes id is chronological
                .slice(0, 5)
                .map((result) => (
                  <Card key={result.id} className="overflow-hidden">
                    <div className="flex flex-col sm:flex-row justify-between p-4 items-start sm:items-center">
                      <div>
                        <h3 className="font-semibold">{result.subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          {result.timestamp
                            ? new Date(result.timestamp).toLocaleDateString()
                            : 'Date N/A'}
                        </p>
                      </div>
                      <div className="flex items-center mt-2 sm:mt-0">
                        <div className="mr-4">
                          <span className="font-bold text-lg">{result.score}%</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({result.correctAnswers}/{result.totalQuestions})
                          </span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/results/${result.id}`}>View Details</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
            <div className="flex justify-center mt-6">
              <Button variant="outline" asChild>
                <Link href="/grades">View All Tests</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const calculateStreak = (results: TestResult[]): number => {
  // Without timestamp, streak can't be calculated accurately
  return 0; // Placeholder until timestamp is added
};

export default Dashboard;