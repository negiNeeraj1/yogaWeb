import React, { useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  Star,
  MapPin,
  Award,
  Book,
  MessageSquare,
  Plus,
  X,
} from "lucide-react";
import { createInstructor } from "../api/api";
import axios from "axios";
import ComingSoonPage from "../components/ComingSoonPage";

const InstructorManagementModals = ({
  showAddModal,
  setShowAddModal,
  showEditModal,
  setShowEditModal,
  showDeleteConfirm,
  setShowDeleteConfirm,
  formData,
  handleInputChange,
  handleAddInstructor,
  handleEditInstructor,
  handleDeleteInstructor,
  selectedInstructor,
}) => {
  if (!showAddModal && !showDeleteConfirm && !showEditModal) return null;
  const handleFileChange = (e, field) => {
    handleInputChange({
      target: {
        name: field,
        value: e.target.files[0],
      },
    });
  };
  const handleArrayInput = (e, field) => {
    const value = e.target.value.split(",").map((item) => item.trim());
    handleInputChange({
      target: {
        name: field,
        value,
      },
    });
  };

  const renderForm = (onSubmit, submitText) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Personal Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone *
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ""}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Years of Experience
          </label>
          <input
            type="number"
            name="YOE"
            value={formData.YOE || ""}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Rating
          </label>
          <input
            type="number"
            name="rating"
            value={formData.rating || ""}
            onChange={handleInputChange}
            step="0.1"
            min="0"
            max="5"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
          />
        </div>
      </div>

      {/* Photos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Profile Photo
          </label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "main_photo")}
            accept="image/*"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cover Photo
          </label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e, "cover_photo")}
            accept="image/*"
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio || ""}
          onChange={handleInputChange}
          rows="4"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        ></textarea>
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location ? formData.location.join(", ") : ""}
          onChange={(e) => handleArrayInput(e, "location")}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
          placeholder="Downtown Studio, City Center, etc."
        />
      </div>

      {/* Array Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Certifications (comma-separated)
          </label>
          <input
            type="text"
            name="certifications"
            value={
              formData.certifications ? formData.certifications.join(", ") : ""
            }
            onChange={(e) => handleArrayInput(e, "certifications")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
            placeholder="RYT-200, First Aid, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Qualifications (comma-separated)
          </label>
          <input
            type="text"
            name="qualifications"
            value={
              formData.qualifications ? formData.qualifications.join(", ") : ""
            }
            onChange={(e) => handleArrayInput(e, "qualifications")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
            placeholder="Advanced Yoga, Meditation, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Specialties (comma-separated)
          </label>
          <input
            type="text"
            name="specialties"
            value={formData.specialties ? formData.specialties.join(", ") : ""}
            onChange={(e) => handleArrayInput(e, "specialties")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
            placeholder="Hatha, Vinyasa, etc."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Tips (comma-separated)
          </label>
          <input
            type="text"
            name="tips"
            value={formData.tips ? formData.tips.join(", ") : ""}
            onChange={(e) => handleArrayInput(e, "tips")}
            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
            placeholder="Breathe deeply, Stay hydrated, etc."
          />
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => {
            if (showAddModal) setShowAddModal(false);
            if (showEditModal) setShowEditModal(false);
          }}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          {submitText}
        </button>
      </div>
    </form>
  );

  return (
    <>
      {/* Modal Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />

      {/* Add/Edit Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {showAddModal ? "Add New Instructor" : "Edit Instructor"}
            </h2>
            <button
              onClick={() => {
                if (showAddModal) setShowAddModal(false);
                if (showEditModal) setShowEditModal(false);
              }}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X size={24} />
            </button>
          </div>
          {renderForm(
            showAddModal ? handleAddInstructor : handleEditInstructor,
            showAddModal ? "Add Instructor" : "Save Changes"
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-sm mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Confirm Delete
              </h2>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to delete {selectedInstructor?.name}? This
              action cannot be undone.
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteInstructor}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const InstructorManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bio: "",
    YOE: "",
    main_photo: null,
    cover_photo: null,
    certifications: [],

    location: "",
    qualifications: [],
    specialties: [],
    currentCourses: [],
    rating: "",
    tips: [],
  });

  const [instructors, setInstructors] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      image:
        "https://www.santander.co.uk/assets/s3fs-public/styles/d4/public/dimages/gettyimages-1361392268extendedpattern.jpg?itok=CfqdWipr",
      coverImage:
        "https://media.gettyimages.com/id/1405951139/photo/cat-wearing-summer-clothing.jpg?s=612x612&w=0&k=20&c=JcSIDE-rTXEduq-iplJjS6672w8a3Aba96hGl9erlqo=",
      qualifications: [
        "RYT-500",
        "Prenatal Yoga Certified",
        "Meditation Expert",
      ],
      location: "Downtown Studio",
      experience: 8,
      specialties: ["Hatha", "Vinyasa", "Prenatal"],
      currentCourses: ["Morning Flow", "Prenatal Basics", "Advanced Vinyasa"],
      rating: 4.9,
      feedback: [
        {
          id: 1,
          text: "Amazing prenatal yoga instructor! Made me feel safe and confident.",
          rating: 5,
        },
        {
          id: 2,
          text: "Her morning flow class is the perfect way to start the day.",
          rating: 5,
        },
      ],
      tips: [
        "Focus on breath synchronization in vinyasa flows",
        "Practice mindfulness off the mat",
        "Stay hydrated before and after practice",
      ],
    },
    {
      id: 2,
      name: "Michael Chen",
      image:
        "https://t4.ftcdn.net/jpg/00/77/51/81/360_F_77518136_F88I0v3R2mZsKEgxxXMc4iqXlOjK8OLE.jpg",
      coverImage:
        "https://media.gettyimages.com/id/182158909/photo/tabby-cat-riding-a-bicycle-with-sunglasses.jpg?s=612x612&w=0&k=20&c=v9iVkFCj0M9_X0FKEa5EyONPvF_Dy5y5Lt088zgte9g=",
      qualifications: ["RYT-200", "Ashtanga Certified", "Yoga Therapy"],
      location: "East End Studio",
      experience: 5,
      specialties: ["Ashtanga", "Power Yoga", "Therapeutic"],
      currentCourses: ["Ashtanga Primary", "Yoga Basics", "Therapeutic Yoga"],
      rating: 4.8,
      feedback: [
        {
          id: 1,
          text: "Michael's attention to alignment is exceptional.",
          rating: 5,
        },
        {
          id: 2,
          text: "Great at adapting poses for different ability levels.",
          rating: 4,
        },
      ],
      tips: [
        "Maintain steady ujjayi breath",
        "Build strength through consistent practice",
        "Listen to your body's limits",
      ],
    },
  ]);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddInstructor = async () => {
    try {
      const processedFormData = {
        ...formData,
        location: formData.location
          ? Array.isArray(formData.location)
            ? formData.location
            : formData.location.split(",").map((item) => item.trim())
          : [],
        certifications: formData.certifications
          ? Array.isArray(formData.certifications)
            ? formData.certifications
            : formData.certifications.split(",").map((item) => item.trim())
          : [],
        qualifications: formData.qualifications
          ? Array.isArray(formData.qualifications)
            ? formData.qualifications
            : formData.qualifications.split(",").map((item) => item.trim())
          : [],
        specialties: formData.specialties
          ? Array.isArray(formData.specialties)
            ? formData.specialties
            : formData.specialties.split(",").map((item) => item.trim())
          : [],
        tips: formData.tips
          ? Array.isArray(formData.tips)
            ? formData.tips
            : formData.tips.split(",").map((item) => item.trim())
          : [],
      };

      const response = await createInstructor(processedFormData);

      if (response.success) {
        const newInstructor = {
          id: response.data._id,
          name: `${response.data.firstName} ${response.data.lastName}`,
          image: response.data.main_photo || "/default-profile.jpg",
          coverImage: response.data.cover_photo || "/default-cover.jpg",
          qualifications: response.data.qualifications || [],
          location: response.data.location?.[0] || "",
          experience: response.data.YOE || 0,
          specialties: response.data.specialties || [],
          currentCourses: [],
          rating: parseFloat(response.data.rating) || 0,
          feedback: [],
          tips: response.data.tips || [],
        };

        setInstructors([...instructors, newInstructor]);
        setShowAddModal(false);
        setFormData({}); 

        alert("Instructor added successfully!");
      }
    } catch (error) {
      console.error("Error creating instructor:", error);
      alert("Error creating instructor. Please try again.");
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        [field]: file,
      });
    }
  };

  const handleEditInstructor = () => {
    const updatedInstructors = instructors.map((instructor) =>
      instructor.id === selectedInstructor.id
        ? { ...instructor, ...formData }
        : instructor
    );
    setInstructors(updatedInstructors);
    setShowEditModal(false);
    setSelectedInstructor(null);
    setFormData({});
  };

  const handleDeleteInstructor = () => {
    setInstructors(
      instructors.filter(
        (instructor) => instructor.id !== selectedInstructor.id
      )
    );
    setShowDeleteConfirm(false);
    setSelectedInstructor(null);
  };

  const filteredInstructors = instructors.filter(
    (instructor) =>
      instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      instructor.specialties.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const [show] = useState(true);

  return show ? (
    <ComingSoonPage />
  ) : (
    <div
      className={`min-h-screen transition-colors duration-200 dark:bg-gray-900 dark:text-gray-100 bg-slate-100 text-gray-900 px-2 py-3 `}
    >
      <div className="max-w-[82rem] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl py-2 font-bold bg-gradient-to-r from-gray-900 to-gray-500 dark:from-pink-600 dark:to-pink-700 bg-clip-text text-transparent">
            Instructor Management
          </h1>

          <div className="flex space-x-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              <Plus size={20} />
              Add Instructor
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search instructors by name or specialty..."
            className="w-full p-3 pl-10 rounded-lg border dark:border-slate-600 dark:bg-slate-800 
                     dark:focus:border-purple-500 focus:border-purple-500 outline-none transition-colors duration-200
                     dark:placeholder-gray-400 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Instructors List */}
          <div className="md:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredInstructors.map((instructor) => (
                <div
                  key={instructor.id}
                  onClick={() => setSelectedInstructor(instructor)}
                  className="cursor-pointer rounded-lg border dark:border-slate-600 bg-white 
                           dark:bg-slate-800 hover:shadow-lg dark:hover:shadow-slate-700/50 
                           transition-all duration-200 overflow-hidden group flex "
                >
                  <div className="p-4 flex items-start space-x-5">
                    <img
                      src={instructor.image}
                      alt={instructor.name}
                      className="w-20 h-20 rounded-full object-cover ring-2 ring-purple-500/20 group-hover:ring-purple-500/50 transition-all duration-200 "
                    />
                    <div>
                      <h3 className="font-semibold text-lg group-hover:text-purple-500 transition-colors duration-200">
                        {instructor.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                        <MapPin size={16} className="mr-1 text-purple-500" />
                        {instructor.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                        <Award size={16} className="mr-1 text-purple-500" />
                        {instructor.experience} years experience
                      </div>
                      <div className="flex items-center text-sm text-yellow-500 mt-1">
                        <Star size={16} className="mr-1" fill="currentColor" />
                        {instructor.rating}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor Details */}
          {selectedInstructor && (
            <div
              className="md:col-span-1 rounded-lg border dark:border-slate-600 bg-white 
                dark:bg-slate-800 transition-colors duration-200 overflow-hidden"
            >
              <div className="p-4">
                <div className="relative mb-6">
                  <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                    <img
                      src={selectedInstructor.coverImage}
                      alt={selectedInstructor.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        console.error(
                          "Error loading cover image:",
                          e.target.src
                        );
                        e.target.src = "fallback-image-url";
                      }}
                    />

                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInstructor(selectedInstructor);
                          setFormData(selectedInstructor);
                          setShowEditModal(true);
                        }}
                        className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
                      >
                        <Edit className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInstructor(selectedInstructor);
                          setShowDeleteConfirm(true);
                        }}
                        className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg"
                      >
                        <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>

                  {/* Profile image overlay */}
                  <div className="absolute -bottom-4 left-4">
                    <div className="relative">
                      <img
                        src={selectedInstructor.image}
                        alt={selectedInstructor.name}
                        className="w-24 h-24 rounded-full border-4 border-white dark:border-slate-800 
                       object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
                      />
                      <div
                        className="absolute -bottom-2 -right-2 bg-green-500 w-5 h-5 rounded-full 
                          border-2 border-white dark:border-slate-800"
                      ></div>
                    </div>
                  </div>
                </div>

                <h2
                  className="text-xl font-semibold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 
                     bg-clip-text text-transparent pl-32"
                >
                  {selectedInstructor.name}
                </h2>

                {/* <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedInstructor(selectedInstructor);
                      setFormData(selectedInstructor);
                      setShowEditModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedInstructor(instructor);
                      setShowDeleteConfirm(true);
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={16} />
                  </button>
                </div> */}

                <div className="space-y-6">
                  {/* Rest of the content remains the same */}
                  <div>
                    <h3 className="font-medium mb-2 flex items-center text-purple-500 dark:text-purple-400">
                      <Award size={16} className="mr-2" />
                      Qualifications
                    </h3>
                    <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-300">
                      {selectedInstructor.qualifications.map((qual, idx) => (
                        <li
                          key={idx}
                          className="hover:text-purple-500 transition-colors duration-200"
                        >
                          {qual}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2 flex items-center text-purple-500 dark:text-purple-400">
                      <Book size={16} className="mr-2" />
                      Current Courses
                    </h3>
                    <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-300">
                      {selectedInstructor.currentCourses.map((course, idx) => (
                        <li
                          key={idx}
                          className="hover:text-purple-500 transition-colors duration-200"
                        >
                          {course}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2 flex items-center text-purple-500 dark:text-purple-400">
                      <MessageSquare size={16} className="mr-2" />
                      Recent Feedback
                    </h3>
                    <div className="space-y-2">
                      {selectedInstructor.feedback.map((fb) => (
                        <div
                          key={fb.id}
                          className="text-sm p-3 rounded-lg bg-gray-50 dark:bg-slate-700/50 
                                                  border dark:border-slate-600 hover:border-purple-500 transition-colors duration-200"
                        >
                          <div className="flex items-center text-yellow-500 mb-1">
                            {[...Array(fb.rating)].map((_, i) => (
                              <Star key={i} size={12} fill="currentColor" />
                            ))}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300">
                            {fb.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2 text-purple-500 dark:text-purple-400">
                      Yoga Tips
                    </h3>
                    <ul className="list-disc list-inside text-sm space-y-1 text-gray-600 dark:text-gray-300">
                      {selectedInstructor.tips.map((tip, idx) => (
                        <li
                          key={idx}
                          className="hover:text-purple-500 transition-colors duration-200"
                        >
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <InstructorManagementModals
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        showDeleteConfirm={showDeleteConfirm}
        setShowDeleteConfirm={setShowDeleteConfirm}
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddInstructor={handleAddInstructor}
        handleEditInstructor={handleEditInstructor}
        handleDeleteInstructor={handleDeleteInstructor}
        selectedInstructor={selectedInstructor}
      />
    </div>
  );
};

export default InstructorManagement;
