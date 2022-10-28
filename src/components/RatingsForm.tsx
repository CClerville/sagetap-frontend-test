import { StarIcon } from "@chakra-ui/icons";
import { Box, Button, IconButton, Stack } from "@chakra-ui/react";
import { memo, useState } from "react";
import { rateArtWork } from "../api";
import { useAppDispatch } from "../hooks/util";
import { setRating } from "../reducers";

interface RatingsFormInterface {
  artWorkId: number;
}

const RatingsForm = ({ artWorkId }: RatingsFormInterface) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmitVote = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!artWorkId || !selectedRating) return;

    try {
      const response = await rateArtWork(artWorkId, selectedRating);
      const data = await response.json();
      if (data.message === "Success") {
        setSelectedRating(null);
        dispatch(setRating({ id: artWorkId, rating: selectedRating }));
      }
    } catch (e) {
      console.log("got error");
    }
  };

  const handleRatingSelect = (ratingNum: number) => {
    setSelectedRating(selectedRating === ratingNum ? null : ratingNum);
  };

  return (
    <Box display="flex" mt="2" alignItems="center">
      <Stack spacing={1} direction="row">
        {Array(5)
          .fill("")
          .map((_, i) => (
            <IconButton
              key={i + 1}
              variant={
                !!selectedRating && selectedRating >= i + 1
                  ? "solid"
                  : "outline"
              }
              colorScheme="blue"
              aria-label={`Rating ${i + 1}`}
              onClick={() => handleRatingSelect(i + 1)}
              icon={<StarIcon />}
            />
          ))}
      </Stack>

      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        <Button
          colorScheme="blue"
          onClick={handleSubmitVote}
          disabled={!selectedRating}
        >
          Vote
        </Button>
      </Box>
    </Box>
  );
};

export default memo(RatingsForm);
