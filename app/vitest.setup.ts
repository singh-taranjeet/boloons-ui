// import { afterAll, afterEach, beforeAll, vi, beforeEach } from "vitest";
// // import "@testing-library/jest-dom";
// import { server } from "./unit-tests/mock-server";

// beforeAll(() => {
//   vi.useFakeTimers({ shouldAdvanceTime: true });
//   console.log("Starting mock server");
//   server.listen();
//   // mock local storage to incule playerName key of value example
//   Object.defineProperty(window, "localStorage", {
//     value: {
//       getItem: (key: string) => {
//         if (key === "boloons-user") {
//           return JSON.stringify({
//             id: "65d44aa0be23fcecf5abf10d",
//             name: "Lorenzo Lynch",
//           });
//         }
//         return null;
//       },
//       setItem: (key: string, value: string) => {
//         return null;
//       },
//     },
//     writable: true,
//   });
// });

// beforeEach(() => {
//   vi.useFakeTimers({ shouldAdvanceTime: true });
// });

// // Reset any request handlers that we may add during the tests,
// // so they don't affect other tests.
// afterEach(() => server.resetHandlers());

// // Clean up after the tests are finished.
// afterAll(() => server.close());

import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./unit-tests/mock-server";
import { fetch } from "cross-fetch";

global.fetch = fetch;

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
