import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userName: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      const displayName = isSignUp ? name || 'User' : email.split('@')[0];
      onLoginSuccess(displayName);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition text-gray-600 font-bold"
          >
            ✕
          </button>
          <h2 className="font-bold text-base text-gray-900">
            {isSignUp ? 'Sign up for Airbnb' : 'Log in to Airbnb'}
          </h2>
          <div className="w-6"></div>
        </div>

        {/* Body */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Welcome to Airbnb
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            {isSignUp ? 'Create a new account to book homes and villas' : 'Log in to access your saved places and bookings'}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-black outline-none"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-black outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-black outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF385C] hover:bg-[#e00b41] text-white font-bold py-3.5 rounded-lg transition shadow-md mt-2"
            >
              {isSignUp ? 'Continue / Sign Up' : 'Continue / Log In'}
            </button>
          </form>

          {/* Toggle between Sign up & Sign in */}
          <div className="mt-6 text-center text-sm text-gray-600">
            {isSignUp ? (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => setIsSignUp(false)}
                  className="font-bold text-black underline hover:text-[#FF385C]"
                >
                  Log in
                </button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <button
                  onClick={() => setIsSignUp(true)}
                  className="font-bold text-black underline hover:text-[#FF385C]"
                >
                  Sign up
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};