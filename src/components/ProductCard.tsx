import { useState } from "react";

interface ProductCardProps {
  image: string;
  name: string;
  description?: string;
}

const project_base_path = import.meta.env.BASE_URL;

export default function ProductCard({
  image,
  name,
  description,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full" style={{ height: "300px" }}>
        <img src={image} alt={name} className="object-cover w-full h-full" />
        {isHovered && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <a href={`${project_base_path}/contact`}>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">
                Contact for Details
              </button>
            </a>
          </div>
        )}
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        {description && (
          <p className="text-gray-600 text-sm flex-grow">{description}</p>
        )}
      </div>
    </div>
  );
}
