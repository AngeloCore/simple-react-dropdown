"use client";

import styled from "@emotion/styled";
import Dropdown from "../components/Dropdown";
import { useState } from "react";

const options = [
  { label: "oke", value: "k" },
  { label: "xd", value: "x" },
  { label: "test", value: "t" }
];

export default function Page() {
  const [text, setText] = useState("Select an option.");

  const handleClick = (value) =>
    setText(options.find((o) => o.value === value).label);

  return (
    <Container>
      <Box>
        <Title>Simple dropdown test</Title>
        <Dropdown onClick={handleClick} options={options}>
          {text}
        </Dropdown>
      </Box>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;
  background-color: #1b1b1b;
  border-radius: 15px;
  padding: 20px 40px;
`;

const Title = styled.h1`
  background: #2c2c2c;
  padding: 40px;
  border-radius: 15px;
`;
