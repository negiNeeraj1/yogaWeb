import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowRight,
  Calendar,
  Activity,
  Heart,
} from "lucide-react";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    // Basic Info
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    phone: "",

    // Health Information
    height: "",
    weight: "",
    medicalConditions: [],
    medications: "",
    injuries: "",

    // Yoga Experience
    experienceLevel: "",
    practiceFrequency: "",
    preferredStyle: "",
    flexibility: "",
    strengthLevel: "",

    // Goals and Preferences
    fitnessGoals: [],
    focusAreas: [],
    preferredTime: "",
    sessionDuration: "",

    // Lifestyle
    occupation: "",
    stressLevel: "",
    sleepQuality: "",
    dietaryPreferences: "",
  });

  const medicalConditionOptions = [
    "None",
    "Back Pain",
    "Arthritis",
    "High Blood Pressure",
    "Diabetes",
    "Heart Condition",
    "Pregnancy",
    "Other",
  ];

  const yogaStyleOptions = [
    "Hatha",
    "Vinyasa",
    "Ashtanga",
    "Yin",
    "Restorative",
    "Power Yoga",
    "Not Sure",
  ];

  const fitnessGoalOptions = [
    "Flexibility",
    "Strength",
    "Weight Loss",
    "Stress Relief",
    "Better Sleep",
    "Pain Management",
    "Spiritual Growth",
  ];

  const focusAreaOptions = [
    "Back",
    "Core",
    "Upper Body",
    "Lower Body",
    "Balance",
    "Breathing",
    "Meditation",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const array = formData[name];
      setFormData((prev) => ({
        ...prev,
        [name]: checked
          ? [...array, value]
          : array.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentStep < 5 && !isLogin) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle final form submission
      console.log("Form submitted:", formData);
    }
  };

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              required
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-say">Prefer not to say</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderHealthInfo = () => (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Medical Conditions
        </label>
        <div className="grid grid-cols-2 gap-2">
          {medicalConditionOptions.map((condition) => (
            <label key={condition} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="medicalConditions"
                value={condition}
                checked={formData.medicalConditions.includes(condition)}
                onChange={handleInputChange}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm">{condition}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Injuries or Physical Limitations
        </label>
        <textarea
          name="injuries"
          value={formData.injuries}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          rows="3"
        ></textarea>
      </div>
    </div>
  );

  const renderYogaExperience = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Yoga Experience Level
        </label>
        <select
          name="experienceLevel"
          value={formData.experienceLevel}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          required
        >
          <option value="">Select Experience Level</option>
          <option value="beginner">Beginner (Never tried yoga)</option>
          <option value="novice">Novice (A few classes)</option>
          <option value="intermediate">Intermediate (Regular practice)</option>
          <option value="advanced">Advanced (Years of practice)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Yoga Style
        </label>
        <div className="grid grid-cols-2 gap-2">
          {yogaStyleOptions.map((style) => (
            <label key={style} className="flex items-center space-x-2">
              <input
                type="radio"
                name="preferredStyle"
                value={style}
                checked={formData.preferredStyle === style}
                onChange={handleInputChange}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm">{style}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Current Flexibility Level
        </label>
        <select
          name="flexibility"
          value={formData.flexibility}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          required
        >
          <option value="">Select Flexibility Level</option>
          <option value="limited">Limited</option>
          <option value="moderate">Moderate</option>
          <option value="good">Good</option>
          <option value="excellent">Excellent</option>
        </select>
      </div>
    </div>
  );

  const renderGoalsPreferences = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Fitness Goals
        </label>
        <div className="grid grid-cols-2 gap-2">
          {fitnessGoalOptions.map((goal) => (
            <label key={goal} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="fitnessGoals"
                value={goal}
                checked={formData.fitnessGoals.includes(goal)}
                onChange={handleInputChange}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm">{goal}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Areas to Focus On
        </label>
        <div className="grid grid-cols-2 gap-2">
          {focusAreaOptions.map((area) => (
            <label key={area} className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="focusAreas"
                value={area}
                checked={formData.focusAreas.includes(area)}
                onChange={handleInputChange}
                className="rounded text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm">{area}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Practice Time
        </label>
        <select
          name="preferredTime"
          value={formData.preferredTime}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">Select Preferred Time</option>
          <option value="early-morning">Early Morning (5-7 AM)</option>
          <option value="morning">Morning (7-11 AM)</option>
          <option value="afternoon">Afternoon (11 AM-4 PM)</option>
          <option value="evening">Evening (4-8 PM)</option>
          <option value="night">Night (After 8 PM)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Preferred Session Duration
        </label>
        <select
          name="sessionDuration"
          value={formData.sessionDuration}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">Select Session Duration</option>
          <option value="15">15 minutes</option>
          <option value="30">30 minutes</option>
          <option value="45">45 minutes</option>
          <option value="60">60 minutes</option>
          <option value="90">90 minutes</option>
        </select>
      </div>
    </div>
  );

  const renderLifestyle = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Occupation Type
        </label>
        <select
          name="occupation"
          value={formData.occupation}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">Select Occupation Type</option>
          <option value="desk-job">Desk Job</option>
          <option value="physical-labor">Physical Labor</option>
          <option value="service-industry">Service Industry</option>
          <option value="healthcare">Healthcare</option>
          <option value="education">Education</option>
          <option value="remote-work">Remote Work</option>
          <option value="student">Student</option>
          <option value="retired">Retired</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Daily Stress Level
        </label>
        <div className="flex gap-4">
          {["Low", "Moderate", "High", "Very High"].map((level) => (
            <label key={level} className="flex-1">
              <input
                type="radio"
                name="stressLevel"
                value={level.toLowerCase()}
                checked={formData.stressLevel === level.toLowerCase()}
                onChange={handleInputChange}
                className="sr-only peer"
              />
              <div className="text-center p-2 rounded-lg border peer-checked:bg-purple-500 peer-checked:text-white peer-checked:border-purple-500 cursor-pointer transition-all">
                {level}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sleep Quality
        </label>
        <div className="space-y-2">
          <select
            name="sleepQuality"
            value={formData.sleepQuality}
            onChange={handleInputChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Select Sleep Quality</option>
            <option value="excellent">Excellent (7-9 hours, consistent)</option>
            <option value="good">Good (6-7 hours, mostly consistent)</option>
            <option value="fair">Fair (5-6 hours, variable)</option>
            <option value="poor">Poor (Less than 5 hours or irregular)</option>
            <option value="insomnia">Difficulty sleeping</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Dietary Preferences
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            "Vegetarian",
            "Vegan",
            "Gluten-Free",
            "Dairy-Free",
            "Pescatarian",
            "No Restrictions",
            "Other",
          ].map((diet) => (
            <label key={diet} className="flex items-center space-x-2">
              <input
                type="radio"
                name="dietaryPreferences"
                value={diet.toLowerCase()}
                checked={formData.dietaryPreferences === diet.toLowerCase()}
                onChange={handleInputChange}
                className="text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm">{diet}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Daily Activity Level
        </label>
        <select
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleInputChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="">Select Activity Level</option>
          <option value="sedentary">Sedentary (Little to no exercise)</option>
          <option value="light">Light (Light exercise 1-3 days/week)</option>
          <option value="moderate">
            Moderate (Moderate exercise 3-5 days/week)
          </option>
          <option value="active">Active (Hard exercise 6-7 days/week)</option>
          <option value="very-active">
            Very Active (Hard exercise & physical job)
          </option>
        </select>
      </div>
    </div>
  );

  // Render form steps based on currentStep
  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInfo();
      case 2:
        return renderHealthInfo();
      case 3:
        return renderYogaExperience();
      case 4:
        return renderGoalsPreferences();
      case 5:
        return renderLifestyle();
      default:
        return renderBasicInfo();
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Basic Information";
      case 2:
        return "Health Information";
      case 3:
        return "Yoga Experience";
      case 4:
        return "Goals & Preferences";
      case 5:
        return "Lifestyle";
      default:
        return "Sign Up";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-[5rem]">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden">
        <div className="p-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Welcome to Yoga Life</h2>
          <p className="text-purple-100">
            {isLogin
              ? "Sign in to access your account"
              : `Step ${currentStep} of 5: ${getStepTitle()}`}
          </p>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="mb-8">
                <div className="flex justify-between mb-2">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div
                      key={step}
                      className={`w-1/6 h-2 rounded-full ${
                        step <= currentStep ? "bg-purple-600" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {isLogin ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              renderFormStep()
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              {isLogin
                ? "Sign In"
                : currentStep < 5
                ? "Next Step"
                : "Create Account"}
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setCurrentStep(1);
              }}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
