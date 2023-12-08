import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

const PRIMARY_COLOR = "#2c2c2c";
const SECONDARY_COLOR = "#52de5e";

export default function Dropdown({
  onClick = () => {},
  options = [],
  children = "Select Option"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const dropdownRef = useRef(null);

  const handleDocumentClick = (event) => {
    if (isOpen && !dropdownRef.current?.contains(event.target)) {
      setIsOpen(false);
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);

    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [isOpen]);

  return (
    <Select
      ref={dropdownRef}
      onClick={() => setIsOpen(!isOpen)}
      onMouseOver={() => setIsActive(true)}
      onMouseOut={() => !isOpen && setIsActive(false)}
      open={isOpen}
    >
      <Text active={isActive}>{children}</Text>
      <Box open={isOpen}>
        {options.map((o) => (
          <Item onClick={() => onClick(o.value)} key={o.value}>
            {o.label}
          </Item>
        ))}
      </Box>
    </Select>
  );
}

const Select = styled.div`
  font-size: 17px;
  width: 250px;
  user-select: none;

  p {
    padding: 10px 20px;
    margin: 0;
  }
`;

const Text = styled.p`
  background: ${PRIMARY_COLOR};
  cursor: pointer;
  border-radius: 7px;
  transition: 200ms linear;
  border: 3px solid transparent;
  border-color: ${(props) => (props.active ? SECONDARY_COLOR : "transparent")};
`;

const Box = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  margin-top: 10px;
  border-radius: 7px;
  cursor: pointer;
  position: absolute;
  width: 250px;
`;

const Item = styled.p`
  border-top: 0.5px solid rgb(255, 255, 255, 0.1);
  background: ${PRIMARY_COLOR};
  transition: 200ms linear;

  :hover {
    opacity: 0.9;
  }

  :nth-of-type(1) {
    /* border-top: 1px solid rgb(255, 255, 255, 0.3); */
    border-top: none;
    border-radius: 7px 7px 0 0;
  }

  :nth-last-of-type(1) {
    border-radius: 0 0 7px 7px;
  }
`;
