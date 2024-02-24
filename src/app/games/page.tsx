import { AppConstants } from "../lib/constants.lib";

export default function Page() {
  return (
    <section>
      <h1>{AppConstants.pages.games.title}</h1>
      <p>{AppConstants.pages.games.description}</p>
    </section>
  );
}
