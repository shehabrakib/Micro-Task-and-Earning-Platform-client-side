import type { ReactNode } from 'react'
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { Link } from 'react-router-dom'

type SocialLink = {
  label: string
  href: string
  icon: ReactNode
}

const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: <FaGithub size={18} />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com',
    icon: <FaLinkedinIn size={18} />,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com',
    icon: <FaFacebookF size={18} />,
  },
]

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Register', path: '/register' },
  { label: 'Login', path: '/login' },
]

function Footer() {
  return (
    <footer className="bg-indigo-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-lg font-semibold"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600">
              T
            </span>
            <span>TaskEarn</span>
          </Link>
          <p className="max-w-sm text-sm leading-6 text-white/60">
            A micro-task marketplace where buyers create work and workers earn
            coins by completing clear, simple jobs.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">
            Quick Links
          </h2>
          <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
            {quickLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold tracking-wide text-white">
            Follow Us
          </h2>
          <div className="mt-4 flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-white/40 hover:text-white"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-white/40 sm:px-6 lg:px-8">
          Copyright {new Date().getFullYear()} TaskEarn. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
