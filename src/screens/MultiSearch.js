import Layout from "../comp/Layout";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import RowContainer from "../comp/RowContainer";
import ColumnContainer from "../comp/ColumnContainer";
import HeaderInput from "../comp/HeaderInput";
import {
  GETALLCHAMPINFO_QUERY,
  GETLEAGUEINFO_QUERY,
  GETRECENTMATCHES_QUERY,
  GETSUMMONERSBYNAME_QUERY,
  UPDATECHAMPSINFO_MUTATION,
  UPDATEIDS_MUTATION,
} from "../Schema";
import { withTheme } from "styled-components";
import { URI } from "../apollo";

const MultiSearch = () => {
  // const getChampInfoOption = {
  //   fetchPolicy: "network-only",
  //   notifyOnNetworkStatusChange: true,
  //   onCompleted: async ({ getAllChampInfo }) => {
  //     //console.log(getAllChampInfo);
  //     let summonerIds = [];
  //     let puuids = [];
  //     for await (const ele of getAllChampInfo) {
  //       summonerIds.push(ele.user.id);
  //       puuids.push(ele.user.puuid);
  //     }
  //     //console.log(puuids);
  //     getLeagueInfo({ variables: { summonerIds } });
  //     await updateIds({
  //       variables: { summonerNames },
  //     });
  //     getRecentMatches({ variables: { puuids } });
  //     updateChampsInfo({
  //       variables: { puuids },
  //       onCompleted: () => {
  //         refetch({ summonerNames });
  //         refetchRecentMatches({ puuids });
  //       },
  //     });
  //   },
  // };

  const [
    getSummonersByName,
    {
      data: summoners,
      refetch: refetchGetSummonersByName,
      loading: getSummonersLoading,
    },
  ] = useLazyQuery(GETSUMMONERSBYNAME_QUERY, {
    onCompleted: async ({ getSummonersByName }) => {
      let summonerIds = [];
      let puuids = [];
      for await (const ele of getSummonersByName) {
        summonerIds.push(ele.id);
        puuids.push(ele.puuid);
      }
      getAllChampInfo({ variables: { puuids } });
      getLeagueInfo({ variables: { summonerIds } });
      // await updateIds({
      //   variables: { summonerNames },
      // });
      // getRecentMatches({ variables: { puuids } });
      // updateChampsInfo({
      //   variables: { puuids },
      //   onCompleted: () => {
      //     refetchGetAllChampInfo({ puuids });
      //     refetchRecentMatches({ puuids });
      //   },
      // });
    },
  });
  const [
    getAllChampInfo,
    { data, loading, called, refetch: refetchGetAllChampInfo, error },
  ] = useLazyQuery(GETALLCHAMPINFO_QUERY, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const [getLeagueInfo, { data: leagueInfo, loading: leagueLoading }] =
    useLazyQuery(GETLEAGUEINFO_QUERY);
  const [updateChampsInfo, { data: updateChampReturn }] = useMutation(
    UPDATECHAMPSINFO_MUTATION
  );
  const [updateIds] = useMutation(UPDATEIDS_MUTATION);
  const [
    getRecentMatches,
    { data: recentMatches, refetch: refetchRecentMatches },
  ] = useLazyQuery(GETRECENTMATCHES_QUERY);
  const [summonerNames, setSummonerNames] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (summonerNames !== "") {
      if (summonerNames.length !== 0) {
        if (called) {
          //console.log("fetching");
          refetchGetSummonersByName({ summonerNames });
        } else {
          //console.log("fetching");
          getSummonersByName({
            variables: { summonerNames },
          });
        }
      }
    }
  }, [summonerNames]);
  useEffect(() => {
    if (input !== "")
      setSummonerNames(input.split("님이 로비에 참가하셨습니다."));
  }, [input]);

  return (
    <Layout>
      <HeaderInput
        setState={setInput}
        loading={loading || leagueLoading || getSummonersLoading}
        placeholder={`copy and paste, xxx 님이 로비에 참가하셨습니다, xxx 님이 로비에 참가하셨습니다.`}
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
        {error ? (
          <p>{"Check All Ally's SummonerNames are right"}</p>
        ) : (
          leagueInfo &&
          data?.getAllChampInfo?.map((ele, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(255, 192, 203)",
                  width: "90%",
                  padding: 5,
                  borderRadius: 4,
                  marginBottom: 5,
                }}
                key={summoners.getSummonersByName[index].id}
              >
                <RowContainer width="100%" justifyContent="space-between">
                  <ColumnContainer
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {summoners.getSummonersByName[index].name}
                    </p>
                    <img
                      src={`${URI}/img/${leagueInfo.getLeagueInfo[index]?.tier}.png`}
                      style={{
                        height: 100,
                      }}
                    />
                    <p style={{ margin: 3, fontSize: 15 }}>
                      {`${
                        leagueInfo.getLeagueInfo[index]?.tier +
                        leagueInfo.getLeagueInfo[index]?.rank
                      } - ${leagueInfo.getLeagueInfo[index]?.leaguePoints}`}
                    </p>
                    <p
                      style={{ margin: 3, fontSize: 15 }}
                    >{`${leagueInfo.getLeagueInfo[index]?.wins} W / ${leagueInfo.getLeagueInfo[index]?.losses} L`}</p>
                  </ColumnContainer>
                  {/* <RowContainer>
                    <ColumnContainer
                      style={{ border: "1px solid", borderBottom: "none" }}
                    >
                      {ele?.map((champObj) => {
                        // console.log(
                        //   ele.user.name,
                        //   champObj.championName,
                        //   champObj.win,
                        //   champObj.lose
                        // );
                        return (
                          <RowContainer
                            justifyContent="flex-start"
                            alignItems="cetner"
                            width="265px"
                            key={
                              summoners.getSummonersByName[index].id +
                              champObj.id
                            }
                            style={{
                              backgroundColor: "lightGrey",
                              borderBottom: "1px solid",
                            }}
                          >
                            <img
                              src={champObj.championImg}
                              style={{ width: 25, height: 25 }}
                            ></img>
                            <div
                              style={{
                                width: 80,
                                height: 25,
                                display: "flex",
                                alignItems: "center",
                                borderRight: "1px solid",
                              }}
                            >
                              <p
                                style={{
                                  margin: 3,
                                  fontSize: 12,
                                }}
                              >
                                {champObj.championName}
                              </p>
                            </div>
                            <div
                              style={{
                                width: 80,
                                height: 25,
                                display: "flex",
                                alignItems: "center",
                                borderRight: "1px solid",
                              }}
                            >
                              <p style={{ margin: 3, fontSize: 12 }}>
                                {champObj.win + "W / " + champObj.lose + "L"}
                              </p>
                            </div>
                            <div
                              style={{
                                width: 80,
                                height: 25,
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <p style={{ margin: 3, fontSize: 12 }}>
                                {`${(
                                  champObj.kill /
                                  (champObj.win + champObj.lose)
                                ).toFixed(1)}/${(
                                  champObj.death /
                                  (champObj.win + champObj.lose)
                                ).toFixed(1)}/${(
                                  champObj.assist /
                                  (champObj.win + champObj.lose)
                                ).toFixed(1)}`}
                              </p>
                            </div>
                          </RowContainer>
                        );
                      })}
                    </ColumnContainer>
                    <ColumnContainer
                      style={{ border: "1px solid", borderBottom: "none" }}
                    >
                      {recentMatches?.getRecentMatches[index]?.map((match) => {
                        return (
                          <RowContainer
                            justifyContent="flex-start"
                            width="120px"
                            key={match.matchId}
                            style={{
                              backgroundColor: `${
                                match.win ? "skyblue" : "tomato"
                              }`,
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
                      })}
                    </ColumnContainer>
                  </RowContainer> */}
                </RowContainer>
              </div>
            );
          })
        )}
      </ColumnContainer>
    </Layout>
  );
};

export default MultiSearch;
