import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const customers = [
  {
    user1: {
      name: "john",
      image:
        "https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXZhdGFyfGVufDB8fDB8fHww",
    },
    uses2: {
      name: "mohit",
      image:
        "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXZhdGFyfGVufDB8fDB8fHww",
    },
    user3: {
      name: "sumit",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww",
    },
  },
];

const CustomTooltip = ({ children, content }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap"
          style={{
            animation: "fadeIn 0.2s ease-in-out",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            zIndex: 50,
          }}
        >
          {content}
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2"
            style={{
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid rgb(17, 24, 39)",
              width: 0,
              height: 0,
            }}
          />
        </div>
      )}
    </div>
  );
};

const Hero = () => {
  const navigate = useNavigate();
  const userArray = Object.values(customers[0]);

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translate(-50%, 10px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }
          
          .avatar-hover {
            transition: all 0.3s ease;
          }
          
          .avatar-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10;
          }
          
          .button-hover {
            transition: all 0.3s ease;
          }
          
          .button-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          }
          
          .image-hover {
            transition: all 0.5s ease;
          }
          
          .image-hover:hover {
            transform: scale(1.02);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          }
        `}
      </style>
      <div className="relative bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl font-bold leading-tight text-gray-900">
                Nourish your Mind,
                <br />
                Body, and Soul with
                <br />
                Yoga
              </h1>
              <p className="text-xl text-gray-600">
                The smart 365-days-per-year yoga plan to transform your body and
                mind. Tailored to your lifestyle and goals.
              </p>
              <div className="space-x-4">
                <button className="button-hover bg-indigo-600 text-white px-8 py-3 rounded-lg" onClick={()=>(navigate('/authPage'))}>
                  Start your journey
                </button>
                <button className="button-hover border border-indigo-600 text-indigo-600 px-8 py-3 rounded-lg">
                  Learn More <ArrowRight className="inline ml-2" size={20} />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {userArray.map((user, index) => (
                    <CustomTooltip
                      key={index}
                      content={
                        <div className="text-center">
                          <p className="font-semibold capitalize">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-300">
                            Yoga Enthusiast
                          </p>
                        </div>
                      }
                    >
                      <img
                        className="avatar-hover w-10 h-10 rounded-full border-2 border-white object-cover"
                        src={user.image}
                        alt={user.name}
                      />
                    </CustomTooltip>
                  ))}
                </div>
                <p className="text-gray-600">
                  Guided{" "}
                  <span className="font-bold text-indigo-600">5000+</span>{" "}
                  clients last year!
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src={
                  "https://media.istockphoto.com/id/1292399474/photo/woman-meditating-at-park.jpg?s=612x612&w=0&k=20&c=iWXLpMMYCWq59Z11E6qKqHBeTgzXedktGRmsObGvi7g="
                }
                alt="Yoga practitioner"
                className="image-hover w-full h-auto rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
