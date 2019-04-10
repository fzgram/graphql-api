const scheduleQuery = `
query ScheduleQuery($conferenceId: ID!, $day: String!) {
  schedule(conferenceId: $conferenceId, day: $day) {
    day
    description
    intervals {
      begin
      end
      sessions {
        type
        title
        people {
          name
          image {
            url
          }
        }
      }
    }
  }
}
`;

export default scheduleQuery;
