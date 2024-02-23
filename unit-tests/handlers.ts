import { HttpResponse, http, delay } from "msw";

export const handlers = [
  http.get(
    "http://localhost:4000/player",
    async ({ request, params, cookies }) => {
      console.log("mocking respnse for /player");
      await delay(2000);
      console.log("mocking respnse for /player", request, params, cookies);
      return HttpResponse.json({
        success: true,
        data: {
          id: "65d7ef9fe4b571e1b57c8a43",
          name: "Dr. Ronnie Paucek",
        },
      });
    }
  ),

  http.post("http://localhost:4000/game", async () => {
    console.log("mocking respnse for /game");

    delay(5000);

    return HttpResponse.json({
      success: true,
      data: "65d82397dc7f6a40604707da",
    });
  }),
];
