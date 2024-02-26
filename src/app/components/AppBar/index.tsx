import { Href } from "../Href";
import Image from "next/image";
import { flexCenter } from "@/app/lib/style.lib";

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

export const AppBar = () => {
  return (
    <nav className="bg-primary bg-opacity-10 z-10 w-full fixed top-0">
      <ul className="flex gap-normal justify-start p-normal flex-row">
        <NavItem
          theme="dark"
          href={"/"}
          image={"/media/boloons-logo-small.png"}
          title={"Boloons"}
        ></NavItem>

        <NavItem
          href={"/games"}
          image={"/media/games-logo-small.png"}
          title={"Games"}
        ></NavItem>
      </ul>
    </nav>
  );
};
