import Head from "next/head";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import generator from "generate-maze";
import { HiOutlineEmojiHappy as LostGuyIcon } from "react-icons/hi";
import { FaFlag as FlagIcon } from "react-icons/fa";
import StyledPageMain from "../Components/StyledComponents/StyledPageMain";
import TrophyImage from "../Components/TrophyImage";

// Title
const StyledH1 = styled.h1`
  margin-bottom: 3rem;
  color: var(--color-3);
  font-weight: bolder;
  letter-spacing: 0.5rem;
  text-align: center;
  text-transform: uppercase;
`;

// Button
const StyledButton = styled.button`
  margin-bottom: 2rem;
  padding: 0.5rem;
  color: var(--color-4);
  font-weight: bolder;
  text-transform: uppercase;
  background-color: var(--color-2);
  border: var(--color-4) solid 3px;
  border-radius: 3px;
  cursor: pointer;
  opacity: 1;
  transition: transform 500ms ease-out, opacity 500ms ease-out;

  :hover {
    transform: scale(1.2);
    opacity: 0.95;
  }
`;

//* ** Maze ***//

const MazeWrapper = styled.div`
  position: relative; /* In order to center the Trophy Image */
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  grid-template-columns: repeat(10, 1fr);
  width: 70vw;
  min-width: 300px;
  max-width: 600px;
  height: 70vw;
  min-height: 300px;
  max-height: 600px;
  border: var(--color-4) 10px solid;

  .maze-cells:nth-of-type(1) {
    border-left: none;
  }

  .maze-cells:nth-of-type(60) {
    border-right: none;
  }
`;

const StyledMazeCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-4);
  border-top: ${({ borderTop }) =>
    borderTop ? `2px solid var(--color-2)` : `none`};
  border-right: ${({ borderRight }) =>
    borderRight ? `2px solid var(--color-2)` : `none`};
  border-bottom: ${({ borderBottom }) =>
    borderBottom ? `2px solid var(--color-2)` : `none`};
  border-left: ${({ borderLeft }) =>
    borderLeft ? `2px solid var(--color-2)` : `none`};
`;

const StyledLostGuy = styled(LostGuyIcon, {
  shouldForwardProp: (prop) => prop !== "visible", // "visible" prop is not passed to the DOM
})`
  width: 80%;
  height: 80%;
  color: var(--color-5);
  background-color: var(--color-1);
  border-radius: 50%;
  opacity: ${({ visible }) => (visible ? "1" : "0")};
  transition: opacity ease-in 150ms;
`;

const StyledFlagIcon = styled(FlagIcon)`
  width: 80%;
  height: 80%;
  padding: 0.5rem;
  color: var(--color-6);
  background-color: var(--color-1);
  border-radius: 3px;
`;

const Home = () => {
  // Generate 10 * 10 Maze
  const generateNewMaze = () => {
    const newGeneratedMaze = generator(10, 10);
    // Flatten generatedMaze
    return newGeneratedMaze.flat();
  };

  // State
  const [mazeArray, setMazeArray] = useState([]);
  const [lostGuyPosition, setLostGuyPosition] = useState(0);

  // Keyboard Function
  const handleKeyDown = (event) => {
    // Possibles Moves Object
    const {
      top: isTopImpossible,
      right: isRightImpossible,
      bottom: isBottomImpossible,
      left: isLeftImpossible,
    } = mazeArray[lostGuyPosition];

    // LostGuy Moves
    if (lostGuyPosition === 59) return; // Lost Guy found exit

    if (event.keyCode === 38 && isTopImpossible !== true) {
      setLostGuyPosition((currentPosition) => currentPosition - 10);
    }
    if (event.keyCode === 39 && isRightImpossible !== true) {
      setLostGuyPosition((currentPosition) => currentPosition + 1);
    }
    if (event.keyCode === 40 && isBottomImpossible !== true) {
      setLostGuyPosition((currentPosition) => currentPosition + 10);
    }
    if (event.keyCode === 37 && isLeftImpossible !== true) {
      setLostGuyPosition((currentPosition) => currentPosition - 1);
    }
  };

  // Two separate useEffect
  // Generate first Maze
  useEffect(() => {
    const newMaze = generateNewMaze();
    setMazeArray(newMaze);
  }, []);

  // Add Event Listener
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    // Clean Up Event Listener
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // New Maze Button
  const handleOnClick = () => {
    const newMaze = generateNewMaze();
    // Update State
    setMazeArray(newMaze);
    setLostGuyPosition(0);
  };

  return (
    <>
      <Head>
        <title key="title">Maze Game | Cyrilo</title>
        <meta name="description" content="Cool Maze Game" />
      </Head>
      <StyledPageMain>
        <StyledH1>
          {lostGuyPosition !== 59 ? "Maze is Amazing" : "Congrats, you won !"}
        </StyledH1>
        <StyledButton type="button" onClick={handleOnClick}>
          New Game
        </StyledButton>
        <MazeWrapper>
          {lostGuyPosition === 59 ? <TrophyImage /> : null}
          {mazeArray.map((mazeCell, index) => (
            <StyledMazeCell
              key={index}
              borderTop={mazeCell.top}
              borderRight={mazeCell.right}
              borderBottom={mazeCell.bottom}
              borderLeft={mazeCell.left}
              className="maze-cells"
            >
              {index !== 59 ? (
                <StyledLostGuy
                  className="lost-guy"
                  visible={index === lostGuyPosition}
                />
              ) : (
                <StyledFlagIcon />
              )}
            </StyledMazeCell>
          ))}
        </MazeWrapper>
      </StyledPageMain>
    </>
  );
};

export default Home;
