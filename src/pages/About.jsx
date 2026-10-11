import React from 'react'
import {
  Zap,
  Package,
  Users,
  Star,
  Truck,
  ShieldCheck,
  Heart,
  ArrowRight,
} from 'lucide-react'
import { useNavigate } from 'react-router'

// Static content for the UI
const stats = [
  { icon: Package, value: '20K+', label: 'Products' },
  { icon: Users, value: '50K+', label: 'Happy Customers' },
  { icon: Star, value: '4.9', label: 'Avg. Rating' },
  { icon: Truck, value: '99%', label: 'On-time Delivery' },
]

const values = [
  {
    icon: ShieldCheck,
    title: 'Trust',
    text: 'Every product is verified for quality and authenticity before listing.',
  },
  {
    icon: Truck,
    title: 'Speed',
    text: 'We obsess over delivery times so your orders arrive when promised.',
  },
  {
    icon: Heart,
    title: 'Community',
    text: 'Built around real customer feedback, not just business metrics.',
  },
  {
    icon: Star,
    title: 'Quality',
    text: 'We curate the best — no filler, no junk, just great products.',
  },
]

const team = [
  { initial: 'A', name: 'Aryan Shah', role: 'Founder & CEO', color: 'bg-[#c8f500] text-[#0d0d0d]' },
  { initial: 'P', name: 'Priya Mehta', role: 'Head of Product', color: 'bg-blue-500 text-white' },
  { initial: 'R', name: 'Rohan Verma', role: 'Lead Engineer', color: 'bg-purple-500 text-white' },
  { initial: 'S', name: 'Sneha Kapoor', role: 'Design Director', color: 'bg-rose-500 text-white' },
]

const About = () => {
 let navigate = useNavigate();
  return (
    <div>
      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 py-8 text-white sm:space-y-12 sm:py-12">
        {/* Header */}
        <section className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c8f500]">
            <Zap className="h-7 w-7 text-[#0d0d0d]" fill="currentColor" />
          </div>
          <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
            About <span className="text-[#c8f500]">SkyMart</span>
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-neutral-500 sm:text-base">
            SkyMart is a next-generation e-commerce platform built to make
            online shopping fast, fair, and enjoyable — for everyone.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-2xl border border-neutral-700 bg-[#121212] px-3 py-5"
            >
              <Icon className="h-4 w-4 text-[#c8f500]" />
              <p className="mt-1 text-xl font-bold">{value}</p>
              <p className="text-xs text-neutral-500">{label}</p>
            </div>
          ))}
        </section>

        {/* Our story */}
        <section className="rounded-3xl border border-neutral-700 bg-[#121212] p-5 sm:p-8">
          <h2 className="text-lg font-bold">Our Story</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-neutral-400 sm:text-base">
            <p>
              SkyMart started in 2022 as a small side project — two engineers
              tired of bloated, slow e-commerce experiences. We asked
              ourselves: what if shopping online was actually{' '}
              <span className="font-semibold text-white">enjoyable</span>?
            </p>
            <p>
              Three years later, SkyMart serves over 50,000 customers across
              the country. We stock electronics, fashion, jewelry, and everyday
              essentials — all at prices that don't require a second mortgage.
            </p>
            <p>
              We're still the same team at heart: obsessed with speed,
              transparency, and making you feel good about every purchase you
              make here.
            </p>
          </div>
        </section>

        {/* What we stand for */}
        <section>
          <h2 className="mb-5 text-center text-lg font-bold">What We Stand For</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {values.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex items-start gap-3 rounded-2xl border border-neutral-700 bg-[#121212] p-4"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#c8f500]/15">
                  <Icon className="h-4 w-4 text-[#c8f500]" />
                </span>
                <div>
                  <h3 className="text-sm font-bold">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Meet the team */}
        <section>
          <h2 className="mb-5 text-center text-lg font-bold">Meet the Team</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {team.map(({ initial, name, role, color }) => (
              <div
                key={name}
                className="flex flex-col items-center rounded-2xl border border-neutral-700 bg-[#121212] px-3 py-5 text-center"
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${color}`}
                >
                  {initial}
                </span>
                <p className="mt-3 text-sm font-semibold">{name}</p>
                <p className="mt-0.5 text-xs text-neutral-500">{role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl border border-[#c8f500]/30 bg-[#c8f500]/5 px-5 py-8 text-center sm:py-10">
          <h2 className="text-xl font-bold">Ready to shop?</h2>
          <p className="mt-2 text-sm text-neutral-500">
            Explore thousands of products at unbeatable prices.
          </p>
          <button
          onClick={()=>{navigate("/main/shop") }}
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#c8f500] px-6 py-2.5 text-sm font-semibold text-[#0d0d0d] transition hover:brightness-110">
            Browse Products <ArrowRight className="h-4 w-4" />
          </button>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-16 border-t border-neutral-700 px-4 py-8 text-center">
        <p className="text-lg font-semibold text-[#c8f500]">SkyMart</p>
        <p className="mt-2 text-xs text-neutral-500 sm:text-sm">
          © 2025 SkyMart • Built with React + Redux + TanStack Query
        </p>
      </footer>
    </div>
  )
}

export default About
