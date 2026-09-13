import { useState, type SubmitEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

   const handleSignup = (e: SubmitEvent) => {
   e.preventDefault()
 

  const emailRegex = /\S+@\S+\.\S+/

  if (!name || !email || !password || !confirmPassword) {
    setError('All fields are required')
    return
  }

  if (name.trim().length < 3) {
    setError('Name must be at least 3 characters long')
    return
  }

  if (!emailRegex.test(email)) {
    setError('Please enter a valid email address')
    return
  }

  if (password.length < 6) {
    setError('Password must be at least 6 characters')
    return
  }

  if (password !== confirmPassword) {
    setError('Passwords do not match')
    return
  }

  setError('')
  alert('Account created successfully!')
  navigate('/login')
}
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Create an Account
        </h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-rose-500"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-rose-500"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-rose-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-300 p-2.5 outline-none focus:border-rose-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-rose-500 py-3 font-semibold text-white hover:bg-rose-600"
          >
            Sign up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-rose-500 underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}