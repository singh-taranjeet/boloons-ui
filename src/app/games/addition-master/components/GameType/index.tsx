import Link from "next/link";
import { Text } from "../Text";

export function GameType() {
  return (
    <section className="flex flex-col justify-center gap-5 md:row md:justify-between bg-slate-100 rounded p-5">
      <Text className="text-cyan-500 font-semibold">How you want to play?</Text>
      <Link
        href={"/games/addition-master/play/ddgdgd"}
        className="rounded p-5 w-full self-center md:w-56 border-cyan-500 border-2 text-cyan-500 text-center"
      >
        Single player
      </Link>
      <Link
        href={"/games/addition-master/create"}
        className="rounded p-5 w-full self-center md:w-56 border-cyan-500 border-2 text-cyan-500 text-center"
      >
        Multi player
      </Link>
    </section>
  );
}
