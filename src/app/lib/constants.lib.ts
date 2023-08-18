export const urls = {
  images: "/images",
  icons: "/images/icons",
  pages: {
    games: {
      sumAddict: {
        gameUrl: "/games/sum-addict",
        joinUrl: "/games/sum-addict/join",
        createUrl: "/games/sum-addict/create",
        playUrl: "/games/sum-addict/play",
      },
    },
  },
  api: {
    getGame: "/game",
    player: "/player",
  },
} as const;

export const AppConstants = {
  metaData: {
    description: `On Boloons you can play free online games to sharpen your brain. Boloons has the best online game selection and offers the most fun experience to play alone or with friends. We support mobile and desktop games.`,
    title: `Online Brain games on Boloons - Lets play`,
  },
} as const;
