import { gql, useLazyQuery, useMutation } from "@apollo/client";
import Input from "../comp/Input";
import InputContainer from "../comp/InputContainer";
import Layout from "../comp/Layout";
import { useForm } from "react-hook-form";
import ChampContainer from "../comp/ChampContainer";
import Champ from "../comp/Champ";
import SpellImg from "../comp/Spell";
import ColumnContainer from "../comp/ColumnContainer";
import RowContainer from "../comp/RowContainer";
import Player from "../comp/Player";
import Search from "../comp/Search";
import RuneTooltip from "../comp/RuneTooltip";
import LeagueInfo from "../comp/LeagueInfos";
import { useEffect, useState } from "react";

const GETOPPONENT_QUERY = gql`
  query getOpponent($summonerName: String!) {
    getOpponent(summonerName: $summonerName) {
      championId
      championName
      championImg
      summonerName
      summonerId
      puuid
      perks {
        perkIds
        perkIcons
        statIcons
        perkNames
        perkInfos
      }
      spell1Img
      spell2Img
    }
  }
`;
export const GETLEAGUEINFO_MUTATION = gql`
  mutation getLeagueInfo($summonerIds: [String!]) {
    getLeagueInfo(summonerIds: $summonerIds) {
      wins
      losses
      tier
      rank
      leaguePoints
    }
  }
`;
const GETCHAMPINFO_QUERY = gql`
  query getChampInfo($summonerIds: [String!], $championIds: [Int!]) {
    getChampInfo(summonerIds: $summonerIds, championIds: $championIds) {
      win
      lose
      kill
      death
      assist
    }
  }
`;
export const UPDATECHAMPSINFO_MUTATION = gql`
  mutation updateChampsInfo($puuids: [String!]) {
    updateChampsInfo(puuids: $puuids) {
      ok
      message
    }
  }
`;

const Home = () => {
  const { register, handleSubmit, getValues } = useForm({
    mode: "onSubmit",
  });
  const [getOpponent, { loading, data: oppose, refetch, called }] =
    useLazyQuery(GETOPPONENT_QUERY, {
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      onCompleted: async ({ getOpponent }) => {
        //console.log("get Opponent Completed!");
        let summonerIds = [];
        let puuids = [];
        let championIds = [];
        await getOpponent.map((ele) => {
          summonerIds.push(ele.summonerId);
          puuids.push(ele.puuid);
          championIds.push(ele.championId);
        });
        // console.log(puuids);
        // console.log(championIds);
        await getLeagueInfo({
          variables: { summonerIds },
        });
        // getChampInfo({
        //   variables: { summonerIds: puuids, championIds },
        // });
        // updateChampsInfo({
        //   variables: { puuids },
        // });
      },
    });
  const [getLeagueInfo, { loading: gettingLeague, data: leagueInfo }] =
    useMutation(GETLEAGUEINFO_MUTATION, {});
  const [getChampInfo, { data: championInfos }] =
    useLazyQuery(GETCHAMPINFO_QUERY);
  const [updateChampsInfo, { data: updateChampReturn }] = useMutation(
    UPDATECHAMPSINFO_MUTATION,
    {
      refetchQueries: [GETCHAMPINFO_QUERY],
    }
  );

  const [summonerName, setSummonerName] = useState("");

  const onSubmit = ({ summonerNameInput }) => {
    setSummonerName(() => summonerNameInput);
  };

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
      <div
        style={{
          width: "100%",
          position: "fixed",
          top: 80,
          backgroundColor: "lightgrey",
          paddingBottom: 5,
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Input
            {...register("summonerNameInput")}
            type="text"
            placeholder="Put Summoner Name"
          ></Input>
          {loading || gettingLeague ? (
            <Search type="submit" value="loading" loading="true" disabled />
          ) : (
            <Search type="submit" value="search" />
          )}
        </form>
      </div>
      <ChampContainer>
        {oppose && oppose?.getOpponent?.length == 0 ? (
          <p>Not in Gaming</p>
        ) : (
          oppose &&
          leagueInfo &&
          oppose?.getOpponent?.map((d, index) => (
            <Player key={index}>
              <Champ>
                <RowContainer justifyContent="center">
                  <img
                    src={d.championImg}
                    style={{ height: "76px", margin: 3 }}
                  />
                  <ColumnContainer>
                    <img
                      src={d.spell1Img}
                      style={{ height: "35px", margin: 3 }}
                    />
                    <img
                      src={d.spell2Img}
                      style={{ height: "35px", margin: 3 }}
                    />
                  </ColumnContainer>
                  <LeagueInfo>
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
                  </LeagueInfo>
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
                      />
                    </RuneTooltip>
                  ))}
                  <ColumnContainer justifyContent="center">
                    {d?.perks.statIcons.map((e, index) => (
                      <img src={e} style={{ height: "20px" }} key={index} />
                    ))}
                  </ColumnContainer>
                </RowContainer>
              </Champ>
              <RowContainer justifyContent="start" width="100%">
                <p style={{ margin: 0 }}>{d.summonerName}</p>
              </RowContainer>
            </Player>
          ))
        )}
      </ChampContainer>
    </Layout>
  );
};

export default Home;
