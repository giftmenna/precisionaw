import { Card, CardContent } from '@/components/ui/card';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: 'https://ekrgotbtktogzzoqrvxv.supabase.co/storage/v1/object/public/images//IMG_8749.JPG',
    alt: 'Students collaborating on a project',
    title: 'Unlocking Potential, One Equation at a Time!',
    description: 'Precision Academic World is more than a math community—it’s a movement! We inspire students to love math, think critically, and excel through competitions, engaging lessons, and a commitment to academic integrity. Join us in shaping a future where problem-solving is a superpower!'
  },
  {
    id: '2',
    src: 'https://ekrgotbtktogzzoqrvxv.supabase.co/storage/v1/object/public/images//IMG_8726.JPG',
    alt: 'Student studying with digital resources',
    title: 'Math Made Easy, Success Made Certain!',
    description: 'Struggling with math? We make it fun, accessible, and rewarding! From interactive lessons to real-world challenges, our community nurtures confident problem solvers. Be part of a space where numbers come alive!'
  },
  {
    id: '3',
    src: 'https://ekrgotbtktogzzoqrvxv.supabase.co/storage/v1/object/public/images//IMG_8747.JPG',
    alt: 'Teacher helping student',
    title: 'Shaping Math Geniuses, One Step at a Time!',
    description: 'At Precision Academic World, we turn confusion into clarity and fear into confidence. Whether you’re a beginner or a math enthusiast, our lessons, competitions, and community will sharpen your skills and ignite your passion!'
  },
  {
    id: '4',
    src: 'https://ekrgotbtktogzzoqrvxv.supabase.co/storage/v1/object/public/images//IMG_8703.JPG',
    alt: 'Students collaborating on a project',
    title: 'Math Without Limits—Learn, Compete, Excel!',
    description: 'Why struggle alone when you can thrive with us? We provide engaging lessons, fun competitions, and a supportive environment that makes math exciting and rewarding. Let’s make learning an adventure!'
  },
  {
    id: '5',
    src: 'https://ekrgotbtktogzzoqrvxv.supabase.co/storage/v1/object/public/images//IMG_8759.JPG',
    alt: 'Students collaborating on a project',
    title: 'Where Every Students Become a Math Champion!',
    description: 'Math! Through competition, expert guidance, and a supportive network, we help students develop skills that last a lifetime. Join us-Let’sconquer math together!'
  },
];

const PhotoGallery = () => {
  return (
    <section className="py-16 bg-white dark:bg-neutral-900 mt-8">
      <div className="container mx-auto px-4">
        <h2 className="font-poppins font-bold text-2xl md:text-3xl text-center mb-12 text-neutral-800 dark:text-white">
          Learning in Action
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-4">
                <h3 className="font-poppins font-semibold">{image.title}</h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">{image.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
