import React from 'react';
import TestimonialCard from './TestimonialCard';
import Icon from '../../../components/AppIcon';

const TestimonialsSection = () => {
  const testimonials = [
  {
    name: "Sarah Martinez",
    university: "Stanford University",
    major: "Computer Science, Junior",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1ce752c64-1763293622586.png",
    imageAlt: "Professional headshot of young Hispanic woman with long brown hair wearing white blouse smiling warmly at camera",
    quote: "CampusMind AI completely transformed how I manage my studies and stress. The AI coach feels like having a personal mentor available 24/7. My GPA improved from 3.2 to 3.8 in just one semester!",
    rating: 5
  },
  {
    name: "Michael Chen",
    university: "MIT",
    major: "Mechanical Engineering, Senior",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b20067f4-1763299340286.png",
    imageAlt: "Professional headshot of young Asian man with short black hair wearing navy blue suit and white shirt with confident smile",
    quote: "The stress tracking feature helped me identify burnout patterns before they became serious. The senior notes library saved me countless hours of research. This platform is a game-changer for engineering students.",
    rating: 5
  },
  {
    name: "Emily Johnson",
    university: "Harvard University",
    major: "Psychology, Sophomore",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1497cd398-1763294526444.png",
    imageAlt: "Professional headshot of young Caucasian woman with blonde hair in casual blue top smiling brightly outdoors",
    quote: "As someone who struggled with anxiety, the wellness tracking and AI coaching have been invaluable. The platform's insights helped me develop better study habits and maintain mental health balance throughout finals week.",
    rating: 5
  },
  {
    name: "David Patel",
    university: "UC Berkeley",
    major: "Business Administration, Junior",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17c989f9e-1763293351359.png",
    imageAlt: "Professional headshot of young Indian man with short dark hair wearing gray blazer and white shirt with friendly expression",
    quote: "The study planner's AI recommendations are incredibly accurate. It understands my learning patterns and suggests optimal study times. My productivity increased by 40% and stress levels dropped significantly.",
    rating: 5
  },
  {
    name: "Jessica Williams",
    university: "Yale University",
    major: "Pre-Med Biology, Senior",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e34b60fa-1763296065037.png",
    imageAlt: "Professional headshot of young African American woman with curly black hair wearing professional attire with warm smile",
    quote: "Preparing for MCAT while managing coursework was overwhelming until I found CampusMind AI. The analytics showed me exactly where to focus my energy. I scored in the 95th percentile thanks to this platform!",
    rating: 5
  },
  {
    name: "Alex Thompson",
    university: "Princeton University",
    major: "Economics, Sophomore",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1219eacec-1763294869102.png",
    imageAlt: "Professional headshot of young Caucasian man with brown hair wearing casual denim shirt with confident friendly smile",
    quote: "The real-time insights and progress tracking keep me accountable. I love how the platform adapts to my schedule and provides personalized recommendations. It\'s like having a study buddy who never sleeps!",
    rating: 5
  }];


  return (
    <section className="px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24 bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full text-success text-sm md:text-base font-medium">
            <Icon name="Users" size={16} />
            <span>Student Success Stories</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Trusted by Students at
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Top Universities
            </span>
          </h2>

          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Join thousands of successful students who transformed their academic journey with CampusMind AI. Real stories from real students achieving extraordinary results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials?.map((testimonial, index) =>
          <TestimonialCard
            key={index}
            name={testimonial?.name}
            university={testimonial?.university}
            major={testimonial?.major}
            image={testimonial?.image}
            imageAlt={testimonial?.imageAlt}
            quote={testimonial?.quote}
            rating={testimonial?.rating} />

          )}
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;