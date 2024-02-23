import { HttpResponse, http, delay } from "msw";

console.log("FIRST mocking respnse for /player");
export const handlers = [
  // http.get(
  //   "http://localhost:4000/player",
  //   async ({ request, params, cookies }) => {
  //     console.log("mocking respnse for /player");
  //     await delay(2000);
  //     console.log("mocking respnse for /player", request, params, cookies);
  //     return HttpResponse.json({
  //       success: true,
  //       data: {
  //         id: "65d7ef9fe4b571e1b57c8a43",
  //         name: "Dr. Ronnie Paucek",
  //       },
  //     });
  //   }
  // ),
  // // rest.get("/greeting", (req, res, ctx) => {
  // //   return res(ctx.json({ greeting: "hello there" }));
  // // }),
];
