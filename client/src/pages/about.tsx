import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">About Precision Academic World</h1>
      
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Precision Academic World is dedicated to empowering students on their educational journey. We believe that every young person deserves access to high-quality academic resources that can help them reach their full potential.
            </p>
            <p>
              Our mission is to create a better future for every young person by providing personalized academic resources and practice tests that help students identify their strengths and areas for improvement.
            </p>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What We Offer</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <span className="font-semibold">Targeted Practice Tests:</span> Our platform offers carefully crafted practice tests in English and Mathematics, designed to assess and improve students' knowledge and skills.
              </li>
              <li>
                <span className="font-semibold">Comprehensive Analytics:</span> Students receive detailed feedback on their performance, including scores, time taken, and specific areas for improvement.
              </li>
              <li>
                <span className="font-semibold">Progress Tracking:</span> Our dashboard provides visual representations of progress over time, allowing students to see their improvement across different subjects.
              </li>
              <li>
                <span className="font-semibold">Community Learning:</span> The leaderboard feature fosters a sense of healthy competition and community among learners.
              </li>
              <li>
                <span className="font-semibold">Educational Resources:</span> Daily vocabulary enrichment through our "Word of the Day" feature and additional learning resources.
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Our Approach</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              At Precision Academic World, we understand that each student learns differently. Our approach is centered on:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Personalization</h3>
                <p>Tailoring the learning experience to individual needs and learning styles.</p>
              </div>
              <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Engagement</h3>
                <p>Creating an interactive and enjoyable learning environment that motivates students.</p>
              </div>
              <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Growth</h3>
                <p>Focusing on continuous improvement and celebrating progress along the way.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Our Team</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Precision Academic World was founded by a team of educators and technologists who share a passion for improving education through technology. Our diverse team brings together expertise in:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Educational psychology and pedagogy</li>
              <li>Curriculum development</li>
              <li>Software engineering and user experience design</li>
              <li>Data analytics for educational assessment</li>
            </ul>
            <p className="mt-4">
              We are committed to continuous improvement and regularly update our platform based on the latest educational research and feedback from our community of students and educators.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
