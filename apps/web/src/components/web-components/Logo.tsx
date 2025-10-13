"use client"

import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="block md:hidden">
        <Image
          src="/assets/logo-mobile.png"
          alt="Reception House logo mobile"
          width={120}
          height={40}
          priority
        />
      </div>

      <div className="hidden md:block">
        <Image
          src="/assets/logo-web.png"
          alt="Reception House logo"
          width={160}
          height={45}
          priority
        />
      </div>
    </Link>
  )
}
