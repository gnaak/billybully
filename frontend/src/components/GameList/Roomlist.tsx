/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Room from "@components/GameList/Room";
import useStore from "@/store";
import useModal from "@/hooks/useModal";
import PassWord from "./PassWord";
import { useMutation } from "react-query";
import axios, { AxiosResponse } from "axios";

interface roomListDataProps {
  id: number | null;
  name: string | null;
  maxParticipants: number | null;
  numParticipants: number | null;
  password: number | null;
  masterId: string | null;
  masterName: string | null;
  gameStarted: boolean | null;
  players: number | null;
}

const Roomlist = () => {
  const { setRoomNumber, setPassword, roomListData, setRoomListData } =
    useStore();
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const [isOpenSituation, openSituation, closeSituation] = useModal();

  useEffect(() => {
    const fetchRoomList = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_PUBLIC_BASE_URL}/room/list`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();

        // players 0 제거
        const filteredData = data.roomList.filter(
          (room: roomListDataProps) => room.players !== 0
        );
        setRoomListData({ roomList: filteredData });
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };

    if (accessToken) {
      fetchRoomList();
    }
  }, [accessToken]);

  setTimeout(() => {
    const fetchRoomList = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_APP_PUBLIC_BASE_URL}/room/list`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();

        // players 0 제거
        const filteredData = data.roomList.filter(
          (room: roomListDataProps) => room.players !== 0
        );
        setRoomListData({ roomList: filteredData });
      } catch (error) {
        console.error("Error fetching room list:", error);
      }
    };
    if (accessToken) {
      fetchRoomList();
    }
  }, 500);

  // 방 입장(비밀번호)
  const mutation = useMutation(
    async (data: { id: string; password: string | null }) => {
      console.log("입장 : id : " + data.id + " pw : " + data.password);
      let roomData = null;
      try {
        // !accessToken 예외처리!! (로그인 화면으로?)
        // await checkAccessTokenExpiration();

        const response: AxiosResponse = await axios.post(
          import.meta.env.VITE_APP_PUBLIC_BASE_URL + "/room/enter",
          {
            id: data.id,
            password: data.password,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        roomData = response.data;
        navigate(`/waiting/${roomData.id}`, { state: { roomData } });

        console.log("roomData: " + response.data);
        console.log("방참여?" + JSON.stringify(roomData, null, 2));
      } catch (error) {
        console.error("Error while creating room:", error);
        return;
      }
    }
  );

  const handleEnterRoom = async (
    roomData: roomListDataProps
  ): Promise<void> => {
    if (roomData.id !== null) {
      setRoomNumber(roomData.id);
      setPassword(
        roomData.password !== null ? roomData.password.toString() : null
      );
    }
    if (roomData.id) {
      if (roomData.password) {
        openSituation();
      } else {
        await mutation.mutateAsync({
          id: roomData.id.toString(),
          password:
            roomData.password !== null ? roomData.password.toString() : null,
        });
      }
    }
  };

  const roomsPerPage = 6;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (roomListData) {
      const lastPage = Math.ceil(roomListData.roomList.length / roomsPerPage);
      if (currentPage < lastPage) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const idxOfLastPage = roomListData?.roomList ? currentPage * roomsPerPage : 0;
  const idxOfFirstPage = roomListData?.roomList
    ? idxOfLastPage - roomsPerPage
    : 0;
  const currentPages = roomListData?.roomList
    ? roomListData.roomList.slice(idxOfFirstPage, idxOfLastPage)
    : [];
  const emptyRoomCount = roomListData?.roomList
    ? roomsPerPage - currentPages?.length
    : 0;
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = roomListData?.roomList
    ? currentPage === Math.ceil(roomListData.roomList.length / roomsPerPage)
    : true;

  return (
    <>
      <div css={roomlistStyle}>
        {/*<div css={roomlistbox}>*/}
        {/*  <div css={roomlist}>방 목록</div>*/}
        {/*</div>*/}
        <div css={roomStyle}>
          {roomListData?.roomList ? (
            <>
              {currentPages.map((roomData: roomListDataProps) => (
                <div
                  key={roomData.id}
                  css={room}
                  onClick={() => {
                    if (roomData.id !== null) {
                      console.log("하이 : " + roomData.id);
                      setRoomNumber(roomData.id);
                      setPassword(null);
                    }
                    if (roomData.id) {
                      if (roomData.password) {
                        openSituation();
                      } else {
                        navigate(`/waiting/${roomData.id}`);
                        handleEnterRoom(roomData);
                      }
                    }
                  }}
                >
                  <Room
                    key={roomData.id}
                    roomId={roomData.id}
                    roomName={roomData.name}
                    numParticipants={roomData.players}
                    hasPassword={roomData.password}
                    masterNickname={roomData.name}
                    masterName={roomData.masterName}
                  />
                </div>
              ))}
              {Array.from({ length: emptyRoomCount }).map((_, index) => (
                <div key={`empty-${index}`} css={room} />
              ))}
            </>
          ) : null}
        </div>
        <div css={outerbox}>
          <div css={paginationBox}>
            <div
              css={[
                prev,
                {
                  cursor: isPrevDisabled ? "not-allowed" : "pointer",
                  // opacity: isPrevDisabled ? 0.5 : 1,
                  backgroundColor: "#A2CED6", // 배경 색상 추가
                  margin: "5px 10px", // 내부 여백 추가
                  borderRadius: "10px", // 테두리 모서리 둥글게 만들기
                  border: "1px solid black", // 테두리 스타일 및 색상 설정
                  color: "white",
                  position: "relative", // 요소의 위치를 설정하기 위해 position 속성 추가
                  overflow: "hidden", // 테두리가 요소를 벗어나지 않도록 설정
                  width: "10%",
                  height: "70%",
                },
              ]}
              onClick={handlePrevPage}
            >
              <span
                css={{
                  textShadow: "1px 1px 1px black", // 텍스트 테두리 효과 추가
                  fontSize: "1vw;",
                  position: "absolute", // 텍스트 위치를 조정하기 위해 position 속성 추가
                  top: "50%", // 요소의 세로 중앙으로 이동
                  left: "50%", // 요소의 가로 중앙으로 이동
                  transform: "translate(-55%, -55%)", // 요소의 중앙으로 이동
                }}
              >
                이전
              </span>
            </div>
            <div css={pageNo}>{currentPage}</div>
            <div
              css={[
                next,
                {
                  cursor: isNextDisabled ? "not-allowed" : "pointer",
                  // opacity: isNextDisabled ? 0.5 : 1,
                  backgroundColor: "#A2CED6", // 배경 색상 추가
                  margin: "5px 10px", // 내부 여백 추가
                  borderRadius: "10px", // 테두리 모서리 둥글게 만들기
                  border: "1px solid black", // 테두리 스타일 및 색상 설정
                  color: "white",
                  position: "relative", // 요소의 위치를 설정하기 위해 position 속성 추가
                  overflow: "hidden", // 테두리가 요소를 벗어나지 않도록 설정
                  width: "10%",
                  height: "70%",
                },
              ]}
              onClick={handleNextPage}
            >
              <span
                css={{
                  textShadow: "1px 1px 1px black", // 텍스트 테두리 효과 추가
                  fontSize: "1vw;",
                  position: "absolute", // 텍스트 위치를 조정하기 위해 position 속성 추가
                  top: "50%", // 요소의 세로 중앙으로 이동
                  left: "50%", // 요소의 가로 중앙으로 이동
                  transform: "translate(-55%, -55%)", // 요소의 중앙으로 이동
                }}
              >
                다음
              </span>
            </div>
          </div>
        </div>
      </div>
      {isOpenSituation ? <PassWord close={closeSituation}></PassWord> : null}
    </>
  );
};

export default Roomlist;

const roomlistStyle = css`
  width: 70%;
  height: 60%;
  display: flex;

  flex-direction: column;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
`;

const roomStyle = css`
  height: 80%;
  width: 65%;
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  background-color: #ffe08f;
  justify-content: center;
  align-items: center;
  font-size: 1.2vw;
  font-weight: bold;
  border: black solid 1px;
  border-radius: 20px;
  flex-direction: row;
  flex-wrap: wrap;
`;
const paginationBox = css`
  height: 100%;
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-weight: bold;
  font-size: 1.1vw;
  text-shadow: 1px 1px 0px black; /* 테두리 효과 */
`;

const prev = css`
  width: 33%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
const pageNo = css`
  width: 33%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 1.2vw;
`;
const next = css`
  width: 33%;
  height: 100%;
  display: flex;
  justify-content: end;
  cursor: pointer;
  align-items: center;
`;
const room = css`
  height: 29%;
  width: 46%;
  background-color: white;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  color: white;
  border: black solid 1px;
  margin-left: 10px;
  margin-right: 10px;

  text-decoration: none;
`;
const outerbox = css`
  height: 10%;
  width: 90%;
  display: flex;
  font-size: 0.9vw;
  font-weight: bold;
  justify-content: space-evenly;
  align-items: center;
`;
