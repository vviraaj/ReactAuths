"use client";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Switch } from "@headlessui/react";
import { useDarkMode } from "@/app/Component/Context/darkmode";
import logo from "@/Svgs/logo.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import user from "@/Svgs/user.png";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode(); // Using context for dark mode
  const [userdatas, setUserdatas] = useState(null);
  const [nothomepage, setNotHomepage] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // to get the data of the user from sessionstorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserData = sessionStorage.getItem("userdata");
      if (storedUserData) {
        setUserdatas(JSON.parse(storedUserData));
      }
    }
  }, []);

  // Check if the current pathname
  useLayoutEffect(() => {
    let url = window.location.href.split("/")[3];
    if (url) {
      setNotHomepage(true);
    }
  }, [pathname]);

  // Determine whether user is logged in
  const isLoggedIn = !!userdatas;

  // Handles the sign-out functionality when the user logs out.
  const handlesignout = () => {
    // Clear user data from session storage.
    sessionStorage.clear("userdata");

    // Show a success toast message for logging out.
    toast.success("Logging out");

    // Redirect to the home page after a timeout of 2000 milliseconds (2 seconds).
    setTimeout(() => {
      router.replace("/login");
    }, 2000);
  };

  return (
    <div className={`${!darkMode ? "login_Background" : "darkmode"} `}>
      <header
        className={`z-50 ${!nothomepage ? "absolute inset-x-0 top-0" : ""}`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image className="h-10 w-auto  " src={logo} alt="Company Logo" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Switch.Group
              as="div"
              className="flex items-center justify-between"
            >
              <span className="flex flex-grow flex-col "></span>
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                className={classNames(
                  darkMode ? "bg-indigo-600" : "bg-gray-200",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                )}
              >
                <span
                  aria-hidden="true"
                  className={classNames(
                    darkMode ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
              <span className="ml-2">Dark Mode</span>
            </Switch.Group>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {/* Display "Log in" or "Log out" based on user data */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <Link href="/user">
                  <Image
                    height={30}
                    width={30}
                    src={user}
                    className="rounded-full cursor-pointer userlogo"
                    alt="userImage"
                  />
                </Link>

                <button
                  onClick={handlesignout}
                  className="text-sm font-semibold leading-6"
                >
                  Log out <span aria-hidden="true">&rarr;</span>
                </button>
              </div>
            ) : (
              <a href="/login" className="text-sm font-semibold leading-6">
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            )}
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel
            className="fixed inset-y-0 right-0 z-50 w-full 
          overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
          >
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <Image
                  className="h-10 w-auto  "
                  src={logo}
                  alt="Company Logo"
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-red-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6  flex flex-col justify-start items-start ">
              <div className=" divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Switch.Group
                    as="div"
                    className="flex items-center justify-between"
                  >
                    <span className="flex flex-grow flex-col"></span>
                    <Switch
                      checked={darkMode}
                      onChange={toggleDarkMode}
                      className={classNames(
                        darkMode ? "bg-indigo-600" : "bg-gray-200",
                        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={classNames(
                          darkMode ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                        )}
                      />
                    </Switch>
                    <span className="ml-2">Dark Mode</span>
                  </Switch.Group>
                </div>
                <div className="py-6">
                  {/* Display "Log in" or "Log out" based on user data */}
                  {isLoggedIn ? (
                    <div className="">
                      <Link href="/user">
                        <Image
                          height={30}
                          width={30}
                          src={user}
                          className="rounded-full cursor-pointer userlogo"
                          alt="userImage"
                        />
                      </Link>

                      <button
                        onClick={handlesignout}
                        className="text-sm font-semibold leading-6 mt-2"
                      >
                        Log out <span aria-hidden="true">&rarr;</span>
                      </button>
                    </div>
                  ) : (
                    <a
                      href="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7  hover:bg-gray-50"
                    >
                      Log in
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
