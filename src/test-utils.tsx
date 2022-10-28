import { ChakraProvider } from "@chakra-ui/react";
import { render, RenderOptions } from "@testing-library/react";
import React, { FC, ReactElement } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

const AllTheProviders: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ChakraProvider>
      <Provider store={store}>{children}</Provider>
    </ChakraProvider>
  );
};

const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { renderWithProviders };
