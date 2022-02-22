import Layout from "../comp/Layout";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import RowContainer from "../comp/RowContainer";
import ColumnContainer from "../comp/ColumnContainer";
import HeaderInput from "../comp/HeaderInput";
import {
  GETALLCHAMPINFO_QUERY,
  GETLEAGUEINFO_QUERY,
  UPDATECHAMPSINFO_MUTATION,
  UPDATEIDS_MUTATION,
} from "../Schema";
import { withTheme } from "styled-components";

const MultiSearch = () => {
  const [getAllChampInfo, { data, loading, called, refetch, error }] =
    useLazyQuery(GETALLCHAMPINFO_QUERY, {
      fetchPolicy: "network-only",
      notifyOnNetworkStatusChange: true,
      onCompleted: async ({ getAllChampInfo }) => {
        let summonerIds = [];
        let puuids = [];
        for await (const ele of getAllChampInfo) {
          summonerIds.push(ele.user.id);
          puuids.push(ele.user.puuid);
        }
        //console.log(puuids);
        getLeagueInfo({ variables: { summonerIds } });
        updateIds({
          variables: { summonerNames: input },
        });
        updateChampsInfo({
          variables: { puuids },
        });
      },
    });
  const [getLeagueInfo, { data: leagueInfo, loading: leagueLoading }] =
    useLazyQuery(GETLEAGUEINFO_QUERY);
  const [updateChampsInfo, { data: updateChampReturn }] = useMutation(
    UPDATECHAMPSINFO_MUTATION
  );
  const [updateIds] = useMutation(UPDATEIDS_MUTATION);
  const [summonerNames, setSummonerNames] = useState("");
  let input = [];

  useEffect(() => {
    if (summonerNames !== "") {
      input = summonerNames.split("님이 로비에 참가하셨습니다.");

      if (input.length !== 0) {
        if (called) {
          //console.log("fetching");
          refetch({ summonerNames: input });
        } else {
          //console.log("fetching");
          getAllChampInfo({
            variables: { summonerNames: input },
          });
        }
      }
    }
  }, [summonerNames]);

  return (
    <Layout>
      <HeaderInput
        setState={setSummonerNames}
        loading={loading}
        gettingLeague={leagueLoading}
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
                        fontSize: 20,
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
                  {/* <ColumnContainer
                    style={{ border: "1px solid", borderBottom: "none" }}
                  >
                    {ele?.champ?.map((ele) => {
                      return (
                        <RowContainer
                          justifyContent="flex-start"
                          alignItems="cetner"
                          width="250px"
                          key={ele.id}
                          style={{
                            backgroundColor: "lightGrey",
                            borderBottom: "1px solid",
                          }}
                        >
                          <img
                            src={ele.championImg}
                            style={{ width: 25, height: 25 }}
                          ></img>
                          <div
                            style={{
                              width: 80,
                            }}
                          >
                            <p
                              style={{
                                margin: 3,
                                fontSize: 12,
                              }}
                            >
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
          })
        )}
      </ColumnContainer>
    </Layout>
  );
};

export default MultiSearch;
