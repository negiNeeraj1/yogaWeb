import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PricingPage = () => {
  const plans = [
    {
      name: "Basic",
      price: "$49/month",
      features: [
        "Access to all basic classes",
        "2 classes per week",
        "Basic app features",
        "Community support",
      ],
      isPopular: false,
    },
    {
      name: "Premium",
      price: "$89/month",
      features: [
        "Unlimited class access",
        "Personal instructor",
        "Premium app features",
        "Nutrition guidance",
        "24/7 support",
      ],
      isPopular: true,
    },
    {
      name: "Family",
      price: "$149/month",
      features: [
        "Access for up to 4 members",
        "Unlimited classes",
        "Family workshops",
        "Premium app features",
        "Priority booking",
      ],
      isPopular: false,
    },
  ];

  useEffect(() => {
    AOS.init();
  }, []);

  const handleChoosePlan = (planName) => {
    console.log(`Chosen Plan: ${planName}`);
    // You can add functionality here, e.g., navigate to checkout or open a modal
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Membership Plans
          </h1>
          <p className="text-xl text-gray-600">
            Choose the perfect plan for your practice
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg shadow-md p-8 relative ${
                plan.isPopular ? "border-2 border-indigo-600" : ""
              }`}
              data-aos="fade-up"
              data-aos-delay={100}
            >
              {plan.isPopular && (
                <span className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 text-sm rounded-bl">
                  Popular
                </span>
              )}
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                {plan.name}
              </h3>
              <p className="text-3xl font-bold text-gray-800 mb-6">
                {plan.price}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleChoosePlan(plan.name)}
                className={`w-full py-2 px-4 rounded transition ${
                  plan.isPopular
                    ? "bg-indigo-600 text-white hover:bg-indigo-700"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
