"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Grid, List, X, Bell, Plus } from "lucide-react";
import userData from "@/data/users.json";
import UserCard from "@/components/UserCard";
import UserListItem from "@/components/UserListItem";
import FilterChip from "@/components/FilterChip";

type User = {
  id: number;
  name: string;
  role: string;
  description: string;
  skills?: string[];
  location?: string;
  email?: string;
  company?: string;
  experience?: Array<{
    role: string;
    company: string;
    period: string;
    description: string;
  }>;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>(userData);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(userData);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    roles: string[];
    skills: string[];
    locations: string[];
  }>({
    roles: [],
    skills: [],
    locations: [],
  });

  // Get unique values for filters
  const allRoles = Array.from(new Set(users.map((user) => user.role)));
  const allSkills = Array.from(
    new Set(users.flatMap((user) => user.skills || []))
  );
  const allLocations = Array.from(
    new Set(users.map((user) => user.location || "").filter(Boolean))
  );

  // Handle search and filtering
  useEffect(() => {
    let result = [...users];

    // Apply search
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        (user) =>
          user.name.toLowerCase().includes(lowerSearchTerm) ||
          user.role.toLowerCase().includes(lowerSearchTerm) ||
          user.description.toLowerCase().includes(lowerSearchTerm) ||
          (user.skills &&
            user.skills.some((skill) =>
              skill.toLowerCase().includes(lowerSearchTerm)
            ))
      );
    }

    // Apply role filters
    if (activeFilters.roles.length > 0) {
      result = result.filter((user) => activeFilters.roles.includes(user.role));
    }

    // Apply skill filters
    if (activeFilters.skills.length > 0) {
      result = result.filter(
        (user) =>
          user.skills &&
          user.skills.some((skill) => activeFilters.skills.includes(skill))
      );
    }

    // Apply location filters
    if (activeFilters.locations.length > 0) {
      result = result.filter(
        (user) =>
          user.location && activeFilters.locations.includes(user.location)
      );
    }

    setFilteredUsers(result);
  }, [searchTerm, activeFilters, users]);

  // Toggle filter for a specific category
  const toggleFilter = (
    category: "roles" | "skills" | "locations",
    value: string
  ) => {
    setActiveFilters((prev) => {
      const currentFilters = [...prev[category]];
      const index = currentFilters.indexOf(value);

      if (index === -1) {
        currentFilters.push(value);
      } else {
        currentFilters.splice(index, 1);
      }

      return {
        ...prev,
        [category]: currentFilters,
      };
    });
  };

  // Remove a specific filter
  const removeFilter = (
    category: "roles" | "skills" | "locations",
    value: string
  ) => {
    setActiveFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item !== value),
    }));
  };

  // Clear all filters
  const clearAllFilters = () => {
    setActiveFilters({
      roles: [],
      skills: [],
      locations: [],
    });
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-semibold text-gray-900">
                UserOS
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <button
                className="p-2 rounded-full text-gray-500 hover:bg-gray-50 relative"
                aria-label="Notifications"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-gray-900"></span>
              </button>

              <button className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center">
                <Plus size={16} className="mr-2" />
                <span className="hidden sm:inline">Add User</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search and filters */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="relative flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900 placeholder-gray-500"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="relative">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="px-4 py-2 rounded-md border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                >
                  <Filter size={16} />
                  <span>Filters</span>
                  {(activeFilters.roles.length > 0 ||
                    activeFilters.skills.length > 0 ||
                    activeFilters.locations.length > 0) && (
                    <span className="ml-1 bg-gray-900 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {activeFilters.roles.length +
                        activeFilters.skills.length +
                        activeFilters.locations.length}
                    </span>
                  )}
                </button>

                {isFilterOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-medium text-gray-900">Filters</h3>
                        <button
                          onClick={clearAllFilters}
                          className="text-sm text-gray-500 hover:text-gray-700"
                        >
                          Clear all
                        </button>
                      </div>

                      {/* Role filters */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Role
                        </h4>
                        <div className="space-y-2">
                          {allRoles.map((role) => (
                            <label key={role} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={activeFilters.roles.includes(role)}
                                onChange={() => toggleFilter("roles", role)}
                                className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                              />
                              <span className="ml-2 text-sm text-gray-700">
                                {role}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Skills filters */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Skills
                        </h4>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {allSkills.map((skill) => (
                            <label key={skill} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={activeFilters.skills.includes(skill)}
                                onChange={() => toggleFilter("skills", skill)}
                                className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                              />
                              <span className="ml-2 text-sm text-gray-700">
                                {skill}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Location filters */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Location
                        </h4>
                        <div className="space-y-2">
                          {allLocations.map((location) => (
                            <label key={location} className="flex items-center">
                              <input
                                type="checkbox"
                                checked={activeFilters.locations.includes(
                                  location
                                )}
                                onChange={() =>
                                  toggleFilter("locations", location)
                                }
                                className="rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                              />
                              <span className="ml-2 text-sm text-gray-700">
                                {location}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-gray-900 text-white"
                      : "bg-white text-gray-700"
                  }`}
                  aria-label="List view"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Active filters */}
          {(activeFilters.roles.length > 0 ||
            activeFilters.skills.length > 0 ||
            activeFilters.locations.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-4">
              {activeFilters.roles.map((role) => (
                <FilterChip
                  key={`role-${role}`}
                  label={role}
                  category="Role"
                  onRemove={() => removeFilter("roles", role)}
                />
              ))}

              {activeFilters.skills.map((skill) => (
                <FilterChip
                  key={`skill-${skill}`}
                  label={skill}
                  category="Skill"
                  onRemove={() => removeFilter("skills", skill)}
                />
              ))}

              {activeFilters.locations.map((location) => (
                <FilterChip
                  key={`location-${location}`}
                  label={location}
                  category="Location"
                  onRemove={() => removeFilter("locations", location)}
                />
              ))}

              <button
                onClick={clearAllFilters}
                className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results count */}
        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-900">
            {filteredUsers.length}{" "}
            {filteredUsers.length === 1 ? "user" : "users"} found
          </h2>
        </div>

        {/* No results */}
        {filteredUsers.length === 0 && (
          <div className="bg-white rounded-md shadow-sm border border-gray-100 p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm font-medium transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* User grid/list */}
        {filteredUsers.length > 0 && (
          <>
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredUsers.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <UserListItem key={user.id} user={user} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {filteredUsers.length > 0 && (
          <div className="mt-10 flex items-center justify-between">
            <div className="hidden sm:block text-sm text-gray-500">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">{filteredUsers.length}</span> of{" "}
              <span className="font-medium">{filteredUsers.length}</span> users
            </div>
            <div className="flex-1 flex justify-between sm:justify-end space-x-2">
              <button
                className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button
                className="px-4 py-2 border border-gray-200 rounded-md text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
