import React from "react";
import { Wrapper } from "./styles";

type MainProps = {
  children: React.ReactNode;
};

const Main = ({ children }: MainProps) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Main;
