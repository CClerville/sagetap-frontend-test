/* eslint-disable */

import {
  Box,
  CircularProgress,
  Container,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import AddArtForm from "./components/AddArtForm";
import ArtItem from "./components/ArtItem";

import useDefaultArtworks from "./hooks/useArtworks";
import { GenericObject } from "./reducers";
import { RootState } from "./store";

function App() {
  const { isLoading } = useDefaultArtworks();
  const { artworks } = useSelector((state: RootState) => state.artworks);
  if (isLoading) {
    return (
      <Container
        maxW={"container.lg"}
        centerContent
        p={30}
        height={"100vh"}
        justifyContent={"center"}
      >
        <CircularProgress isIndeterminate color="green.300" />
      </Container>
    );
  }

  return (
    <Flex direction={"column"}>
      <Container
        maxW={"container.lg"}
        centerContent
        p={30}
        h={"calc(100vh - 100px)"}
        overflow="scroll"
      >
        <Box mb={30}>
          <Heading mb={4}>Art Rater</Heading>
        </Box>
        <Flex
          align="center"
          justify="center"
          wrap={"wrap"}
          alignContent="center"
        >
          {artworks.map((artwork: GenericObject, _: number) => (
            <ArtItem key={artwork.id} artwork={artwork}></ArtItem>
          ))}
        </Flex>
      </Container>
      <AddArtForm />
    </Flex>
  );
}

export default App;
