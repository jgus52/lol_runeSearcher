import Layout from "../comp/Layout";
import InputContainer from "../comp/InputContainer";
import Input from "../comp/Input";
import ChampContainer from "../comp/ChampContainer";
import Search from "../comp/Search";
import logo from "../logoSmall.png";
import { useForm } from "react-hook-form";
import Header from "../comp/Header";
import { Link } from "react-router-dom";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { GETLEAGUEINFO_MUTATION, UPDATECHAMPSINFO_MUTATION } from "./Home";
import Player from "../comp/Player";
import RowContainer from "../comp/RowContainer";
import ColumnContainer from "../comp/ColumnContainer";

const GETALLCHAMPINFO_QUERY = gql`
  query getAllChampInfo($summonerNames: [String]) {
    getAllChampInfo(summonerNames: $summonerNames) {
      champ {
        id
        championName
        championImg
        win
        lose
        kill
        death
        assist
      }
      user {
        id
        puuid
        name
      }
    }
  }
`;

const MultiSearch = () => {
  const { register, handleSubmit, getValues } = useForm({
    mode: "onSubmit",
  });
  const [getAllChampInfo, { data, loading, called, refetch }] = useLazyQuery(
    GETALLCHAMPINFO_QUERY,
    {
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      onCompleted: async ({ getAllChampInfo }) => {
        let summonerIds = [];
        let puuids = [];
        await getAllChampInfo.map((ele) => {
          summonerIds.push(ele.user.id);
          puuids.push(ele.user.puuid);
        });
        //console.log(puuids);
        getLeagueInfo({ variables: { summonerIds } });
        // updateChampsInfo({
        //   variables: { puuids },
        // });
      },
    }
  );
  const [getLeagueInfo, { data: leagueInfo, loading: leagueLoading }] =
    useMutation(GETLEAGUEINFO_MUTATION);
  const [updateChampsInfo, { data: updateChampReturn }] = useMutation(
    UPDATECHAMPSINFO_MUTATION,
    {
      refetchQueries: [GETALLCHAMPINFO_QUERY],
    }
  );
  const [summonerNames, setSummonerNames] = useState([]);

  const onSubmit = ({ summonerInfos }) => {
    //console.log(summonerInfos);
    setSummonerNames(summonerInfos.split("님이 방에 참가했습니다."));
  };

  useEffect(() => {
    if (summonerNames.length !== 0) {
      if (called) {
        //console.log("fetching");
        refetch({ summonerNames });
      } else {
        //console.log("fetching");
        getAllChampInfo({
          variables: { summonerNames },
        });
      }
    }
  }, [summonerNames]);

  if (loading || leagueLoading) {
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
              {...register("summonerInfos")}
              type="text"
              placeholder="copy and paste, xxx 님이 방에 참가하셨습니다, xxx 님이 방에 참가하셨습니다."
            ></Input>
            <Search type="submit" value="loading" loading="true" disabled />
          </form>
        </div>
      </Layout>
    );
  }
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
            {...register("summonerInfos")}
            type="text"
            placeholder="copy and paste, xxx 님이 방에 참가하셨습니다, xxx 님이 방에 참가하셨습니다."
          ></Input>
          <Search type="submit" value="search" />
        </form>
      </div>
      <ChampContainer>
        {leagueInfo &&
          data?.getAllChampInfo?.map((ele, index) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(255, 192, 203)",
                  width: "100%",
                  padding: 5,
                  borderRadius: 4,
                  marginBottom: 5,
                }}
                key={ele.user.id}
              >
                <RowContainer width="100%" justifyContent="space-between">
                  <ColumnContainer
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    <p
                      style={{
                        margin: 3,
                        marginBottom: 5,
                        fontSize: 30,
                        fontWeight: "bold",
                      }}
                    >
                      {ele.user.name}
                    </p>
                    <p style={{ margin: 3, fontSize: 15 }}>
                      {`${
                        leagueInfo.getLeagueInfo[index].tier +
                        leagueInfo.getLeagueInfo[index].rank
                      } - ${leagueInfo.getLeagueInfo[index].leaguePoints}`}
                    </p>
                    <p
                      style={{ margin: 3, fontSize: 15 }}
                    >{`${leagueInfo.getLeagueInfo[index].wins} W / ${leagueInfo.getLeagueInfo[index].losses} L`}</p>
                  </ColumnContainer>
                  {/* <ColumnContainer>
                    {ele?.champ?.map((ele) => {
                      return (
                        <RowContainer
                          justifyContent="flex-start"
                          width="250px"
                          key={ele.id}
                        >
                          <img
                            src={ele.championImg}
                            style={{ width: 25, height: 25 }}
                          ></img>
                          <div style={{ width: 80 }}>
                            <p style={{ margin: 3, fontSize: 12 }}>
                              {ele.championName}
                            </p>
                          </div>
                          <div style={{ width: 80 }}>
                            <p style={{ margin: 3, fontSize: 12 }}>
                              {ele.win + "W / " + ele.lose + "L"}
                            </p>
                          </div>
                          <div style={{ width: 80 }}>
                            <p style={{ margin: 3, fontSize: 12 }}>
                              {`${(ele.kill / (ele.win + ele.lose)).toFixed(
                                1
                              )}/${(ele.death / (ele.win + ele.lose)).toFixed(
                                1
                              )}/${(ele.assist / (ele.win + ele.lose)).toFixed(
                                1
                              )}`}
                            </p>
                          </div>
                        </RowContainer>
                      );
                    })}
                  </ColumnContainer> */}
                </RowContainer>
              </div>
            );
          })}
      </ChampContainer>
    </Layout>
  );
};

export default MultiSearch;
