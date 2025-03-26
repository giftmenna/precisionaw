import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="bg-primary-50 dark:bg-neutral-800 py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="font-poppins font-bold text-3xl md:text-4xl lg:text-5xl text-primary-700 dark:text-primary-100 mb-4">
              Creating a better future for every young person
            </h1>
            <p className="text-neutral-700 dark:text-neutral-200 text-lg mb-8">
              Empowering students with personalized academic resources and practice tests to help them excel in their educational journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="border-white hover:bg-primary-600 text-white"
                asChild
              >
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary-500 text-primary-500 hover:bg-primary-50 dark:border-primary-300 dark:text-primary-300 dark:hover:bg-neutral-700"
                asChild
              >
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://ekrgotbtktogzzoqrvxv.supabase.co/storage/v1/object/public/images//IMG_8720.JPG" 
              alt="Students studying together" 
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
