import React from 'react';

const RecommendedBatches = ({ onExplore, onBuyNow }) => {
  const recommendedBatches = [
    {
      id: 1,
      title: "Latest Course",
      batchName: "Foundational Poses (Asanas)",
      description: "Perfect for those just starting their yoga journey.",
      image: {
        src: "https://media.istockphoto.com/id/1219401141/photo/woman-practicing-yoga-in-lotus-position-at-park.jpg?s=612x612&w=0&k=20&c=Bk7HV73FLORtdNrnB9L0MI9tbMLB28W1c5N65bMiPvI=",
        alt: "Latest yoga course"
      },
      stats: {
        students: 1500,
        rating: 4.8
      },
      duration: "8 weeks",
      originalPrice: 2000,
      discountedPrice: 1499
    },
    {
      id: 2,
      title: "Most Purchased Course",
      batchName: "Gentle Hatha Yoga",
      description: "A calm and relaxing approach to basic yoga postures.",
      image: {
        src: "https://media.istockphoto.com/id/1919389111/photo/old-friends-meditating-on-mats-in-park.jpg?s=612x612&w=0&k=20&c=oJhWy2TBo4gxDfyIPkHqcH31tL2Y-Gj62eCYwY3hEmY=",
        alt: "Most purchased yoga course"
      },
      stats: {
        students: 1200,
        rating: 4.9
      },
      duration: "10 weeks",
      originalPrice: 2500,
      discountedPrice: 1799
    },
    {
      id: 3,
      title: "Featured Course",
      batchName: "Vinyasa Flow",
      description: "Dynamic flowing sequences synchronized with breath.",
      image: {
        src: "https://media.istockphoto.com/id/589554884/photo/woman-in-yoga-asana-vrikshasana-tree-pose-in-mountains-outdoors.jpg?s=612x612&w=0&k=20&c=ohUiTrrVA6A1G2WvxThRoahAO2EfcIGWTlr1F9FGYBE=",
        alt: "Featured yoga course"
      },
      stats: {
        students: 800,
        rating: 4.7
      },
      duration: "12 weeks",
      originalPrice: 3000,
      discountedPrice: 2299
    }
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
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Top Recommended Batches
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recommendedBatches.map((batch) => (
            <div key={batch.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img
                  src={batch.image.src}
                  alt={batch.image.alt}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/400/320";
                    e.target.alt = "Placeholder image";
                  }}
                />
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {batch.title}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {batch.batchName}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {batch.description}
                </p>
                
                {/* Course Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {batch.duration}
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {batch.stats.students.toLocaleString()} students
                  </span>
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {batch.stats.rating}
                  </span>
                </div>

                {/* Price Section */}
                <div className="flex items-center mb-4">
                  <span className="text-2xl font-bold text-gray-800">
                    ₹{batch.discountedPrice}
                  </span>
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    ₹{batch.originalPrice}
                  </span>
                  <span className="ml-2 text-green-500 text-sm">
                    {Math.round((1 - batch.discountedPrice / batch.originalPrice) * 100)}% off
                  </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button 
                    onClick={() => handleExplore(batch.id)}
                    className="flex-1 button-hover btn-all btn-hover text-white py-2 rounded-lg transition-colors duration-300"  style={{fontWeight:"600"}}
                  >
                    Explore
                  </button>
                  <button 
                    onClick={() => handleBuyNow(batch.id)}
                    className="flex-1 button-hover  text-white py-2 rounded-lg transition-colors duration-300"style={{border:"1px solid #e97963",color:"#e97963",fontWeight:"600"}}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedBatches;