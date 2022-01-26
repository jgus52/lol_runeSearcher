import { gql, useLazyQuery, useMutation } from "@apollo/client";
import Input from "./comp/Input";
import InputContainer from "./comp/InputContainer";
import Layout from "./comp/Layout";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ChampContainer from "./comp/ChampContainer";
import Champ from "./comp/Champ";
import SpellImg from "./comp/Spell";
import ColumnContainer from "./comp/ColumnContainer";
import RowContainer from "./comp/RowContainer";
import Player from "./comp/Player";
import Search from "./comp/Search";
import RuneTooltip from "./comp/RuneTooltip";
import LeagueInfo from "./comp/LeagueInfos";

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
const GETLEAGUEINFO_MUTATION = gql`
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
const UPDATECHAMPSINFO_MUTATION = gql`
  mutation updateChampsInfo($puuids: [String!]) {
    updateChampsInfo(puuids: $puuids) {
      ok
      message
    }
  }
`;

const Home = () => {
  const { register, handleSubmit, getValues, reset } = useForm({
    mode: "onSubmit",
  });
  const [getOpponent, { loading, data: oppose }] =
    useLazyQuery(GETOPPONENT_QUERY);
  const [getLeagueInfo, { loading: gettingLeague, data: leagueInfo }] =
    useMutation(GETLEAGUEINFO_MUTATION);
  const [getChampInfo, { data: championInfos }] =
    useLazyQuery(GETCHAMPINFO_QUERY);
  const [updateChampsInfo, { data: updateChampReturn }] = useMutation(
    UPDATECHAMPSINFO_MUTATION,
    {
      refetchQueries: [GETCHAMPINFO_QUERY],
    }
  );

  const onSubmit = () => {
    const { summonerName } = getValues();
    getOpponent({
      variables: { summonerName },
      onCompleted: async ({ getOpponent }) => {
        let summonerIds = [];
        let puuids = [];
        let championIds = [];
        await getOpponent.map((ele) => {
          summonerIds.push(ele.summonerId);
          puuids.push(ele.puuid);
          championIds.push(ele.championId);
        });

        console.log(puuids);
        console.log(championIds);
        await getLeagueInfo({
          variables: { summonerIds },
        });
        getChampInfo({
          variables: { summonerIds: puuids, championIds },
        });
        updateChampsInfo({
          variables: { puuids },
        });
      },
    });
  };

  if (loading || gettingLeague) {
    return <h1>loading</h1>;
  }
  if (!oppose || !leagueInfo || !championInfos) {
    return (
      <Layout>
        <InputContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              {...register("summonerName")}
              type="text"
              placeholder="summonerName"
            ></Input>
            <Search type="submit" value="search" />
          </form>
        </InputContainer>
        <ChampContainer></ChampContainer>
      </Layout>
    );
  }
  return (
    <Layout>
      <InputContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("summonerName")}
            type="text"
            placeholder="summonerName"
          ></Input>
          <Search type="submit" value="search" />
        </form>
      </InputContainer>
      <ChampContainer>
        {oppose &&
          championInfos &&
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
              <RowContainer justifyContent="start" width="100%">
                <p
                  style={{
                    fontSize: 12,
                    marginTop: 0,
                    marginBottom: 0,
                    marginRight: 5,
                  }}
                >
                  {d.championName}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    marginTop: 0,
                    marginBottom: 0,
                    marginRight: 5,
                    marginLeft: 5,
                  }}
                >
                  {`${
                    championInfos.getChampInfo[index]?.win
                      ? championInfos.getChampInfo[index]?.win
                      : 0
                  }W ${
                    championInfos.getChampInfo[index]?.lose
                      ? championInfos.getChampInfo[index]?.lose
                      : 0
                  }L`}
                </p>
                <p
                  style={{
                    fontSize: 12,
                    marginTop: 0,
                    marginBottom: 0,
                    marginRight: 5,
                    marginLeft: 5,
                  }}
                >
                  {`${
                    championInfos.getChampInfo[index]?.kill
                      ? (
                          championInfos.getChampInfo[index]?.kill /
                          (championInfos.getChampInfo[index]?.win +
                            championInfos.getChampInfo[index]?.lose)
                        ).toPrecision(2)
                      : 0
                  }/
                      ${
                        championInfos.getChampInfo[index]?.death
                          ? (
                              championInfos.getChampInfo[index]?.death /
                              (championInfos.getChampInfo[index]?.win +
                                championInfos.getChampInfo[index]?.lose)
                            ).toPrecision(2)
                          : 0
                      }/
                      ${
                        championInfos.getChampInfo[index]?.assist
                          ? (
                              championInfos.getChampInfo[index]?.assist /
                              (championInfos.getChampInfo[index]?.win +
                                championInfos.getChampInfo[index]?.lose)
                            ).toPrecision(2)
                          : 0
                      }`}
                </p>
              </RowContainer>
            </Player>
          ))}
      </ChampContainer>
    </Layout>
  );
};

export default Home;
