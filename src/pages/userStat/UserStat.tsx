// src/components/UserStats.tsx
import React from "react";
import { Card, Avatar, Typography, Row, Col, Divider, Tag, Progress } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";
import ChampionCard from "../../components/championCard/ChampionCard";

const { Title, Text } = Typography;

const Container = styled.div`
  padding: 16px;
  font-family: 'Pretendard-Regular';

  @media (min-width: 768px) {
    max-width: 600px;
    margin: 0 auto;
  }
`;

const StatsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const MatchHistory = styled(Row)`
  margin-top: 16px;
`;

const MatchCard = styled(Card)`
  width: 100%;
  margin-bottom: 16px;
`;

// const KDA = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

const UserStats: React.FC = () => {
  return (
    <Container>
      <StatsHeader>
        <Title level={4}>소환사명: <Text strong>슬좋아함</Text></Title>
        <Avatar size={64} icon={<UserOutlined />} />
      </StatsHeader>

      <Card>
        <Row justify="space-between" align="middle">
          <Col>
            <ChampionCard name='Ahri'/>
          </Col>
          <Col>
            <Text strong>12전 4승 8패</Text>
            <Progress percent={33} status="active" />
          </Col>
          <Col>
            <Text strong>1.90 KDA</Text>
            <Text>2.5 / 6.5 / 9.8</Text>
          </Col>
        </Row>
      </Card>

      <Divider />

      <Title level={5}>모스트 3 챔피언</Title>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ChampionCard name='Ahri'/>
        </Col>
        <Col span={8}>
          <ChampionCard name='Ahri'/>
        </Col>
        <Col span={8}>
          <ChampionCard name='Ahri'/>
        </Col>
      </Row>

      <Divider />

      <MatchHistory gutter={[16, 16]}>
        <Col span={24}>
          <MatchCard>
            <Row justify="space-between">
              <Col>
                <Text strong>패배</Text>
                <Tag color="red">2/4/6</Tag>
              </Col>
              <Col>
                <Text>0.8 인분</Text>
              </Col>
              <Col>
                <Text>27:09</Text>
              </Col>
            </Row>
          </MatchCard>
        </Col>
        <Col span={24}>
          <MatchCard>
            <Row justify="space-between">
              <Col>
                <Text strong>승리</Text>
                <Tag color="green">2/3/9</Tag>
              </Col>
              <Col>
                <Text>1.1 인분</Text>
              </Col>
              <Col>
                <Text>20:56</Text>
              </Col>
            </Row>
          </MatchCard>
        </Col>
      </MatchHistory>
    </Container>
  );
};

export default UserStats;