import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Message.js - Returns a formatted message box.
 *
 * @param {string} sender - Defines who sent the message.
 * @param {string} origin - Defines where the message came from.
 * @param {string} imageURL - Defines the image to display.
 * @param {string} body - Defines the body of the message.
 */
const Message = ({ sender, origin, imageURL, body }) => {
  return (
    <Container>
      <Head>
        <HeadImage src={imageURL} />
        <HeadText>
          <HeadTitle>{sender}</HeadTitle>
          <HeadOrigin>{origin}</HeadOrigin>
        </HeadText>
      </Head>
      <Body>{body}</Body>
    </Container>
  );
};

Message.propTypes = {
  sender: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired
};

export default Message;

/**
 * Defines the styles.
 */
const Container = styled.div`
  color: var(--secondary-colour);
  font-family: var(--font-main);
  margin: 0rem 1rem 1rem 1rem;

  background-color: var(--primary-colour);
  border-radius: 0.6rem;
  box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.75);

  user-select: none;
  overflow: hidden;
`;

const Head = styled.div`
  background-color: var(--accent-colour);
  display: flex;
`;

const HeadImage = styled.img`
  height: 4.5rem;
  width: 4.5rem;
`;

const HeadText = styled.div`
  padding-left: 0.8em;
  line-height: 1.1;

  display: flex;
  flex-direction: column;
  justify-content: center;

  white-space: nowrap;
  text-overflow: clip;
`;

const HeadTitle = styled.div`
  font-family: var(--font-heading);
  font-size: 2rem;
`;

const HeadOrigin = styled.div`
  font-size: 1.5rem;
`;

const Body = styled.div`
  font-size: 1.25rem;
  padding: 0.8rem;
  line-height: 1.2;
  white-space: pre-line;
`;
