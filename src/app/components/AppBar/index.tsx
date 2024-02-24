import Link from "next/link";
import { Href } from "../Href";

export const AppBar = () => {
  return (
    <nav className="p-normal bg-primary bg-opacity-10 relative z-10">
      <ul className="flex gap-normal justify-around md:justify-center">
        <li>
          <Href
            href={"/"}
            color="text-primary"
            bgColor="bg-white"
            borderRadius="rounded"
            border="border-0"
          >
            Boloons
          </Href>
        </li>
        <li>
          <Href
            href={"/games"}
            color="text-primary"
            bgColor="bg-white"
            borderRadius="rounded"
            border="border-0"
          >
            Games
          </Href>
        </li>
      </ul>
    </nav>
  );
};
