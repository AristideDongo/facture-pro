'use client'
import { testimonials } from '@/data/testimonials';
import { useState, useEffect } from 'react';


export default function TestimonialCarousel() {
  const [position, setPosition] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => prev - 1);
    }, 30);
    
    return () => clearInterval(interval);
  }, []);

  // Fonction pour calculer la position des témoignages avec effet d'infini
  const getItemStyle = (index: number) => {
    const itemWidth = 320; // Largeur d'un témoignage en pixels
    const itemsSpacing = 10
    const totalWidth = (itemWidth + itemsSpacing)* testimonials.length;
    
    // Calculer la position réelle en tenant compte de la position actuelle
    let adjustedPosition = (position % totalWidth) + (index *(itemWidth + itemsSpacing));
    
    // Si un témoignage sort complètement par la gauche, le replacer à droite
    if (adjustedPosition < -itemWidth) {
      adjustedPosition += totalWidth;
    }
    
    return {
      transform: `translateX(${adjustedPosition}px)`,
      transition: 'transform 0.1s linear'
    };
  };

  return (
    <div id='testimonials' className="relative w-full h-64 overflow-hidden">
      <div className="absolute top-0 left-0 h-full flex items-center">
        {[...testimonials, ...testimonials].map((testimonial, index) => (
          <div
            key={`${testimonial.id}-${index}`}
            className="absolute w-80 p-4 bg-transparent border-[#FAF6E9] border-2 rounded-lg shadow-md"
            style={getItemStyle(index)}
          >
            <div className="flex items-center mb-4">
              <div>
                <h3 className="font-bold text-[#FAF6E9]">{testimonial.name}</h3>
                <p className="text-sm text-[#DFD0B8]">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-[#FCEFCB]">{testimonial.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}