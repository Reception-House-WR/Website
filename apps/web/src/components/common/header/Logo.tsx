"use client"

import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">   
    <div>
        <Image
        src="/assets/logo-web.png"
        alt="Reception House logo"
        width={320}
        height={90}
        className="block w-[160px] h-auto object-contain"         
        sizes="(min-width: 640px) 160px"
        priority
        />
    </div>
    </Link>
  )
}
