import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { CalendarIcon, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useAuth } from '../context/auth-context';
import { TestResult } from '../types';

const Grades = () => {
  const { currentUser } = useAuth();
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  
  const { data: results, isLoading } = useQuery<TestResult[]>({
    queryKey: [`/api/users/${currentUser?.id}/results`],
    enabled: !!currentUser?.id,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-36" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Card className="mb-6">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-40" />
          </CardHeader>
          <CardContent>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full mb-4" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Default results if none are available
  const defaultResults: TestResult[] = [
    {
      id: '1',
      userId: currentUser?.id || '',
      testId: 'test1',
      subject: 'Mathematics',
      score: 85,
      totalQuestions: 20,
      correctAnswers: 17,
      timeTaken: 1200,
      completed: true,
      timestamp: new Date().toISOString(),
    },
    {
      id: '2',
      userId: currentUser?.id || '',
      testId: 'test2',
      subject: 'English',
      score: 90,
      totalQuestions: 25,
      correctAnswers: 22,
      timeTaken: 1500,
      completed: true,
      timestamp: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    },
    {
      id: '3',
      userId: currentUser?.id || '',
      testId: 'test3',
      subject: 'Mathematics',
      score: 78,
      totalQuestions: 20,
      correctAnswers: 15,
      timeTaken: 1350,
      completed: true,
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    },
    {
      id: '4',
      userId: currentUser?.id || '',
      testId: 'test4',
      subject: 'English',
      score: 82,
      totalQuestions: 25,
      correctAnswers: 20,
      timeTaken: 1650,
      completed: true,
      timestamp: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    },
    {
      id: '5',
      userId: currentUser?.id || '',
      testId: 'test5',
      subject: 'Mathematics',
      score: 92,
      totalQuestions: 20,
      correctAnswers: 18,
      timeTaken: 1100,
      completed: true,
      timestamp: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
    },
  ];

  const displayResults = results || defaultResults;
  
  // Get unique subjects
  const subjects = Array.from(new Set(displayResults.map(result => result.subject)));
  
  // Filter results by subject if filter is applied
  const filteredResults = subjectFilter === 'all' 
    ? displayResults
    : displayResults.filter(result => result.subject === subjectFilter);
  
  // Sort results by date (newest first)
  const sortedResults = [...filteredResults].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  // Prepare chart data - transform to format: { date, Subject1: score, Subject2: score }
  const chartData = displayResults.reduce((acc, result) => {
    const date = new Date(result.timestamp).toLocaleDateString();
    
    const existingDateEntry = acc.find(entry => entry.date === date);
    if (existingDateEntry) {
      existingDateEntry[result.subject] = result.score;
    } else {
      const newEntry: any = { date };
      newEntry[result.subject] = result.score;
      acc.push(newEntry);
    }
    
    return acc;
  }, [] as any[]).sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold">Grade History</h1>
        
        <div className="flex gap-4 mt-2 sm:mt-0">
          <Select value={subjectFilter} onValueChange={setSubjectFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map(subject => (
                <SelectItem key={subject} value={subject}>{subject}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button asChild>
            <Link href="/test">Take a New Test</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="history" className="w-full mb-6">
        <TabsList>
          <TabsTrigger value="history">Grade History</TabsTrigger>
          <TabsTrigger value="progress">Progress Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Tests</CardTitle>
              <CardDescription>
                {subjectFilter === 'all' 
                  ? 'All of your test results, sorted by date' 
                  : `Your ${subjectFilter} test results, sorted by date`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sortedResults.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">No test results found</p>
                  <Button asChild>
                    <Link href="/test">Take Your First Test</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {sortedResults.map((result) => (
                    <Card key={result.id} className="overflow-hidden hover:bg-muted/50 transition-colors">
                      <Link href={`/results/${result.id}`}>
                        <div className="flex flex-col sm:flex-row justify-between p-4 items-start sm:items-center">
                          <div>
                            <h3 className="font-semibold text-lg">{result.subject}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <CalendarIcon className="mr-1 h-3 w-3" />
                              <span>{new Date(result.timestamp).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center mt-2 sm:mt-0">
                            <div className={`px-2 py-1 rounded text-sm font-medium ${
                              result.score >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                              result.score >= 70 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                              'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                            }`}>
                              {result.score}%
                            </div>
                            
                            <span className="text-sm text-muted-foreground mx-2">
                              {result.correctAnswers}/{result.totalQuestions} correct
                            </span>
                            
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Progress Over Time
              </CardTitle>
              <CardDescription>
                Track how your scores have improved across different subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              {chartData.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">Not enough data to show progress trends</p>
                  <Button asChild>
                    <Link href="/test">Take More Tests</Link>
                  </Button>
                </div>
              ) : (
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      {subjects.map((subject, index) => (
                        <Line 
                          key={subject}
                          type="monotone" 
                          dataKey={subject} 
                          stroke={index === 0 ? '#3f51b5' : '#ff9800'} 
                          activeDot={{ r: 8 }} 
                        />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subjects.map((subject) => {
          const subjectResults = displayResults.filter(r => r.subject === subject);
          const avgScore = Math.round(
            subjectResults.reduce((sum, r) => sum + r.score, 0) / subjectResults.length
          );
          const bestScore = Math.max(...subjectResults.map(r => r.score));
          
          return (
            <Card key={subject}>
              <CardHeader>
                <CardTitle className="text-lg">{subject}</CardTitle>
                <CardDescription>
                  {subjectResults.length} tests taken
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                    <p className="text-2xl font-bold">{avgScore}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Best Score</p>
                    <p className="text-2xl font-bold">{bestScore}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Grades;
