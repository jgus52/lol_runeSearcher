import { gql, useLazyQuery, useMutation } from "@apollo/client";
import Layout from "../comp/Layout";
import ColumnContainer from "../comp/ColumnContainer";
import RowContainer from "../comp/RowContainer";
import RuneTooltip from "../comp/RuneTooltip";
import { useEffect, useState } from "react";
import HeaderInput from "../comp/HeaderInput";
import styled from "styled-components";
import {
  GETCHAMPINFO_QUERY,
  GETLEAGUEINFO_QUERY,
  GETOPPONENT_QUERY,
  UPDATECHAMPSINFO_MUTATION,
  UPDATEIDS_MUTATION,
} from "../Schema";

const Home = () => {
  const [
    getOpponent,
    { loading, data: oppose, refetch, called, error: getOpponentError },
  ] = useLazyQuery(GETOPPONENT_QUERY, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    onCompleted: async ({ getOpponent }) => {
      //console.log("get Opponent Completed!");
      let summonerIds = [];
      let puuids = [];
      let championIds = [];
      let summonerNames = [];
      for (let ele of getOpponent) {
        summonerNames.push(ele.summonerName);
        summonerIds.push(ele.summonerId);
        championIds.push(ele.championId);
      }
      // console.log(puuids);
      // console.log(championIds);
      await getLeagueInfo({
        variables: { summonerIds },
      });
      // updateIds({
      //  variables : {summonerNames}
      // })
      // getChampInfo({
      //   variables: { summonerIds: puuids, championIds },
      // });
      // updateChampsInfo({
      //   variables: { puuids },
      // });
    },
  });
  const [getLeagueInfo, { loading: gettingLeague, data: leagueInfo }] =
    useLazyQuery(GETLEAGUEINFO_QUERY, {});
  const [getChampInfo, { data: championInfos }] =
    useLazyQuery(GETCHAMPINFO_QUERY);
  const [updateChampsInfo, { data: updateChampReturn }] = useMutation(
    UPDATECHAMPSINFO_MUTATION,
    {
      refetchQueries: [GETCHAMPINFO_QUERY],
    }
  );
  const [updateIds] = useMutation(UPDATEIDS_MUTATION);

  const [summonerName, setSummonerName] = useState("");

  useEffect(() => {
    if (summonerName !== "") {
      if (called) {
        refetch({ summonerName });
      } else {
        getOpponent({
          variables: { summonerName },
        });
      }
    }
  }, [summonerName]);

  return (
    <Layout>
      <HeaderInput
        setState={setSummonerName}
        loading={loading}
        gettingLeague={gettingLeague}
        placeholder={`Put Summoner Name`}
      />
      <ColumnContainer
        style={{
          justifyContent: "top",
          alignItems: "center",
          height: "80%",
          width: 960,
          padding: 3,
        }}
      >
        {getOpponentError ? (
          <p>{getOpponentError.message}</p>
        ) : (
          oppose &&
          oppose?.getOpponent?.map((d, index) => (
            <ColumnContainer
              key={index}
              style={{
                width: 800,
                borderRadius: 4,
                padding: "1% 3%",
                backgroundColor: "rgba(255, 192, 203, 0.6)",
                marginBottom: 5,
              }}
            >
              <RowContainer
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "80%",
                  width: 800,
                  padding: 3,
                }}
              >
                <RowContainer justifyContent="center">
                  <img
                    src={d.championImg}
                    style={{ height: "76px", margin: 3 }}
                    alt={"champion"}
                  />
                  <ColumnContainer>
                    <img
                      src={d.spell1Img}
                      style={{ height: "35px", margin: 3 }}
                      alt={"spell1"}
                    />
                    <img
                      src={d.spell2Img}
                      style={{ height: "35px", margin: 3 }}
                      alt={"spell2"}
                    />
                  </ColumnContainer>
                  <ColumnContainer alignItems={"flex-start"}>
                    {leagueInfo ? (
                      <>
                        <p style={{ fontSize: 15, margin: 3 }}>
                          {leagueInfo.getLeagueInfo[index]?.tier +
                            " " +
                            leagueInfo.getLeagueInfo[index]?.rank}
                        </p>
                        <p style={{ fontSize: 15, margin: 3 }}>
                          {leagueInfo.getLeagueInfo[index]?.leaguePoints}p
                        </p>
                        <p style={{ fontSize: 15, margin: 3 }}>
                          {leagueInfo.getLeagueInfo[index]?.wins +
                            "W " +
                            leagueInfo.getLeagueInfo[index]?.losses +
                            "L"}
                        </p>
                      </>
                    ) : null}
                  </ColumnContainer>
                </RowContainer>
                <RowContainer>
                  {d?.perks.perkIcons.map((e, index) => (
                    <RuneTooltip
                      message1={`${d.perks.perkNames[index]}`}
                      message2={`${d.perks.perkInfos[index]}`}
                      key={index}
                    >
                      <img
                        src={e}
                        style={{ height: "40px", margin: 5 }}
                        key={index}
                        alt={"rune"}
                      />
                    </RuneTooltip>
                  ))}
                  <ColumnContainer justifyContent="center">
                    {d?.perks.statIcons.map((e, index) => (
                      <img
                        src={e}
                        style={{ height: "20px" }}
                        key={index}
                        alt={"stat Rune"}
                      />
                    ))}
                  </ColumnContainer>
                </RowContainer>
              </RowContainer>
              <RowContainer justifyContent="start" width="100%">
                <p style={{ margin: 0 }}>{d.summonerName}</p>
              </RowContainer>
            </ColumnContainer>
          ))
        )}
      </ColumnContainer>
    </Layout>
  );
};

export default Home;
