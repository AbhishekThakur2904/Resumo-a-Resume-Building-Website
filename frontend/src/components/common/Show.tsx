import React from "react";

type Props = {
  when: boolean;
  children?: React.ReactNode;
};

//This is a component for better readability of code with less use of ternary operatior

const Show: React.FC<Props> = (props) => {
  const { when, children } = props;
  return when ? children : null;
};

export default Show;
