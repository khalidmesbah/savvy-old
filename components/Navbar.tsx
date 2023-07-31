"use client"

import { useEffect, useRef, useState } from "react"
import NextLink from "next/link"
import { usePathname } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Navbar() {
  const [width, setWidth] = useState<number>(0)
  const [left, setLeft] = useState<number>(0)
  const tabsContainer = useRef<HTMLDivElement>(null)


  const tabsContainerHandler = (e: MouseEvent) => {
    const oldTab = tabsContainer.current?.querySelector("[aria-selected='true']") as unknown as HTMLAnchorElement
    const newTab = e.target as unknown as HTMLAnchorElement;

    if (oldTab === newTab)
      return

    moveIndicator(oldTab, newTab)
  }

  function moveIndicator(oldTab: HTMLAnchorElement, newTab: HTMLAnchorElement) {
    const newTabPosition = oldTab.compareDocumentPosition(newTab);
    const newTabWidth = newTab.offsetWidth / tabsContainer.current?.offsetWidth;
    let transitionWidth;

    // if the new tab is to the right
    if (newTabPosition === 4) {
      transitionWidth =
        newTab.offsetLeft + newTab.offsetWidth - oldTab.offsetLeft;
    } else {
      // if the tab is to the left
      transitionWidth =
        oldTab.offsetLeft + oldTab.offsetWidth - newTab.offsetLeft;
      tabsContainer.current?.style.setProperty("--_left", newTab.offsetLeft + "px");
    }

    tabsContainer.current?.style.setProperty(
      "--_width",
      transitionWidth / tabsContainer.current.offsetWidth
    );

    setTimeout(() => {
      tabsContainer.current?.style.setProperty("--_left", newTab.offsetLeft + "px");
      tabsContainer.current?.style.setProperty("--_width", newTabWidth);
    }, 220);
  }

  useEffect(() => {
    const current = tabsContainer.current;
    current?.addEventListener("click", tabsContainerHandler)
    return () => {
      current?.removeEventListener("click", tabsContainerHandler)
    }
  }, [])

  return (
    <div className="border-2 border-red-400">
      <nav className="container overflow-auto">
        <menu role="tablist" data-width={width} ref={tabsContainer} className={`relative flex w-fit overflow-hidden border-b-[1px] border-b-[hsl(0_0%_30%)] my-12 after:content-['']`}>
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
    <NextLink role="tab" href={link} className={"uppercase font-[500] cursor-pointer opacity-70 text-white p-[1em_2em] hover:opacity-100 aria-selected:opacity-100"} aria-selected={isActive}>{name}</NextLink>
  )
}
