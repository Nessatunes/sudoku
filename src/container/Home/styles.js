import styled from "styled-components";

const backgroundColor = (key) => {
  switch (key) {
    case "Resolver":
      return "orange";
    case "Restart":
      return "aqua";
    default:
      return "tomato";
  }
};

export const Container = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

export const ButtonContainer = styled.div`
  margin-top: 20px;
`;

export const Button = styled.button`
  background-color: ${({ children }) => backgroundColor(children)};
  font-weight: bold;
  padding: 12px 23px;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  margin: 0 20px;
  cursor: pointer;
  transition: 1s;

  &:hover {
    transform: scale(1.2);
  }
`;
