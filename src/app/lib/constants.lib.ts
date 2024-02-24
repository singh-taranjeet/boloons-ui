export const urls = {
  media: "/media/",
  audio: "/media/audio/",
  icons: "/images/icons/",
  pages: {
    games: {
      sumAddict: {
        gameUrl: "/games/sum-addict",
        joinUrl: "/games/sum-addict/join",
        createUrl: "/games/sum-addict/create",
        playUrl: "/games/sum-addict/play",
      },
      url: "/games",
    },
  },
  api: {
    getGame: "game",
    player: "player",
    joinGame: "player/join-game",
  },
} as const;

export const AppConstants = {
  metaData: {
    description: `On Boloons you can play free online games to sharpen your brain. Boloons has the best online game selection and offers the most fun experience to play alone or with friends. We support mobile and desktop games.`,
    title: `Online Brain games on Boloons - Lets play`,
  },
  pages: {
    home: {
      title: "Boloons",
      description: `Boloons trains your brain while keeping you entertained. Play today and enjoy some quality time with your
      friends!`,
    },
    games: {
      title: "Games",
      description: "Play games to sharpen your brain",
    },
    sumAddict: {
      title: "Sum Addict",
      description:
        "Select upto 3 number which sum up equal to the indicated number",
    },
  },
} as const;

export const CookieConstants = {
  player: "player",
};

export const TestConstants = {
  player: {
    id: "test-id",
    name: "test-name",
  },
} as const;
