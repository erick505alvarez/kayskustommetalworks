import { useState } from "react";

interface NavigationProps {
  currentPath: string;
}

const project_base_path = import.meta.env.BASE_URL;

export default function Navigation({ currentPath }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="sticky top-0 w-full bg-gray-900 text-white z-50 h-16"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a
              href={`${project_base_path}/`}
              className="text-2xl font-bold"
              aria-label="Kay's Kustom Metal Works - Home"
            >
              Kay's Kustom Metal Works
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div
              className="ml-10 flex items-center space-x-4"
              role="navigation"
              aria-label="Main menu"
            >
              <a
                href={`${project_base_path}/`}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                aria-current={
                  currentPath === project_base_path ? "page" : undefined
                }
              >
                Home
              </a>
              <a
                href={`${project_base_path}/about`}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                aria-current={
                  currentPath === `${project_base_path}/about`
                    ? "page"
                    : undefined
                }
              >
                About
              </a>
              <a
                href={`${project_base_path}/#contact`}
                className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`${isOpen ? "block" : "hidden"} md:hidden`}
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href={`${project_base_path}/`}
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            aria-current={currentPath === "/" ? "page" : undefined}
          >
            Home
          </a>
          <a
            href={`${project_base_path}/about`}
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700"
            aria-current={currentPath === "/about" ? "page" : undefined}
          >
            About
          </a>
          <a
            href={`${project_base_path}/#contact`}
            className="block px-3 py-2 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
}
