'use client';

import { useState } from 'react';
import { EyeIcon, EyeSlashIcon, UserCircleIcon } from '@heroicons/react/24/outline';

interface SignUpProps {
  onNavigate?: (page: string) => void;
}

export default function SignUp({ onNavigate }: SignUpProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    relationshipStatus: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (step === 1 && formData.firstName && formData.lastName && formData.email && formData.password && formData.confirmPassword) {
      setStep(2);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleCreateAccount = () => {
    if (step === 2 && formData.age && formData.relationshipStatus) {
      // Handle account creation logic here
      console.log('Creating account:', formData);
      if (onNavigate) {
        onNavigate('onboarding');
      }
    }
  };

  const isStep1Valid = formData.firstName && formData.lastName && formData.email && 
                      formData.password && formData.confirmPassword && 
                      formData.password === formData.confirmPassword;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">BROCONNECT</h1>
          <p className="text-gray-600">Join the community of men building genuine friendships</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Step {step} of 2</span>
            <span className="text-sm text-gray-600">{step === 1 ? 'Account' : 'Profile'}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 2) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step 1: Account Details */}
        {step === 1 && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Create Your Account</h2>
            
            <div className="space-y-4">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formData.confirmPassword && formData.password !== formData.confirmPassword
                        ? 'border-red-300 focus:ring-red-500'
                        : 'border-gray-300'
                    }`}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">Passwords don't match</p>
                )}
              </div>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!isStep1Valid}
              className="w-full mt-6 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Profile Details */}
        {step === 2 && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Complete Your Profile</h2>
            
            <div className="space-y-4">
              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age Range
                </label>
                <select
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select age range</option>
                  <option value="18-24">18-24</option>
                  <option value="25-30">25-30</option>
                  <option value="31-35">31-35</option>
                  <option value="36-40">36-40</option>
                  <option value="41-45">41-45</option>
                  <option value="46+">46+</option>
                </select>
              </div>

              {/* Relationship Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relationship Status
                </label>
                <select
                  name="relationshipStatus"
                  value={formData.relationshipStatus}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select status</option>
                  <option value="partnered">Partnered</option>
                  <option value="married">Married</option>
                  <option value="in-relationship">In a Relationship</option>
                </select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleBack}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleCreateAccount}
                disabled={!formData.age || !formData.relationshipStatus}
                className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <button 
              onClick={() => onNavigate?.('signin')}
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
