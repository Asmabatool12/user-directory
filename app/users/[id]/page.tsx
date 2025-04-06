"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Mail,
  Phone,
  Globe,
  MapPin,
  Edit,
  Calendar,
} from "lucide-react";
import users from "@/data/users.json";

export default function UserProfile({ params }: { params: { id: string } }) {
  const userId = Number.parseInt(params.id);
  const user = users.find((user) => user.id === userId);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFavorite, setIsFavorite] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            User Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The user you're looking for doesn't exist.
          </p>
          <Link
            href="/"
            className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-gray-500 hover:text-gray-700 mr-4">
                <ArrowLeft size={20} />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {user.name}
                </h1>
                <div className="flex items-center text-xs text-gray-500">
                  <span>User Profile</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mx-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <span>{user.id}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full ${
                  isFavorite ? "text-gray-900" : "text-gray-400"
                } hover:bg-gray-100`}
                aria-label={
                  isFavorite ? "Remove from favorites" : "Add to favorites"
                }
              >
                <Star size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>

              <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center">
                <Edit size={16} className="mr-2" />
                <span className="hidden sm:inline">Edit Profile</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          {/* User header */}
          <div className="bg-white rounded-md overflow-hidden border border-gray-100 mb-8">
            <div className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-900 font-medium text-2xl mb-4 sm:mb-0 sm:mr-6">
                  {user.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {user.name}
                    </h2>
                    <span className="inline-flex mt-1 sm:mt-0 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {user.role}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1">
                    {user.location || "San Francisco, CA"}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {user.skills?.slice(0, 5).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600"
                      >
                        {skill}
                      </span>
                    ))}
                    {user.skills?.length > 5 && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-500">
                        +{user.skills.length - 5}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content tabs */}
          <div className="mb-8 border-b border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "overview"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("experience")}
                className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "experience"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Experience
              </button>
              <button
                onClick={() => setActiveTab("skills")}
                className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "skills"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Skills
              </button>
              <button
                onClick={() => setActiveTab("contact")}
                className={`px-4 py-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === "contact"
                    ? "border-gray-900 text-gray-900"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Contact
              </button>
            </div>
          </div>

          {/* Tab content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Overview tab */}
              {activeTab === "overview" && (
                <>
                  {/* About section */}
                  <div className="bg-white rounded-md overflow-hidden border border-gray-100">
                    <div className="p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        About
                      </h3>
                      <div className="prose prose-sm text-gray-600 max-w-none">
                        <p>{user.description}</p>
                        <p className="mt-4">
                          {`${user.name} is a highly skilled professional with extensive experience in their field. 
                          They are known for their attention to detail, creative problem-solving abilities, and dedication to delivering 
                          exceptional results. Throughout their career, they have successfully collaborated with cross-functional teams 
                          to achieve business objectives and drive innovation.`}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Projects section */}
                  <div className="bg-white rounded-md overflow-hidden border border-gray-100">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-medium text-gray-900">
                          Projects
                        </h3>
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          View all
                        </button>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="border border-gray-100 rounded-md p-4 hover:border-gray-300 hover:shadow-sm transition-all">
                          <h4 className="font-medium text-gray-900 mb-2 text-sm">
                            Design System Implementation
                          </h4>
                          <p className="text-gray-600 text-xs mb-3">
                            Created a comprehensive design system to ensure
                            consistency across all products.
                          </p>
                          <div className="flex items-center text-gray-500 text-xs font-medium">
                            <span>View details</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5 ml-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="border border-gray-100 rounded-md p-4 hover:border-gray-300 hover:shadow-sm transition-all">
                          <h4 className="font-medium text-gray-900 mb-2 text-sm">
                            Product Redesign
                          </h4>
                          <p className="text-gray-600 text-xs mb-3">
                            Led the redesign of the main product interface,
                            improving user satisfaction by 35%.
                          </p>
                          <div className="flex items-center text-gray-500 text-xs font-medium">
                            <span>View details</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5 ml-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Experience tab */}
              {activeTab === "experience" && (
                <div className="bg-white rounded-md overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">
                      Experience
                    </h3>
                    <div className="space-y-8">
                      {(
                        user.experience || [
                          {
                            role: user.role,
                            company: "Tech Innovations Inc.",
                            period: "2020 - Present",
                            description:
                              "Leading projects and initiatives in their area of expertise.",
                          },
                          {
                            role: "Senior Specialist",
                            company: "Digital Solutions Co.",
                            period: "2017 - 2020",
                            description:
                              "Developed and implemented strategies to improve processes and outcomes.",
                          },
                        ]
                      ).map((exp, index) => (
                        <div
                          key={index}
                          className="relative pl-6 border-l border-gray-200 pb-6 last:pb-0"
                        >
                          <div className="absolute left-0 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-900 border-2 border-white"></div>
                          <div>
                            <h4 className="text-base font-medium text-gray-900">
                              {exp.role}
                            </h4>
                            <div className="flex flex-col xs:flex-row xs:items-center mt-1 mb-2 text-sm">
                              <span className="text-gray-700">
                                {exp.company}
                              </span>
                              <span className="hidden xs:block mx-2 text-gray-300">
                                •
                              </span>
                              <span className="text-gray-500 flex items-center">
                                <Calendar size={14} className="mr-1" />
                                {exp.period}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">
                              {exp.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Skills tab */}
              {activeTab === "skills" && (
                <div className="bg-white rounded-md overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">
                      Skills & Expertise
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Technical Skills
                        </h4>
                        <div className="space-y-4">
                          {user.skills
                            ?.slice(0, Math.ceil(user.skills.length / 2))
                            .map((skill, index) => (
                              <div key={index}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-gray-600">
                                    {skill}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {Math.floor(Math.random() * 30) + 70}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className="bg-gray-900 h-1.5 rounded-full"
                                    style={{
                                      width: `${
                                        Math.floor(Math.random() * 30) + 70
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Additional Skills
                        </h4>
                        <div className="space-y-4">
                          {user.skills
                            ?.slice(Math.ceil(user.skills.length / 2))
                            .map((skill, index) => (
                              <div key={index}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm text-gray-600">
                                    {skill}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {Math.floor(Math.random() * 30) + 70}%
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div
                                    className="bg-gray-900 h-1.5 rounded-full"
                                    style={{
                                      width: `${
                                        Math.floor(Math.random() * 30) + 70
                                      }%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact tab */}
              {activeTab === "contact" && (
                <div className="bg-white rounded-md overflow-hidden border border-gray-100">
                  <div className="p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-6">
                      Contact Information
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 mr-4">
                          <Mail size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </h4>
                          <p className="text-gray-600">
                            {user.email ||
                              `${user.name
                                .toLowerCase()
                                .replace(" ", ".")}@example.com`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 mr-4">
                          <Phone size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </h4>
                          <p className="text-gray-600">
                            {user.phone || "(555) 123-4567"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 mr-4">
                          <Globe size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">
                            Website
                          </h4>
                          <p className="text-gray-600">
                            {user.website || "www.example.com/portfolio"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 mr-4">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-1">
                            Location
                          </h4>
                          <p className="text-gray-600">
                            {user.location || "San Francisco, CA"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <button className="w-full bg-gray-900 text-white py-2 rounded-md text-sm font-medium transition-colors">
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar column */}
            <div className="space-y-8">
              {/* Contact information */}
              <div className="bg-white rounded-md overflow-hidden border border-gray-100">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Quick Contact
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <span className="text-gray-600 text-sm">
                        {user.email ||
                          `${user.name
                            .toLowerCase()
                            .replace(" ", ".")}@example.com`}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <span className="text-gray-600 text-sm">
                        {user.phone || "(555) 123-4567"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <Globe className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <span className="text-gray-600 text-sm">
                        {user.website || "www.example.com/portfolio"}
                      </span>
                    </li>
                    <li className="flex items-start">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                      <span className="text-gray-600 text-sm">
                        {user.location || "San Francisco, CA"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-md overflow-hidden border border-gray-100">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {user.skills?.map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-md overflow-hidden border border-gray-100">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-900 text-gray-900 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                      <Edit size={16} className="mr-2" />
                      Edit Profile
                    </button>
                    <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-200 text-gray-500 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
                      <Calendar size={16} className="mr-2" />
                      Schedule Meeting
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back button */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50 transition-colors text-sm font-medium flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Directory
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
