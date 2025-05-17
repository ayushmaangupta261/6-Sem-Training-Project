import { useState, useEffect } from "react";

import disney from "./../assets/Images/disney.png";
import marvel from "./../assets/Images/marvel.png";
import nationalG from "./../assets/Images/nationalG.png";
import pixar from "./../assets/Images/pixar.png";
import starwar from "./../assets/Images/starwar.png";

import starwarV from "./../assets/Videos/star-wars.mp4";
import disneyV from "./../assets/Videos/disney.mp4";
import marvelV from "./../assets/Videos/marvel.mp4";
import nationalGeographicV from "./../assets/Videos/national-geographic.mp4";
import pixarV from "./../assets/Videos/pixar.mp4";

function ProductionHouse() {
  const [activeVideo, setActiveVideo] = useState(null);

  const productionHouseList = [
    { id: 1, image: disney, video: disneyV },
    { id: 2, image: pixar, video: pixarV },
    { id: 3, image: marvel, video: marvelV },
    { id: 4, image: starwar, video: starwarV },
    { id: 5, image: nationalG, video: nationalGeographicV },
  ];

  const closeModal = () => setActiveVideo(null);

  useEffect(() => {
    // Prevent background scroll when modal is open
    document.body.style.overflow = activeVideo ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeVideo]);

  return (
    <>
      <div className="flex gap-5 mt-5 p-2 px-16">
        {productionHouseList.map((item) => (
          <div
            key={item.id}
            className="relative border-[2px] border-gray-600 rounded-lg hover:scale-110 transition-all duration-300 ease-in shadow-xl shadow-gray-800 cursor-pointer"
            onClick={() => setActiveVideo(item.video)}
          >
            <video
              src={item.video}
              autoPlay
              loop
              muted
              className="absolute top-0 rounded-md z-0 hover:opacity-50"
            />
            <img
              src={item.image}
              alt="production"
              className="w-full z-[1] hover:opacity-100"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
          onClick={closeModal}
        >
          <div
            className="relative w-[80%] max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 z-10 cursor-pointer text-white text-3xl font-bold bg-black/50 px-3 py-1 rounded"
              onClick={closeModal}
            >
              &times;
            </button>
            <video
              src={activeVideo}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductionHouse;
