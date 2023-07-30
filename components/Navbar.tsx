"use client"

import { useEffect, useRef } from "react"
import NextLink from "next/link"
import { usePathname } from 'next/navigation'

export default function Navbar() {
  return (
    <div className="bg-red-500">
      <nav className="container overflow-auto">
        <menu role="tablist" className="">
          <Link link={"/home"} name="home" />
          <Link link={"/tweets"} name="tweets" />
          <Link link={"/images"} name="images" />
          <Link link={"/videos"} name="videos" />
          <Link link={"/shorts"} name="shorts" />
          <Link link={"/channels"} name="channels" />
          <Link link={"/questions"} name="questions" />
          <Link link={"/notes"} name="notes" />
          <Link link={"/websites"} name="websites" />
          <Link link={"/tasks"} name="tasks" />
          <Link link={"/posts"} name="posts" />
          <Link link={"/about"} name="about" />
          <Link link={"/links"} name="links" />
          <Link link={"/community"} name="community" />
        </menu>
      </nav>
    </div>
  )
}

const Link = ({ link, name }: { link: string, name: string }) => {
  const pathname = usePathname()
  const isActive = (link === "/" && link === pathname) || (link !== "/" && pathname.startsWith(link))

  return (
    <li>
      <NextLink role="tab" href={link} className={`capitalize ${"l"}`} aria-selected={isActive} >{name}</NextLink>
    </li>
  )
}
