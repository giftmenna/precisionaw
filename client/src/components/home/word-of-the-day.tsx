import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { WordOfTheDay as WordOfTheDayType } from '../../types';

const WordOfTheDay = () => {
  const { data: wordData, isLoading, error } = useQuery<WordOfTheDayType>({
    queryKey: ['/api/word-of-the-day'],
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  // Fallback data for when the API is not connected or during development
  const fallbackWord: WordOfTheDayType = {
    word: 'Perspicacious',
    partOfSpeech: 'Adjective',
    definition: 'Having a ready insight into and understanding of things; shrewd.',
    example: 'She made many perspicacious observations about the project\'s challenges.',
    date: new Date().toISOString(),
  };

  // Use fallback data if there's an error or during development
  const displayedWord = error ? fallbackWord : wordData || fallbackWord;

  return (
    <section className="py-16 bg-neutral-50 dark:bg-neutral-800">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-12 text-neutral-800 dark:text-white">
          Word of the Day
        </h2>
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 word-card">
            {isLoading ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="h-8 w-40" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-16 w-full" />
              </>
            ) : (
              <>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-poppins font-semibold text-xl text-primary-700 dark:text-primary-300">
                    {displayedWord.word}
                  </h3>
                  <span className="text-sm bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-100 px-3 py-1 rounded-full">
                    {displayedWord.partOfSpeech}
                  </span>
                </div>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  {displayedWord.definition}
                </p>
                <div className="bg-neutral-100 dark:bg-neutral-700 p-4 rounded-md text-neutral-700 dark:text-neutral-200 italic">
                  "{displayedWord.example}"
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WordOfTheDay;
