import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SeniorLeaguePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Senior School League</h1>
      
      <div className="mb-8">
        <p className="text-lg mb-4">
          Welcome to the Senior School League - our most advanced academic competition platform for high school students. 
          Prepare for college admissions, standardized tests, and prestigious academic competitions.
        </p>
      </div>
      
      <Tabs defaultValue="subjects" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="subjects">Academic Subjects</TabsTrigger>
          <TabsTrigger value="competitions">Major Competitions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="subjects">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Mathematics</CardTitle>
                <CardDescription>Calculus, Statistics, and Advanced Topics</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Master high-level mathematical concepts including calculus, probability and statistics, 
                  and prepare for college-level mathematics.</p>
              </CardContent>
              <CardFooter>
                <Button>Explore</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Physics & Engineering</CardTitle>
                <CardDescription>Advanced STEM Preparation</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Study advanced physics concepts, engineering principles, and solve complex 
                  problems that prepare you for university-level STEM courses.</p>
              </CardContent>
              <CardFooter>
                <Button>Explore</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Advanced Sciences</CardTitle>
                <CardDescription>Chemistry, Biology, and Environmental Science</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Engage with college-prep level science topics including advanced chemistry, 
                  molecular biology, and environmental systems.</p>
              </CardContent>
              <CardFooter>
                <Button>Explore</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="competitions">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>International Science Olympiad</CardTitle>
                <CardDescription>Global Competition for Scientific Excellence</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Prepare for one of the most prestigious science competitions for high school students.
                   Our program provides specialized training in physics, chemistry, biology, and earth science.</p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Key Dates:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Registration Deadline: April 30, 2025</li>
                    <li>National Qualifying Round: June 15, 2025</li>
                    <li>International Finals: August 10-17, 2025</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Register for Training</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Academic Decathlon</CardTitle>
                <CardDescription>Comprehensive Academic Competition</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Compete in this prestigious competition covering ten academic disciplines including mathematics, 
                  science, literature, art, music, social science, economics, and more.</p>
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Preparation Schedule:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Summer Intensive Program: June-July 2025</li>
                    <li>Fall Training Camp: September 2025</li>
                    <li>Regional Competition: November 2025</li>
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Learn More</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-primary/10 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Scholarship Opportunities</h2>
        <p className="mb-4">Top performers in our Senior League competitions qualify for exclusive scholarship opportunities:</p>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="font-semibold mr-2">Excellence Scholarship:</span> 
            <span>For top 5% of participants - $5,000 toward college tuition</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">STEM Achievement Award:</span> 
            <span>For outstanding performance in science and mathematics - $3,500</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold mr-2">Academic Promise Grant:</span> 
            <span>For students showing exceptional improvement - $2,000</span>
          </li>
        </ul>
      </div>
      
      <div className="rounded-lg border p-6">
        <h2 className="text-2xl font-bold mb-4">University Partners</h2>
        <p className="mb-4">Our program is recognized by leading universities across the country, with many offering preferential consideration to our Senior League participants.</p>
        <Button variant="outline">View Partner Universities</Button>
      </div>
    </div>
  );
};

export default SeniorLeaguePage;