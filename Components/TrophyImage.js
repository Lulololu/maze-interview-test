import Image from "next/image";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

const StyledTrophyWrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 10rem;
  height: 10rem;
  overflow: hidden;
  transform: translate(-50%, -50%);
`;

const trophyImageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
      type: "spring",
    },
  },
};

const TrophyImage = () => {
  return (
    <StyledTrophyWrapper
      initial="initial"
      animate="animate"
      variants={trophyImageVariants}
    >
      <Image
        src="/trophy.svg"
        layout="fill"
        objectFit="cover"
        alt="Trophy Icon"
      />
    </StyledTrophyWrapper>
  );
};

export default TrophyImage;
