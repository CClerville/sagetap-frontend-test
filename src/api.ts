export const getArtwork = async (id: number) =>
  fetch("https://api.artic.edu/api/v1/artworks/" + id);

export const getArtworks = async (ids: number[]) =>
  fetch(`https://api.artic.edu/api/v1/artworks?ids=${ids.join(",")}`);

export const rateArtWork = async (id: number, rating: number) => {
  return fetch("https://v0867.mocklab.io/rating", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, rating }),
  });
};
