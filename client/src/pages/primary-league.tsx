import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const PrimaryLeaguePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Primary School League</h1>
      
      <div className="mb-8">
        <p className="text-lg mb-4">
          Welcome to the Primary School League - a platform for primary school students to test their knowledge, 
          compete with peers, and prepare for academic competitions.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Math Competitions</CardTitle>
            <CardDescription>Develop strong mathematical skills</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Challenge yourself with math problems designed for primary school students. 
              Practice basic arithmetic, geometry, and problem-solving.</p>
          </CardContent>
          <CardFooter>
            <Button>Explore</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Language Arts</CardTitle>
            <CardDescription>Enhance reading and writing skills</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Improve vocabulary, grammar, and reading comprehension through fun and 
              engaging exercises and quizzes.</p>
          </CardContent>
          <CardFooter>
            <Button>Explore</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Science Exploration</CardTitle>
            <CardDescription>Discover the world of science</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Learn about basic scientific concepts through interactive lessons and 
              simple experiments suitable for primary school students.</p>
          </CardContent>
          <CardFooter>
            <Button>Explore</Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="bg-primary/10 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="font-semibold mr-2">March 30, 2025:</span> 
            <span>Primary School Math Olympics - Registration Open</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">April 15, 2025:</span> 
            <span>Spelling Bee Competition - Registration Starting Soon</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">May 5, 2025:</span> 
            <span>Science Discovery Day - Mark Your Calendar</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PrimaryLeaguePage;