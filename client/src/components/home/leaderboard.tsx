import { useQuery } from '@tanstack/react-query';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { LeaderboardEntry } from '../../types';

const Leaderboard = () => {
  const { data: leaderboardData, isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ['/api/leaderboard'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fallback data for development or when API is not available
  const fallbackData: LeaderboardEntry[] = [
    { id: '1', userId: '1', displayName: 'Student A', subject: 'Mathematics', score: 98, rank: 1 },
    { id: '2', userId: '2', displayName: 'Student B', subject: 'English', score: 95, rank: 2 },
    { id: '3', userId: '3', displayName: 'Student C', subject: 'Mathematics', score: 92, rank: 3 },
    { id: '4', userId: '4', displayName: 'Student D', subject: 'English', score: 90, rank: 4 },
    { id: '5', userId: '5', displayName: 'Student E', subject: 'Mathematics', score: 89, rank: 5 },
  ];

  // Use the fallback data when the real data is not available
  const displayedData = leaderboardData || fallbackData;

  return (
    <section className="py-16 bg-neutral-50 dark:bg-neutral-800 mt-8">
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-2xl md:text-3xl text-center mb-12 text-neutral-800 dark:text-white">
          Top Performers
        </h2>
        <div className="max-w-3xl mx-auto">
          <Card className="overflow-hidden">
            <div className="bg-primary text-primary-foreground py-4 px-6">
              <h3 className="font-semibold text-lg">Monthly Leaderboard</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Rank</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Student</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Skeleton className="h-8 w-8 rounded-full" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Skeleton className="h-5 w-24" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Skeleton className="h-5 w-20" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Skeleton className="h-5 w-12" />
                        </td>
                      </tr>
                    ))
                  ) : (
                    displayedData.map((entry) => (
                      <tr key={entry.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                              {entry.rank}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {entry.displayName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {entry.subject}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-semibold">
                          {entry.score}%
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
