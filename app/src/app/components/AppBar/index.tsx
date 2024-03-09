"use client";
import { Href } from "../Href";
import Image from "next/image";
import { flexCenter } from "@/app/lib/style.lib";
import { urls } from "@/app/lib/constants.lib";
import { useEffect, useState } from "react";
import { ImageContainer } from "../ImageContainer";
import { usePathname } from "next/navigation";

const SettingsIcon = (props: { className?: string }) => {
  const { className = "fill-white" } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-[30px] h-[30px] mr-small hidden sm:block"
      version="1.0"
      viewBox="0 0 150 150"
    >
      <defs>
        <clipPath id="a">
          <path d="M0 0h149.895v150H0Zm0 0" />
        </clipPath>
      </defs>
      <g clip-path="url(#a)">
        <path
          className={className}
          d="M74.48 46.477c15.594-.293 28.457 12.117 28.75 27.71v.825c.176 15.593-12.316 28.379-27.91 28.55-15.593.176-28.379-12.316-28.55-27.91v-.64C46.594 59.5 58.965 46.754 74.48 46.477ZM77.504.067A75.438 75.438 0 0 0 64.906.69a3.803 3.803 0 0 0-3.129 2.653L57.621 16.87a3.83 3.83 0 0 1-2.371 2.465 64.28 64.28 0 0 0-5.75 2.383 3.759 3.759 0 0 1-3.438-.067L33.57 15.02a3.795 3.795 0 0 0-4.086.347A74.53 74.53 0 0 0 15.29 29.551a3.797 3.797 0 0 0-.348 4.086l6.645 12.504a3.872 3.872 0 0 1 .133 3.425 56.302 56.302 0 0 0-2.395 5.75 3.758 3.758 0 0 1-2.48 2.371L3.328 61.855A3.76 3.76 0 0 0 .68 64.973a74.508 74.508 0 0 0 0 20.082 3.764 3.764 0 0 0 2.648 3.117l13.516 4.168a3.761 3.761 0 0 1 2.48 2.367 56.366 56.366 0 0 0 2.395 5.754 3.863 3.863 0 0 1-.133 3.422l-6.645 12.504a3.805 3.805 0 0 0 .348 4.09 74.87 74.87 0 0 0 14.195 14.183c1.172.906 2.77 1.024 4.086.344l12.492-6.629a3.807 3.807 0 0 1 3.438-.082 58.992 58.992 0 0 0 5.75 2.383 3.839 3.839 0 0 1 2.371 2.465l4.156 13.53a3.77 3.77 0 0 0 3.13 2.65c6.656.906 13.41.906 20.066 0a3.8 3.8 0 0 0 3.132-2.65l4.153-13.53a3.839 3.839 0 0 1 2.37-2.465 58.266 58.266 0 0 0 5.755-2.383 3.775 3.775 0 0 1 3.422.082l12.504 6.629c1.316.68 2.918.562 4.09-.344a75.099 75.099 0 0 0 14.195-14.183 3.804 3.804 0 0 0 .344-4.09l-6.63-12.504a3.825 3.825 0 0 1-.136-3.422 60.077 60.077 0 0 0 2.387-5.754 3.747 3.747 0 0 1 2.476-2.367l13.528-4.168a3.813 3.813 0 0 0 2.652-3.117c.89-6.672.89-13.41 0-20.082a3.793 3.793 0 0 0-2.653-3.118l-13.527-4.167a3.744 3.744 0 0 1-2.476-2.372 60.008 60.008 0 0 0-2.387-5.75 3.834 3.834 0 0 1 .137-3.425l6.629-12.504a3.796 3.796 0 0 0-.344-4.086 74.757 74.757 0 0 0-14.196-14.184 3.802 3.802 0 0 0-4.09-.347l-12.503 6.632a3.775 3.775 0 0 1-3.422.082 59.255 59.255 0 0 0-5.754-2.386 3.814 3.814 0 0 1-2.371-2.477L88.105 3.355A3.829 3.829 0 0 0 84.973.691a74.525 74.525 0 0 0-7.47-.625"
        />
      </g>
    </svg>
  );
};

interface NavItemProps {
  href: string;
  image?: string;
  title: string;
  theme?: "dark" | "light";
  children?: React.ReactNode;
}
const NavItem = (props: NavItemProps) => {
  const { href, image, title, theme = "light", children } = props;
  const pathname = usePathname();
  return (
    <li className={`${flexCenter}`}>
      <Href
        active={pathname === href}
        prefetch={true}
        href={href}
        color={theme === "light" ? "text-primary" : "text-white"}
        bgColor={theme === "light" ? "bg-white" : "bg-primary"}
        border="border-0"
      >
        <span className="flex">
          {image ? (
            <Image
              src={image}
              alt="boloons"
              width={30}
              priority={true}
              height={30}
              className="mr-small hidden sm:block"
            />
          ) : null}
          {children ?? children}
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
      } md:block`}
    >
      <ul className="flex gap-normal justify-start p-normal flex-row">
        {children}
      </ul>
    </nav>
  );
};

const NavGroup = () => {
  const pathname = usePathname();
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
      <NavItem href={"/settings"} title={"Settings"}>
        <SettingsIcon
          className={
            pathname === urls.pages.settings.url ? "fill-white" : "fill-primary"
          }
        />
      </NavItem>
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
        <NavGroup />
      </Nav>
      <nav className={`${!open ? "" : "hidden"} z-10 fixed p-normal md:hidden`}>
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
                priority={true}
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
