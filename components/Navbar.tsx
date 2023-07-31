"use client"

import { useEffect, useRef, useState } from "react"
import NextLink from "next/link"
import { usePathname } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Indie_Flower } from "next/font/google"
import { Indicator } from "@radix-ui/react-progress"
import { convertCompilerOptionsFromJson, transform } from "typescript"

export default function Navbar() {
  const tabListRef = useRef<HTMLMenuElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  const moveIndicatorTo = (newTab: HTMLAnchorElement) => {
    const oldTab: HTMLAnchorElement | null = document.querySelector("[aria-selected='true']") as HTMLAnchorElement
    const indicator = indicatorRef.current as HTMLElement;

    const width = newTab?.clientWidth;
    const left = newTab?.offsetLeft;

    /*
     const a= $0;
     const w = (v) => a.style.setProperty("--w",`${v}px`)
     const l = (v) => a.style.setProperty("--l",`${v}px`)
     */

    console.log(newTab.textContent, width, left)

    // indicator.style.setProperty("--s", `${width + left - oldTab?.offsetLeft}px`)
    const newTabPosition = oldTab.compareDocumentPosition(newTab);
    const newTabWidth = newTab.offsetWidth / indicator.offsetWidth;
    let transitionWidth;

    if (newTabPosition === 4) {
      transitionWidth =
        newTab.offsetLeft + newTab.offsetWidth - oldTab.offsetLeft;
    } else {
      transitionWidth =
        oldTab.offsetLeft + oldTab.offsetWidth - newTab.offsetLeft;
      indicator.style.setProperty("--x", `${newTab.offsetLeft}px`);
    }

    indicator.style.setProperty(
      "--s",
      `${transitionWidth / indicator.offsetWidth}`
    );


    setTimeout(() => {
      indicator.style.setProperty("--x", `${left}px`);
      indicator.style.setProperty("--s", `${newTabWidth}`)
    }, 220)
  }

  const clickHandler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const element: HTMLAnchorElement | null = target.closest("a");
    if (element) moveIndicatorTo(element)
  }

  useEffect(() => {
    const element: HTMLAnchorElement | null = document.querySelector("[aria-selected='true']")
    if (element) moveIndicatorTo(element)

    const tabList = tabListRef.current;
    tabList?.addEventListener("click", clickHandler)
    return () => tabList?.removeEventListener("click", clickHandler)
  })

  return (
    <div className="bg-[#111]">
      <nav className="container overflow-auto relative" ref={tabListRef}>
        <menu role="tablist" className={"relative flex w-fit border-b-[1px] border-b-[hsl(0_0%_30%)] py-4 overflow-x-hidden"}>
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
        <div className="bg-white origin-left h-1 mb-2" ref={indicatorRef}
          style={{
            scale: "var(--s) 1",
            translate: "var(--x) 0",
            transition: "scale 200ms,translate 200ms"
          }} />
      </nav>
    </div>
  )
}

const Link = ({ link, name }: { link: string, name: string }) => {
  const pathname = usePathname()
  const isActive = (link === "/" && link === pathname) || (link !== "/" && pathname.startsWith(link))
  return (
    <NextLink role="tab" href={link} className={"uppercase font-[500] cursor-pointer opacity-70 text-white p-[1em_2em] hover:opacity-100 aria-selected:opacity-100"} aria-selected={isActive}>{name}</NextLink>
  )
}

