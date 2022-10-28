export const getImageUrl = (id: string) =>
  `https://www.artic.edu/iiif/2/${id}/full/843,/0/default.jpg`;

export const DEFAULT_ARTSWORKS = [
  { id: 27992, disabled: false },
  { id: 27998, disabled: false },
  { id: 27999, disabled: false },
  { id: 27997, disabled: true },
  { id: 27993, disabled: false },
];

export const NUMBERS_ONLY_REGEX = /^[0-9]+$/;
