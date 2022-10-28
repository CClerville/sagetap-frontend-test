import { Box, Button, Input, useToast } from "@chakra-ui/react";
import React, { memo, useState } from "react";
import { useSelector } from "react-redux";
import { getArtwork } from "../api";
import { useAppDispatch } from "../hooks/util";
import { addArtwork, updateAddedArtIds } from "../reducers";
import { RootState } from "../store";
import { NUMBERS_ONLY_REGEX } from "../utils";

const AddArtForm = () => {
  const [artIdInput, setArtIdInput] = useState<string>("");
  const addedArtids = useSelector(
    (state: RootState) => state.artworks.addedArtIds
  );
  const dispatch = useAppDispatch();
  const toast = useToast({
    position: "top",
  });

  const handleAddArt = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (addedArtids[artIdInput]) {
      toast({
        description: "Artwork has already been added",
        status: "info",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    if (!NUMBERS_ONLY_REGEX.test(artIdInput)) {
      toast({
        description: "Please enter a valid Artwork id number",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    try {
      const response = await getArtwork(parseInt(artIdInput, 10));
      const result = await response.json();
      if (result?.status === 404) {
        toast({
          description: "This artwork cannot be found. Ensure the id is correct",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (result?.data) {
        dispatch(addArtwork(result.data));
        dispatch(updateAddedArtIds(result.data.id));
        toast({
          description: "Successfully added artwork",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (e) {
      toast({
        description: "Something went wrong!",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (value: string) => {
    setArtIdInput(value);
  };

  return (
    <Box
      borderTop="2px solid lightgray"
      height={100}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Input
        placeholder="Enter Artwork id"
        width={200}
        mr={5}
        onChange={(e) => handleInputChange(e.target.value)}
      />
      <Button colorScheme="blue" onClick={handleAddArt} disabled={!artIdInput}>
        Add Art
      </Button>
    </Box>
  );
};

export default memo(AddArtForm);
