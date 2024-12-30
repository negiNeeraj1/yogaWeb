import React from "react";
import DarkModeClasses from "./DarkMode";

const RecommendedBatches = ({ onExplore, onBuyNow }) => {
  const recommendedBatches = [
    {
      id: 1,
      title: "Latest Course",
      batchName: "Foundational Poses (Asanas)",
      description: "Perfect for those just starting their yoga journey.",
      image: {
        src: "https://media.istockphoto.com/id/1219401141/photo/woman-practicing-yoga-in-lotus-position-at-park.jpg?s=612x612&w=0&k=20&c=Bk7HV73FLORtdNrnB9L0MI9tbMLB28W1c5N65bMiPvI=",
        alt: "Latest yoga course",
      },
      stats: {
        students: 1500,
        rating: 4.8,
      },
      duration: "8 weeks",
      originalPrice: 2000,
      discountedPrice: 1499,
    },
    {
      id: 2,
      title: "Most Purchased Course",
      batchName: "Gentle Hatha Yoga",
      description: "A calm and relaxing approach to basic yoga postures.",
      image: {
        src: "https://media.istockphoto.com/id/1919389111/photo/old-friends-meditating-on-mats-in-park.jpg?s=612x612&w=0&k=20&c=oJhWy2TBo4gxDfyIPkHqcH31tL2Y-Gj62eCYwY3hEmY=",
        alt: "Most purchased yoga course",
      },
      stats: {
        students: 1200,
        rating: 4.9,
      },
      duration: "10 weeks",
      originalPrice: 2500,
      discountedPrice: 1799,
    },
    {
      id: 3,
      title: "Featured Course",
      batchName: "Vinyasa Flow",
      description: "Dynamic flowing sequences synchronized with breath.",
      image: {
        src: "https://media.istockphoto.com/id/589554884/photo/woman-in-yoga-asana-vrikshasana-tree-pose-in-mountains-outdoors.jpg?s=612x612&w=0&k=20&c=ohUiTrrVA6A1G2WvxThRoahAO2EfcIGWTlr1F9FGYBE=",
        alt: "Featured yoga course",
      },
      stats: {
        students: 800,
        rating: 4.7,
      },
      duration: "12 weeks",
      originalPrice: 3000,
      discountedPrice: 2299,
    },
  ];

  const handleExplore = (id) => {
    if (onExplore) {
      onExplore(id);
    }
  };

  const handleBuyNow = (id) => {
    if (onBuyNow) {
      onBuyNow(id);
    }
  };

  return (
    <section className={`py-20 px-5 ${DarkModeClasses.background.primary}`}>
      <div className="max-w-6xl mx-auto w-full">
        <h2
          className={`text-3xl font-bold text-center mb-12 ${DarkModeClasses.text.primary}`}
        >
          Top Recommended Batches
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {recommendedBatches.map((batch) => (
            <div
              key={batch.id}
              className={`${DarkModeClasses.card} rounded-xl overflow-hidden w-full max-w-sm backdrop-blur-sm bg-opacity-80 dark:bg-opacity-30`}
            >
              <div className="relative group">
                <img
                  src={batch.image.src}
                  alt={batch.image.alt}
                  className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/400/320";
                    e.target.alt = "Placeholder image";
                  }}
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                  {batch.title}
                </div>
              </div>

              <div className="p-6">
                <h3
                  className={`text-xl font-semibold mb-2 ${DarkModeClasses.text.primary}`}
                >
                  {batch.batchName}
                </h3>
                <p
                  className={`mb-4 line-clamp-2 ${DarkModeClasses.text.secondary}`}
                >
                  {batch.description}
                </p>

                <div
                  className={`flex items-center gap-4 mb-4 text-sm ${DarkModeClasses.text.accent}`}
                >
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {batch.duration}
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    {batch.stats.students.toLocaleString()} students
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {batch.stats.rating}
                  </span>
                </div>

                <div
                  className={`flex items-center mb-4 ${DarkModeClasses.text.primary}`}
                >
                  <span className="text-2xl font-bold">
                    ₹{batch.discountedPrice}
                  </span>
                  <span
                    className={`ml-2 text-lg line-through ${DarkModeClasses.text.muted}`}
                  >
                    ₹{batch.originalPrice}
                  </span>
                  <span
                    className={`ml-2 text-sm ${DarkModeClasses.accent.success}`}
                  >
                    {Math.round(
                      (1 - batch.discountedPrice / batch.originalPrice) * 100
                    )}
                    % off
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleExplore(batch.id)}
                    className={`flex-1 py-2 rounded-lg font-semibold ${DarkModeClasses.button.primary} ${DarkModeClasses.hover.button}`}
                  >
                    Explore
                  </button>
                  <button
                    onClick={() => handleBuyNow(batch.id)}
                    className={`flex-1 py-2 rounded-lg font-semibold ${DarkModeClasses.button.outline} ${DarkModeClasses.hover.button}`}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedBatches;
