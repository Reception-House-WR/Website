"use client"

import { Toolbar } from "./Toolbar"

// 1. Define your site's navigation links here
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about/our-people", label: "Our People" },
  // { href: "/about", label: "About Us" },
  // { href: "/programs", label: "Programs" },
  // { href: "/contact", label: "Contact" },
]

export default function ClientToolbar() {
  const handleToggle = () => {
    console.log("Language toggled")
  }

  return (
    <Toolbar 
      currentLang="en" 
      onLanguageToggle={handleToggle} 
      
    />
  )
}