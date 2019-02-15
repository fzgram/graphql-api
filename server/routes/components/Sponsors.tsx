import styled from "@emotion/styled";
import * as React from "react";
import Contacts from "./Contacts";
import Sponsor from "./Sponsor";

const SponsorsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  margin-left: 0.5cm;
  margin-right: 0.5cm;
`;

const GoldSponsors = styled.div``;
const SilverSponsors = styled.div``;
const BronzeSponsors = styled.div``;
const SponsorsList = styled.section``;

// TODO: Check if the structure can be simplified
const Sponsors = ({
  goldSponsors = [],
  silverSponsors = [],
  bronzeSponsors = [],
}) => (
  <SponsorsContainer>
    <GoldSponsors>
      <SponsorsList>
        <Contacts
          items={goldSponsors}
          render={Sponsor}
          renderProps={{ type: "gold" }}
        />
      </SponsorsList>
    </GoldSponsors>
    <SilverSponsors>
      <SponsorsList>
        <Contacts
          items={silverSponsors}
          render={Sponsor}
          renderProps={{ type: "silver" }}
        />
      </SponsorsList>
    </SilverSponsors>
    <BronzeSponsors>
      <SponsorsList>
        <Contacts
          items={bronzeSponsors}
          render={Sponsor}
          renderProps={{ type: "bronze" }}
        />
      </SponsorsList>
    </BronzeSponsors>
  </SponsorsContainer>
);

export default Sponsors;
