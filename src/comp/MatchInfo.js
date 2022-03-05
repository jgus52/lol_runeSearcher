import RowContainer from "./RowContainer";

const MatchInfo = ({ matches }) => {
  console.log(matches);
  return matches.map((match) => {
    return (
      <RowContainer
        justifyContent="flex-start"
        width="120px"
        key={match.matchId}
        style={{
          backgroundColor: `${match.win ? "skyblue" : "tomato"}`,
          borderBottom: "1px solid",
        }}
      >
        <img src={match.championImg} style={{ width: 25, height: 25 }}></img>
        <div
          style={{
            width: 40,
            height: 25,
            display: "flex",
            alignItems: "center",
            borderRight: "1px solid",
          }}
        >
          <p style={{ margin: 3, fontSize: 12 }}>
            {`${match.win ? "win" : "lose"}`}
          </p>
        </div>
        <div
          style={{
            width: 55,
            height: 25,
            display: "flex",
            alignItems: "center",
          }}
        >
          <p style={{ margin: 3, fontSize: 12 }}>
            {`${match.kills}/${match.deaths}/${match.assist}`}
          </p>
        </div>
      </RowContainer>
    );
  });
};

export default MatchInfo;
