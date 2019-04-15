import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import twitter from "../images/twitter.png";
import website from "../images/website.png";

/**
 * Message.js - Returns a formatted message box.
 *
 * @param {string} sender - Defines who sent the message.
 * @param {string} origin - Defines where the message came from.
 * @param {string} subject - Defines the subject of the message.
 * @param {string} body - Defines the body of the message.
 */
const Message = ({ sender, origin, subject, body, datetime }) => {
  return (
    <Container>
      <Head>
        <HeadImage src={origin === "twt" ? twitter : website} />
        <HeadText>
          <HeadTitle>{sender}</HeadTitle>
          <HeadSubject>
            {new Date(datetime * 1000).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit"
            })}
            &nbsp;&bull;&nbsp;{subject}
          </HeadSubject>
        </HeadText>
      </Head>
      <Body>{body}</Body>
    </Container>
  );
};

Message.propTypes = {
  sender: PropTypes.string.isRequired,
  origin: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  datetime: PropTypes.number.isRequired
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
  padding-left: 0.75em;
  line-height: 1.1;

  display: flex;
  flex-direction: column;
  justify-content: center;

  white-space: nowrap;
  text-overflow: ellipse;
`;

const HeadTitle = styled.div`
  font-family: var(--font-heading);
  font-size: 2rem;
`;

const HeadSubject = styled.div`
  font-size: 1.2rem;
`;

const Body = styled.div`
  font-size: 1.3rem;
  padding: 0.8rem;
  line-height: 1.2;
  white-space: pre-line;
`;
