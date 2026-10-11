import React, { useContext, useState } from 'react'
import { Zap, User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Auth } from '../Context/AuthContext'

const patterns = {
  medium: /^(?=.*[a-zA-Z])(?=.*\d).+$/,
  strong: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).+$/,
}

const getStrength = (password) => {
  if (!password) return null
  if (patterns.strong.test(password)) return 'strong'
  if (patterns.medium.test(password)) return 'medium'
  return 'weak'
}

const strengthStyles = {
  weak:   { label: 'Weak',   text: 'text-red-400',    bar: 'bg-red-500',    level: 1 },
  medium: { label: 'Medium', text: 'text-yellow-400', bar: 'bg-yellow-400', level: 2 },
  strong: { label: 'Strong', text: 'text-[#c8f500]',  bar: 'bg-[#c8f500]',  level: 3 },
}

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const { setRegisteredUser, registeredUser } = useContext(Auth)
  const {loggedInUser, setLoggedInUser} = useContext(Auth)
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch('password')
  const strength = getStrength(password)

  
  const formSubmit = ({ confirmPassword, ...userData }) => {
    const exists = registeredUser.some((u) => u.email === userData.email.trim())
    if (exists) {
      toast.error('Email already registered')
      return
    }

    const newUser = {
      ...userData,
      fullName: userData.fullName.trim(),
      email: userData.email.trim(),
    }

    const arr = [...registeredUser, newUser]
    setRegisteredUser(arr)
    localStorage.setItem('registerUser', JSON.stringify(arr))
    toast.success('Account created')
    reset()
    navigate("/main")
  
  }


  const onError = (errs) => {
    const first = Object.values(errs)[0]
    toast.error(first.type === 'required' ? 'Fill all fields' : first.message)
  }

  const inputClass =
    'w-full rounded-2xl border border-neutral-800 bg-[#1a1a1a] py-4 pl-11 pr-4 text-sm text-white placeholder-neutral-500 outline-none focus:border-[#c8f500]'
  const iconClass =
    'pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500'
  const errorClass = 'mt-1 text-xs text-red-400'

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0d0d0d] px-4 py-10 text-white">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c8f500]">
          <Zap className="h-5 w-5 text-[#0d0d0d]" fill="currentColor" />
        </div>
        <span className="text-2xl font-bold">
          Sky<span className="text-[#c8f500]">Mart</span>
        </span>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg rounded-3xl border border-neutral-800 bg-[#121212] p-6 shadow-2xl sm:p-10">
        <h1 className="text-2xl font-bold sm:text-3xl">Create account</h1>
        <p className="mt-2 text-neutral-400">Join SkyMart and start shopping</p>

        <form
          onSubmit={handleSubmit(formSubmit, onError)}
          noValidate
          className="mt-8 space-y-4"
        >
          {/* Full name */}
          <div>
            <div className="relative">
              <User className={iconClass} />
              <input
                {...register('fullName', {
                  required: 'Full name is required',
                  validate: (value) =>
                    value.trim() !== '' || 'Full name cannot be blank spaces',
                })}
                type="text"
                placeholder="Full name"
                className={inputClass}
              />
            </div>
            {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
          </div>

          {/* Email */}
          <div>
            <div className="relative">
              <Mail className={iconClass} />
              <input
                {...register('email', {
                  required: 'Email is required',
                  validate: (value) =>
                    value.trim() !== '' || 'Email cannot be blank spaces',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Enter a valid email',
                  },
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
                  minLength: { value: 6, message: 'Minimum 6 characters are required' },
                  validate: {
                    noSpaces: (value) =>
                      !/\s/.test(value) || 'Password cannot contain spaces',
                    notWeak: (value) =>
                      patterns.medium.test(value) ||
                      'Password must contain letters and digits',
                  },
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Password (min 6 chars)"
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

            {/* Strength bar */}
            {strength && (
              <div className="mt-2 flex items-center gap-2">
                <div className="flex flex-1 gap-2">
                  {[1, 2, 3].map((segment) => (
                    <div
                      key={segment}
                      className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                        segment <= strengthStyles[strength].level
                          ? strengthStyles[strength].bar
                          : 'bg-neutral-800'
                      }`}
                    />
                  ))}
                </div>
                <span className={`text-xs font-medium ${strengthStyles[strength].text}`}>
                  {strengthStyles[strength].label}
                </span>
              </div>
            )}
            {errors.password && <p className={errorClass}>{errors.password.message}</p>}
          </div>

          {/* Confirm password */}
          <div>
            <div className="relative">
              <Lock className={iconClass} />
              <input
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) => value === password || 'Passwords do not match',
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="Confirm password"
                className={inputClass}
              />
            </div>
            {errors.confirmPassword && (
              <p className={errorClass}>{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#c8f500] py-4 font-semibold text-[#0d0d0d] transition hover:brightness-110"
          >
            Create Account <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="font-semibold text-[#c8f500] hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  )
}

export default Register