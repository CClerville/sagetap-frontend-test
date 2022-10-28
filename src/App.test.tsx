import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "./App";
import { renderWithProviders } from "./test-utils";

const requestHandlers = [
  rest.get("https://api.artic.edu/api/v1/artworks/:id", (req, res, ctx) => {
    const artworkId = req.url.searchParams.get("id");
    return res(
      ctx.json({
        id: 7,
        artist_title: "Chris",
        title: "Chris' work of art",
        image_id: "image-id-1234",
      })
    );
  }),
  rest.get("https://api.artic.edu/api/v1/artworks/:ids", (req, res, ctx) => {
    const artworkIds = req.url.searchParams.getAll("ids");
    return res(
      ctx.json([
        {
          id: 7,
          artist_title: "Chris ArtWork version 2",
          title: "A work of art",
          image_id: "image-id-1234",
        },
        {
          id: 8,
          artist_title: "Chris ArtWork version 2",
          title: "Just amazing art",
          image_id: "image-id-4321",
        },
      ])
    );
  }),
];

const server = setupServer(...requestHandlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

test("has title", async () => {
  renderWithProviders(<App />);
  const title = screen.getByText("Art Rater");
  expect(title).toBeInTheDocument();
});

test("for an art item, submit button is disabled until a rating is selected", () => {});

test("for an art item, clicking numbered button updates rating display below image to be that number", () => {});

test("for an art item, clicking numbered button updates rating display below image to be that number, clicking two different numbers one after the other", () => {});

test("for an art item, clicking submit POSTs update, displays a toast success message, hides buttons", () => {
  // The endpoint and payload for the submit button can be found in the submit method in `App.tsx`.
  // For the purpose of this test, please use a mock function instead.
});
