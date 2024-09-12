'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showResponsiveNav, setShowResponsiveNav] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const toggleResponsiveNav = () => {
    setShowResponsiveNav(!showResponsiveNav)
  }

  return (
    <div className="relative">
      {/* Responsive Nav Button */}
      <div className="flex justify-center lg:hidden">
        <IoIosArrowDown
          className={clsx('text-xl transition-transform', {
            'rotate-180 hover:text-blue-600': showResponsiveNav,
          })}
          onClick={toggleResponsiveNav}
        />
      </div>

      {/* Desktop Nav */}
      <nav
        className={clsx(
          'hidden justify-center space-x-8 font-medium lg:flex',
          {
            flex: !showResponsiveNav,
          },
          {
            hidden: showResponsiveNav,
          },
        )}
      >
        <Link href="#home" className="text-gray-800 hover:text-blue-600">
          Home
        </Link>
        <Link href="#about" className="text-gray-800 hover:text-blue-600">
          About
        </Link>
        <Link href="#features" className="text-gray-800 hover:text-blue-600">
          Features
        </Link>
        <Link href="#pricing" className="text-gray-800 hover:text-blue-600">
          Pricing
        </Link>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-1 text-gray-800 hover:text-blue-600 focus:outline-none"
          >
            <span>Login</span>
            <IoIosArrowDown
              className={clsx('text-lg transition-transform', {
                'rotate-180': dropdownOpen,
              })}
            />
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-48 rounded-lg border bg-white shadow-lg">
              <a
                href="/admin"
                className="block border-b px-4 py-2 text-gray-800 hover:bg-blue-100"
              >
                Admin Panel
              </a>
              <a
                href="/teacher"
                className="block border-b px-4 py-2 text-gray-800 hover:bg-blue-100"
              >
                Teacher Panel
              </a>
              <a
                href="/student"
                className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
              >
                Student Panel
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Nav */}
      <div
        className={clsx(
          'fixed inset-0 left-1/2 top-[60px] -z-50 h-max max-w-[300px] -translate-x-1/2 transform rounded-lg border bg-white transition-transform lg:hidden',
          {
            'translate-y-0 shadow-xl': showResponsiveNav,
            '-translate-y-[calc(100%+57px)]': !showResponsiveNav,
          },
        )}
      >
        <div className="flex flex-col *:border-b *:px-3 *:py-2 *:text-center *:text-sm last:border-b-0">
          <Link
            href="#home"
            className="text-gray-800 hover:text-blue-600"
            onClick={toggleResponsiveNav}
          >
            Home
          </Link>
          <Link
            href="#about"
            className="text-gray-800 hover:text-blue-600"
            onClick={toggleResponsiveNav}
          >
            About
          </Link>
          <Link
            href="#features"
            className="text-gray-800 hover:text-blue-600"
            onClick={toggleResponsiveNav}
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-gray-800 hover:text-blue-600"
            onClick={toggleResponsiveNav}
          >
            Pricing
          </Link>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="flex items-center gap-1 text-gray-800 hover:text-blue-600 focus:outline-none"
            >
              <span>Login</span>
              <IoIosArrowDown
                className={clsx('text-lg transition-transform', {
                  'rotate-180': dropdownOpen,
                })}
              />
            </button>
            {dropdownOpen && (
              <div className="">
                <a
                  href="/admin"
                  className="block border-b px-4 py-2 text-gray-800 hover:bg-blue-100"
                >
                  Admin Panel
                </a>
                <a
                  href="/teacher"
                  className="block border-b px-4 py-2 text-gray-800 hover:bg-blue-100"
                >
                  Teacher Panel
                </a>
                <a
                  href="/student"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
                >
                  Student Panel
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
