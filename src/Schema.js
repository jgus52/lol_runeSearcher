import { gql } from "@apollo/client";

export const GETOPPONENT_QUERY = gql`
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
export const GETLEAGUEINFO_QUERY = gql`
  query getLeagueInfo($summonerIds: [String!]) {
    getLeagueInfo(summonerIds: $summonerIds) {
      wins
      losses
      tier
      rank
      leaguePoints
    }
  }
`;

export const GETCHAMPINFO_QUERY = gql`
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

export const GETALLCHAMPINFO_QUERY = gql`
  query getAllChampInfo($puuids: [String], $take: Int, $cursor: String) {
    getAllChampInfo(puuids: $puuids, take: $take, cursor: $cursor) {
      id
      championName
      championImg
      win
      lose
      kill
      death
      assist
    }
  }
`;

export const GETSUMMONERSBYNAME_QUERY = gql`
  query getSummonersByName($summonerNames: [String]) {
    getSummonersByName(summonerNames: $summonerNames) {
      accountId
      puuid
      id
      name
    }
  }
`;

export const GETSUMMONER_QUERY = gql`
  query getSummoner($summonerName: String!) {
    getSummoner(summonerName: $summonerName) {
      profileIcon
      puuid
      id
      name
    }
  }
`;

export const GETRECENTMATCHES_QUERY = gql`
  query getRecentMatches($puuids: [String], $take: Int) {
    getRecentMatches(puuids: $puuids, take: $take) {
      championImg
      matchId
      win
      kills
      deaths
      assist
    }
  }
`;

export const GETFULLRECENTMATCHES_QUERY = gql`
  query getFullRecentMatches($puuid: String, $take: Int, $cursor: String) {
    getFullRecentMatches(puuid: $puuid, take: $take, cursor: $cursor) {
      participants {
        championImg
        win
        kills
        deaths
        assist
      }
      championImg
      win
      kills
      deaths
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

export const UPDATEIDS_MUTATION = gql`
  mutation updateIds($summonerNames: [String]) {
    updateIds(summonerNames: $summonerNames)
  }
`;
