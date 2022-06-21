import React from "react";

interface IProps {
  className?: string;
}

const FlexContainer: React.FC<IProps> = (props) => {
  const { className, children } = props;
  return <div className={`flex ${className}`}>{children}</div>;
};

export default FlexContainer;
