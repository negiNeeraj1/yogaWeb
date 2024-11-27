import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const poses = [
  {
    number: "01",
    title: "Sukhasana",
    description:
      "Sukhasana, or Easy Pose, is a simple seated posture that promotes relaxation and mindfulness. It helps in improving posture, reducing stress, and calming the mind.",
    image:
      "https://media.gettyimages.com/id/1320177756/photo/young-adult-woman-is-practicing-yoga-in-a-modern-loft.jpg?s=2048x2048&w=gi&k=20&c=b752gReApIgGY6Rq7o1-jPmsrbCw02XOfKrxb3HoSgU=",
  },
  {
    number: "02",
    title: "Downward Dog",
    description:
      "Adho Mukha Svanasana, or Downward-Facing Dog, is a foundational pose in yoga that stretches the hamstrings, calves, and spine. It also helps to strengthen the arms and legs while calming the mind.",
    image:
      "https://media.hearstapps.com/loop/downward-dog-edited-1-1617286688.mp4/poster.jpg",
  },
  {
    number: "03",
    title: "Warrior I",
    description:
      "Virabhadrasana I, or Warrior I, is a standing pose that strengthens the legs, opens the hips and chest, and improves focus and balance.",
    image:
      "https://yogajala.com/wp-content/uploads/2021/11/The-Yoga-Warrior-Pose-Explained_-The-5-Warrior-Poses.jpg",
  },
  {
    number: "04",
    title: "Tree Pose",
    description:
      "Vrksasana, or Tree Pose, is a balancing posture that strengthens the legs and core while improving focus and stability. It also opens the hips and stretches the inner thighs.",
    image:
      "https://t4.ftcdn.net/jpg/06/65/80/01/360_F_665800190_u59ww8djyzrHbyl0ptD55uHHgxo48qW7.jpg",
  },
  {
    number: "05",
    title: "Child's Pose",
    description:
      "Balasana, or Child's Pose, is a gentle resting pose that helps to stretch the back, hips, and thighs. It's often used to relax and center the mind during a yoga practice.",
    image:
      "https://t4.ftcdn.net/jpg/00/99/66/59/360_F_99665987_hAxRHpLXxxlDIvAZ7U7OItxoUgEsUPv2.jpg",
  },
];

const YogaPoses = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="py-20 bg-gray-50" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-indigo-600 font-semibold">Some Yoga Poses</span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            Your daily dose of health in 3 simple steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {poses.slice(0, showMore ? poses.length : 4).map((pose, index) => (
            <Link
              key={index} // Key moved to the Link component
              to="/pose-detail"
            >
              <div
                className="flex flex-col md:flex-row gap-8 items-center"
                data-aos="fade-up"
              >
                <div className="flex-1 space-y-4">
                  <p className="text-2xl font-bold text-indigo-600">
                    {pose.number}
                  </p>
                  <h3 className="text-xl font-bold text-gray-900">
                    {pose.title}
                  </h3>
                  <p className="text-gray-600">{pose.description}</p>
                </div>
                <div className="flex-1">
                  <img
                    src={pose.image}
                    alt={pose.title}
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-700"
          >
            {showMore ? "Show Less" : "See More"}
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default YogaPoses;
