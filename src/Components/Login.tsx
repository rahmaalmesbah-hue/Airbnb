import { useState, type SubmitEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e: SubmitEvent) => {
  e.preventDefault()

    // Regex للتأكد من صيغة الإيميل الصحيحة
    const emailRegex = /\S+@\S+\.\S+/

    if (!email || !password) {
      setErrorMessage('Please fill in all fields')
      return
    }

    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address (e.g. name@domain.com)')
      return
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters')
      return
    }

    setErrorMessage('')
    alert('Logged in successfully!')
    navigate('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Welcome back to Airbnb
        </h2>

        {errorMessage && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-600">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-rose-500 py-3 font-semibold text-white transition hover:bg-rose-600"
          >
            Log in
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-rose-500 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}