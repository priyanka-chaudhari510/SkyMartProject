import React, { useContext, useState } from 'react'
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Auth } from '../Context/AuthContext'

const stats = [
  { value: '20K+', label: 'Products' },
  { value: '50K+', label: 'Users' },
  { value: '4.9★', label: 'Rating' },
]

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState('')
  const navigate = useNavigate()

  const { setLoggedInUser, registeredUser } = useContext(Auth)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm()

  
  const formSubmit = (data) => {
    const user = registeredUser.find(
      (val) =>
        val.email === data.email.trim() && val.password === data.password
    )

    if (!user) {
      setLoginError('Invalid email or password');
      reset();
      return
    }

    setLoginError('')
    setLoggedInUser(user)
    localStorage.setItem('loginUser', JSON.stringify(user))
    toast.success('Logged in successfully')
    reset()
  navigate("/main")
  }

  
  const onError = () => {
    toast.error('Fill all fields')
  }

  const inputClass =
    'w-full rounded-2xl border border-neutral-800 bg-[#1a1a1a] py-4 pl-11 pr-4 text-sm text-white placeholder-neutral-500 outline-none focus:border-[#c8f500]'
  const iconClass =
    'pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500'
  const errorClass = 'mt-1 text-xs text-red-400'

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#0d0d0d] text-white">
      {/* Left: branding */}
      <section className="relative flex flex-col px-6 py-8 sm:px-12 lg:px-15 lg:py-13.5 bg-[radial-gradient(ellipse_at_0%_50%,rgba(200,245,0,0.12),transparent_55%)]">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c8f500]">
            <Zap className="h-6 w-6 text-[#0d0d0d]" fill="currentColor" />
          </div>
          <span className="text-2xl font-bold">
            Sky<span className="text-[#c8f500]">Mart</span>
          </span>
        </div>

        {/* Hero */}
        <div className="my-12 lg:my-auto">
          <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-[#c8f500]">
            Welcome back
          </p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Shop the future.
            <br />
            <span className="text-[#c8f500]">Today.</span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-neutral-500 sm:text-lg">
            Thousands of products, lightning-fast delivery, and prices that
            make your wallet happy.
          </p>

          {/* Stats */}
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3 sm:gap-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-neutral-600 px-2 py-5 text-center sm:py-7"
              >
                <p className="text-lg font-bold text-[#c8f500] sm:text-2xl">
                  {s.value}
                </p>
                <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Right: form */}
      <section className="flex items-center justify-center px-4 py-10 sm:px-8 lg:border-l lg:border-neutral-700">
        <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-[#121212] p-6 shadow-2xl sm:p-10">
          <h2 className="text-3xl font-bold">Sign in</h2>
          <p className="mt-2 text-neutral-400">Enter your credentials to continue</p>

          {/* Invalid credentials box */}
          {loginError && (
            <div className="mt-6 rounded-2xl border border-red-900/60 bg-red-950/40 px-5 py-4 text-sm text-red-400">
              {loginError}
            </div>
          )}

          <form
            onSubmit={handleSubmit(formSubmit, onError)}
            onChange={() => loginError && setLoginError('')}
            noValidate
            className="mt-8 space-y-4"
          >
            {/* Email */}
            <div>
              <div className="relative">
                <Mail className={iconClass} />
                <input
                  {...register('email', {
                    required: 'Email is required',
                    validate: (v) => v.trim() !== '' || 'Email is required',
                  })}
                  type="email"
                  placeholder="Email address"
                  className={inputClass}
                />
              </div>
              {errors.email && <p className={errorClass}>{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <Lock className={iconClass} />
                <input
                  {...register('password', {
                    required: 'Password is required',
                    validate: (v) => v.trim() !== '' || 'Password is required',
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className={errorClass}>{errors.password.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c8f500] py-4 font-semibold text-[#0d0d0d] transition hover:brightness-110"
            >
              Sign in <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-500">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="font-semibold text-[#c8f500] hover:underline"
            >
              Create one
            </button>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Login