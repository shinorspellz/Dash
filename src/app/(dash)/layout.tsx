"use client";

import LAside from "@/components/LAside";
import RAside from "@/components/RAside";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTheme } from "@/ThemeContext";

type DashLayoutProp = {
  children: React.ReactNode;
};

function Dashboard({ children }: DashLayoutProp) {
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleRight, setToggleRight] = useState<boolean>(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div
        className={`dash-container min-h-screen flex items-start justify-center relative`}
      >
        {/* Sidebar for larger screens */}
        <div className="aside-container w-[16rem] h-screen overflow-y-scroll no-scrollbar fixed z-50 top-0 left-0 lg:block hidden">
          <RAside />
        </div>

        {/* Overlay and Animated Sidebar for mobile */}
        {toggle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-black xl:hidden"
            onClick={() => setToggle(false)}
          />
        )}
        <motion.div
          initial={{ x: "-100%" }} // Start off-screen to the left
          animate={{ x: toggle ? 0 : "-100%" }} // Animate to visible or hidden
          exit={{ x: "-100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }} // Set the duration and easing of the animation
          className="aside-container overflow-y-scroll w-[16rem] h-screen no-scrollbar fixed top-0 left-0 block xl:hidden"
        >
          <RAside />
        </motion.div>

        <div className="flex-container ml-0 lg:ml-[16rem] min-h-screen w-full flex items-start justify-start md:flex-row flex-col">
          <div className="w-full lg:w-[calc(100%-16rem)] xl:w-[calc(100%-16rem)] min-h-[100vh]">
            <nav
              className={`nav-container
                ${
                  theme === "dark" ? "bg-black/80" : "bg-white"
                } md:px-[2rem] px-[1rem] py-[1.4rem] border-b-[1px] flex items-center justify-between ${
                theme === "dark" ? "border-gray-600" : "border-gray-200"
              }`}
            >
              <div className="first-item-container flex items-center gap-3  h-full">
                <button
                  onClick={() => setToggle(!toggle)}
                  className="outline-none"
                >
                  <Image
                    src={theme === "dark" ? "/booklight.svg" : "/book.svg"}
                    alt="svg-component"
                    width={30}
                    height={30}
                  />
                </button>
                <Image
                  src={theme === "dark" ? "/starlight.svg" : "star.svg"}
                  alt="svg-component"
                  width={30}
                  height={30}
                />

                <small
                  className={`md:block hidden ${
                    theme === "dark" ? "text-white/40" : "text-black/40"
                  }`}
                >
                  Dashboard /
                  <span
                    className={`text-black ${
                      theme === "dark" ? "text-gray-100" : "text-black/40"
                    }`}
                  >
                    Default
                  </span>
                </small>
              </div>
              <div className="second-item-container flex items-center justify-center gap-3">
                <div
                  className={`search-input mr-[1rem] px-[.8rem]  ${
                    theme === "light" ? "bg-gray-100" : "bg-white/10"
                  } h-[2.5rem] rounded-[9px] md:flex hidden items-center w-[70%]`}
                >
                  <div className="image-container">
                    <Image
                      src={
                        theme === "light" ? "/search.svg" : "/darksearch.svg"
                      }
                      alt="search-icon"
                      width={16}
                      height={16}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Search"
                    className={`px-2 ${
                      theme === "dark"
                        ? " placeholder:text-white/40"
                        : "placeholder:text-gray-300"
                    } bg-transparent border-none outline-none text-[16px]`}
                  />
                  {/* <div className="image-cont">
                          <Image
                            src={theme === "light" ? "/search2.svg" : "/search2dark.svg"}
                            alt="search-2-icon"
                            width={20}
                            height={20}
                          />
                        </div> */}
                </div>

                <div className="toggle-section flex items-center justify-center gap-4">
                  <div onClick={toggleTheme}>
                    {theme === "dark" ? (
                      <Image
                        src={"/darkbutton.svg"}
                        alt="toggle-button-icon"
                        width={35}
                        height={35}
                      />
                    ) : (
                      <Image
                        src={"/lightbutton.svg"}
                        alt="toggle-button-icon"
                        width={35}
                        height={35}
                      />
                    )}
                  </div>

                  <div className="timer-container md:block hidden">
                    {theme === "dark" ? (
                      <Image
                        src={"/timerlight.svg"}
                        alt="timer-icon"
                        width={35}
                        height={35}
                      />
                    ) : (
                      <Image
                        src={"/timer.svg"}
                        alt="timer-icon"
                        width={35}
                        height={35}
                      />
                    )}
                  </div>

                  <div
                    onClick={() => setToggleRight(true)}
                    className="notifications-container cursor-pointer"
                  >
                    <Image
                      src={
                        theme === "dark"
                          ? "/notificationslight.svg"
                          : "/notifications.svg"
                      }
                      alt="notification toggle-icon"
                      width={30}
                      height={30}
                    />
                  </div>
                </div>
              </div>
            </nav>
            {children}
          </div>
          <div className="fixed overflow-y-scroll top-0 right-0 custom:block hidden w-[16rem] h-screen no-scrollbar">
            <LAside />
          </div>
        </div>

        {/* Overlay and Animated Sidebar for mobile (LAside) */}
        {toggleRight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-black xl:hidden"
            onClick={() => setToggleRight(false)}
          />
        )}
        <motion.div
          initial={{ x: "100%" }} // Start off-screen to the right
          animate={{ x: toggleRight ? 0 : "100%" }} // Animate to visible or hidden
          exit={{ x: "100%" }}
          transition={{ duration: 0.4, ease: "easeInOut" }} // Set the duration and easing of the animation
          className="aside-container overflow-y-scroll w-[16rem] h-screen no-scrollbar fixed top-0 right-0 block xl:hidden"
        >
          <LAside />
        </motion.div>
      </div>
    </>
  );
}

export default Dashboard;
