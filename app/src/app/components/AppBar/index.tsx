"use client";
import { Href } from "../Href";
import Image from "next/image";
import { flexCenter } from "@/app/lib/style.lib";
import { urls } from "@/app/lib/constants.lib";
import { useEffect, useState } from "react";
import { ImageContainer } from "../ImageContainer";

interface NavItemProps {
  href: string;
  image: string;
  title: string;
  theme?: "dark" | "light";
}
const NavItem = (props: NavItemProps) => {
  const { href, image, title, theme = "light" } = props;
  return (
    <li className={`${flexCenter}`}>
      <Href
        prefetch={true}
        href={href}
        color={theme === "light" ? "text-primary" : "text-white"}
        bgColor={theme === "light" ? "bg-white" : "bg-primary"}
        border="border-0"
      >
        <span className="flex">
          <Image
            src={image}
            alt="boloons"
            width={30}
            height={30}
            className="mr-small"
          />
          {title}
        </span>
      </Href>
    </li>
  );
};

const Nav = (props: { children: React.ReactNode; visible: boolean }) => {
  const { children, visible } = props;
  return (
    <nav
      className={`bg-primary bg-opacity-10 z-10 w-full fixed top-0 ${
        visible ? "" : "hidden"
      } sm:block`}
    >
      <ul className="flex gap-normal justify-start p-normal flex-row">
        {props.children}
      </ul>
    </nav>
  );
};

const NavGroup = (props: { onClick(open: boolean): void }) => {
  return (
    <>
      <NavItem
        theme="dark"
        href={"/"}
        image={`${urls.media}boloons-logo-small.webp`}
        title={"Boloons"}
      ></NavItem>

      <NavItem
        href={"/games"}
        image={`${urls.media}games-logo-small.webp`}
        title={"Games"}
      ></NavItem>
    </>
  );
};
export const AppBar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => setOpen(false), 5000);
    }
  }, [open]);

  return (
    <>
      <Nav visible={open}>
        <NavGroup onClick={setOpen} />
      </Nav>
      <nav className={`${!open ? "" : "hidden"} z-10 fixed p-normal sm:hidden`}>
        <ul>
          <li
            aria-label="Menu"
            className={`${flexCenter} cursor-pointer`}
            onClick={() => {
              setOpen(true);
            }}
          >
            <ImageContainer>
              <Image
                className="cursor-pointer"
                src={"/media/icons/ham-icon.webp"}
                width={50}
                height={50}
                alt="menu"
              />
            </ImageContainer>
          </li>
        </ul>
      </nav>
    </>
  );
};
