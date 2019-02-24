import styled from "@emotion/styled";
import { Color } from "csstype";
import hexToRgba from "hex-to-rgba";
import { map } from "lodash";
import * as React from "react";
import { Conference } from "../../schema/Conference";
import { Contact } from "../../schema/Contact";
import { Theme } from "../../schema/Theme";
import connect from "../components/connect";
import { dayToFinnishLocale } from "../date-utils";

interface TweetPageContainerProps {
  primaryColor: Color;
  secondaryColor: Color;
}

const TweetPageContainer = styled.div`
  background-image: ${({
    primaryColor,
    secondaryColor,
  }: TweetPageContainerProps) => `linear-gradient(
      ${primaryColor},
      ${hexToRgba(secondaryColor, 0.79)}
    ),
    url("/media/assets/wave.svg")`};
  background-size: cover;
  position: relative;
  margin: auto;
  padding: 0;
  width: 880px;
  height: 440px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  color: white;
`;

const TweetInfoContainer = styled.div`
  padding: 3em;
`;

const TweetRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;

const TweetLogo = styled.img`
  max-width: 10em;
  margin-left: -0.5em;
`;

const TweetConferenceDays = styled.h3``;

const TweetImageContainer = styled.div`
  padding: 3em;
`;

const TweetImage = styled.img`
  width: 100%;
  box-sizing: border-box;
  clip-path: circle(9em at center);
`;

const TweetSpeakerName = styled.h1`
  padding-top: 1em;
  font-size: 300%;
`;

const TweetSpeakerTalk = styled.h2`
  padding-top: 0.5em;
  font-size: 200%;
`;

interface SpeakerTweetTemplateProps {
  conference?: Conference;
  contact?: Contact;
  theme: Theme;
}

function SpeakerTweetTemplate({
  conference,
  contact,
  theme,
}: SpeakerTweetTemplateProps) {
  const { name, image, talks } = contact || {
    name: "",
    image: { url: "" },
    talks: [],
  };
  const { schedules } = conference || { schedules: [] };
  const conferenceDays = map(schedules, ({ day }) => dayToFinnishLocale(day));

  const firstDay = conferenceDays[0];
  const lastDay = conferenceDays[conferenceDays.length - 1];

  return (
    <TweetPageContainer
      primaryColor={theme.colors.primary}
      secondaryColor={theme.colors.secondary}
    >
      <TweetInfoContainer>
        <TweetRow>
          <TweetLogo src={theme.logos.white.withText.url} />
          <TweetConferenceDays>
            {firstDay}-{lastDay}
          </TweetConferenceDays>
        </TweetRow>
        <TweetSpeakerName>{name}</TweetSpeakerName>
        <TweetSpeakerTalk>
          {Array.isArray(talks) && talks.length > 0 && talks[0].title}
        </TweetSpeakerTalk>
      </TweetInfoContainer>
      <TweetImageContainer>
        <TweetImage src={image.url} />
      </TweetImageContainer>
    </TweetPageContainer>
  );
}

export default connect(
  "/graphql",
  `
query SpeakerTweetTemplateQuery($conferenceId: ID!, $contactName: String!) {
  contact(contactName: $contactName, conferenceId: $conferenceId) {
    name
    image {
      url
    }
    talks {
      title
    }
  }
  conference(id: $conferenceId) {
    slogan
    schedules {
      day
    }
    locations {
      city
      country {
        name
      }
    }
  }
}
  `,
  {},
  ({ selected }) => ({ ...selected })
)(SpeakerTweetTemplate);
