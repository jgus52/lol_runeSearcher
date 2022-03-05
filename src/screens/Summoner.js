import { URI } from "../apollo";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
  GETALLCHAMPINFO_QUERY,
  GETLEAGUEINFO_QUERY,
  GETRECENTMATCHES_QUERY,
  GETSUMMONER_QUERY,
} from "../Schema";
import { useParams } from "react-router-dom";
import Layout from "../comp/Layout";
import HeaderInput from "../comp/HeaderInput";
import RowContainer from "../comp/RowContainer";
import { useState } from "react";
import ColumnContainer from "../comp/ColumnContainer";
import ChampInfos from "../comp/ChampInfos";
import MatchInfo from "../comp/MatchInfo";

const Summoner = () => {
  const { summonerName } = useParams();
  const { loading, data: getSummoner } = useQuery(GETSUMMONER_QUERY, {
    variables: { summonerName },
    onCompleted: (getSummoner) => {
      getLeagueInfo({
        variables: { summonerIds: [getSummoner.getSummoner.id] },
      });
      getRecentMatches({
        variables: { puuids: [getSummoner.getSummoner.puuid], take: 10 },
      });
      getAllChampInfo({
        variables: { puuids: [getSummoner.getSummoner.puuid], take: 10 },
      });
    },
  });
  const [getLeagueInfo, { data: leagueQuery, loading: gettingLeague }] =
    useLazyQuery(GETLEAGUEINFO_QUERY);
  const [getRecentMatches, { data: recentMatches, loading: gettingMatch }] =
    useLazyQuery(GETRECENTMATCHES_QUERY);
  const [getAllChampInfo, { data: champInfos, loading: gettingChamp }] =
    useLazyQuery(GETALLCHAMPINFO_QUERY);

  const [input, setInput] = useState(summonerName);

  return (
    <Layout>
      <HeaderInput
        setState={setInput}
        loading={loading || gettingMatch || gettingChamp || gettingLeague}
        placeholder={"push Summoner Name"}
      />
      {getSummoner ? (
        <RowContainer
          style={{
            width: 800,
            height: 150,
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <img
            src={getSummoner.getSummoner.profileIcon}
            style={{ width: 100, height: 100 }}
            alter={"profile Icon"}
          />
          <ColumnContainer>
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                width: "90%",
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                {getSummoner.getSummoner.name}
              </p>
            </div>
            {leagueQuery ? (
              <RowContainer style={{ justifyContent: "flex-start" }}>
                <img
                  src={`${URI}/img/${leagueQuery.getLeagueInfo[0]?.tier}.png`}
                  style={{
                    height: 80,
                  }}
                />
                <ColumnContainer style={{ alignItems: "center" }}>
                  <p style={{ margin: 3, fontSize: 15 }}>
                    {`${
                      leagueQuery.getLeagueInfo[0]?.tier +
                      leagueQuery.getLeagueInfo[0]?.rank
                    } - ${leagueQuery.getLeagueInfo[0]?.leaguePoints}`}
                  </p>
                  <p
                    style={{ margin: 3, fontSize: 15 }}
                  >{`${leagueQuery.getLeagueInfo[0]?.wins} W / ${leagueQuery.getLeagueInfo[0]?.losses} L`}</p>
                </ColumnContainer>
              </RowContainer>
            ) : null}
          </ColumnContainer>
        </RowContainer>
      ) : null}
      <RowContainer
        style={{
          width: 800,
        }}
      >
        <ColumnContainer>
          {champInfos ? (
            <ColumnContainer
              style={{ border: "1px solid", borderBottom: "none" }}
            >
              <ChampInfos
                summoner={getSummoner.getSummoner}
                champs={champInfos?.getAllChampInfo[0]}
                full={true}
              />
            </ColumnContainer>
          ) : null}
        </ColumnContainer>
        <ColumnContainer style={{ border: "1px solid", borderBottom: "none" }}>
          {recentMatches ? (
            <MatchInfo matches={recentMatches?.getRecentMatches[0]} />
          ) : null}
          {/* {recentMatches?.getRecentMatches[0]?.map((match) => {
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
                <img
                  src={match.championImg}
                  style={{ width: 25, height: 25 }}
                ></img>
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
          })} */}
        </ColumnContainer>
      </RowContainer>
    </Layout>
  );
};

export default Summoner;
