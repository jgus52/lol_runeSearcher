import RowContainer from "./RowContainer";
import styled from "styled-components";

const Container = styled.div`
  width: ${(props) => props.full ? "100px"  : "80px"};
  height: ${(props) => props.full ? "40px" : "25px"};
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.forName ? "flex-start" : "center"};
`;
const WinLose = styled.div`
  width: ${(props) => props.full ? "50px"  : "40px"};
  height: ${(props) => props.full ? "40px" : "25px"};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Text = styled.p`
  margin: 3px;
  font-size: ${(props) => props.full ? "15px" : "12px"};
`;

const ChampInfos = ({ summoner, champs, full }) =>{
  return champs.map((champObj) => {
    return (
      <RowContainer
        justifyContent="flex-start"
        alignItems="cetner"
        width={full ? "320px" : "265px"}
        key={summoner.id + champObj.id}
        style={{
          backgroundColor: "lightGrey",
          borderBottom: "1px solid",
        }}
      >
        <img src={champObj.championImg} style={full ? { width: 40, height: 40 } : { width: 25, height: 25 }}></img>
        <Container full={full} forName={true}>
          <Text full={full}>
            {champObj.championName}
          </Text>
        </Container>
        <WinLose full={full}>
          <Text full={full}>
            {champObj.win + "W"}
          </Text>
        </WinLose>
        <WinLose full={full}>
          <Text full={full}>
            {champObj.lose + "L"}
          </Text>
        </WinLose>
        <Container full={full} last={true}>
          <Text full={full}>
            {`${(champObj.kill / (champObj.win + champObj.lose)).toFixed(1)}/${(
              champObj.death /
              (champObj.win + champObj.lose)
            ).toFixed(1)}/${(
              champObj.assist /
              (champObj.win + champObj.lose)
            ).toFixed(1)}`}
          </Text>
        </Container>
      </RowContainer>
    );
  });
  }

export default ChampInfos;
