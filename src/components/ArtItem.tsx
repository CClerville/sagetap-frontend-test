import { CloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Image,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAppDispatch } from "../hooks/util";
import { GenericObject, removeArtWork } from "../reducers";
import { getImageUrl } from "../utils";
import RatingsForm from "./RatingsForm";

interface ArtItemInterface {
  artwork: GenericObject;
}

const ArtItem = ({ artwork }: ArtItemInterface) => {
  const [showRemoveButton, setShowRemoveButton] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { id, disabled, artist_title, image_id, title, rating } = artwork;

  const handleMouseOEnter = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowRemoveButton(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowRemoveButton(false);
  };

  const handleRemoveArt = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(removeArtWork(id));
  };

  if (disabled) {
    return <></>;
  }

  return (
    <Box
      width={400}
      height={460}
      m={2}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      position={"relative"}
      onMouseEnter={handleMouseOEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        height={300}
        width={400}
        objectFit="fill"
        src={getImageUrl(image_id)}
        alt={title ?? ""}
        fallbackSrc="https://via.placeholder.com/150"
      />
      {showRemoveButton && (
        <Tooltip label="Remove Art" aria-label="Remove Art">
          <IconButton
            colorScheme="red"
            aria-label="Call Segun"
            size="sm"
            position={"absolute"}
            top={2}
            right={2}
            icon={<CloseIcon />}
            onClick={handleRemoveArt}
          />
        </Tooltip>
      )}
      <Box p={2} h={5}>
        {rating && (
          <Flex>
            <Spacer />
            <Badge variant="outline" colorScheme="green">
              Rating: {rating}
            </Badge>
          </Flex>
        )}
      </Box>

      <Box pl={6} pr={6} pb={6} pt={2}>
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {artwork?.title}
        </Box>
        <Box>{artist_title}</Box>
        <RatingsForm artWorkId={id} />
      </Box>
    </Box>
  );
};

export default ArtItem;
