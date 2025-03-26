import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="bg-primary-700 dark:bg-primary-900 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl mb-6">
          Ready to enhance your academic performance?
        </h2>
        <p className="text-primary-100 max-w-2xl mx-auto mb-8">
          Join thousands of students who are improving their skills and achieving academic excellence with Precision Academic World.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="border-white hover:bg-primary-600 text-white"
            size="lg"
            asChild
          >
            <Link href="/signup">Sign Up Now</Link>
          </Button>
          <Button 
            variant="outline" 
            className="border-white hover:bg-primary-600 text-white" 
            size="lg"
            asChild
          >
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
