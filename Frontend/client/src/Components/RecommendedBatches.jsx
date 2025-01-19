import React from "react";
import { motion } from "framer-motion";
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
      features: [
        "24/7 Support",
        "Live Sessions",
        "Recorded Classes",
        "Mobile App Access",
      ],
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
      features: [
        "Personal Mentor",
        "Live Sessions",
        "Certificate",
        "Community Access",
      ],
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
      features: [
        "Expert Guidance",
        "Premium Content",
        "Weekend Workshops",
        "Lifetime Access",
      ],
    },
  ];

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    hover: {
      y: -8,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  const badgeVariants = {
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
  };

  return (
    <section className={`py-20 px-5 ${DarkModeClasses.background.primary}`}>
      <div className="max-w-6xl mx-auto w-full">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-3xl font-bold text-center mb-12 ${DarkModeClasses.text.primary}`}
        >
          Top Recommended Batches
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {recommendedBatches.map((batch, index) => (
            <motion.div
              key={batch.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className={`${DarkModeClasses.card.gradient}  rounded-xl overflow-hidden w-full max-w-sm shadow-lg backdrop-blur-sm bg-opacity-80 dark:bg-opacity-30`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative group overflow-hidden">
                <motion.img
                  src={batch.image.src}
                  alt={batch.image.alt}
                  className="w-full h-48 object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onError={(e) => {
                    e.target.src = "/api/placeholder/400/320";
                    e.target.alt = "Placeholder image";
                  }}
                />
                <motion.div
                  variants={badgeVariants}
                  className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                >
                  {batch.title}
                </motion.div>
              </div>

              <div className="p-6 space-y-4">
                <h3
                  className={`text-xl font-semibold ${DarkModeClasses.text.primary}`}
                >
                  {batch.batchName}
                </h3>

                <p className={`text-sm ${DarkModeClasses.text.secondary}`}>
                  {batch.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {batch.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2 py-1 rounded-full bg-rose-200/20 text-rose-500 dark:bg-yellow-100/40 dark:text-white bg-opacity-20`}
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center"
                    >
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(batch.stats.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </motion.div>
                    <span
                      className={`text-sm ${DarkModeClasses.text.secondary}`}
                    >
                      ({batch.stats.students} students)
                    </span>
                  </div>
                  <span className={`text-sm ${DarkModeClasses.text.secondary}`}>
                    {batch.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span
                      className={`text-2xl font-bold ${DarkModeClasses.text.primary}`}
                    >
                      ₹{batch.discountedPrice}
                    </span>
                    <span
                      className={`ml-2 text-sm line-through ${DarkModeClasses.text.muted}`}
                    >
                      ₹{batch.originalPrice}
                    </span>
                  </div>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className={`px-2 py-1 rounded-full text-sm ${DarkModeClasses.accent.success}`}
                  >
                    Save{" "}
                    {Math.round(
                      (1 - batch.discountedPrice / batch.originalPrice) * 100
                    )}
                    %
                  </motion.span>
                </div>

                <div className="flex gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onExplore?.(batch.id)}
                    className={`flex-1 py-2 rounded-lg font-semibold ${DarkModeClasses.button.primary}`}
                  >
                    Explore
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onBuyNow?.(batch.id)}
                    className={`flex-1 py-2 rounded-lg font-semibold ${DarkModeClasses.button.outline}`}
                  >
                    Buy Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendedBatches;
