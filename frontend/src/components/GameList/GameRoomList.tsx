/** @jsxImportSource @emotion/react */  
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { css } from '@emotion/react'; 
import Grid from "@mui/material/Grid"; 
import GameRoom from "./GameRoom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

interface Room { 
  roomName: string;
  maxParticipants: number;
  numParticipants: number;
  hasPassword: boolean;
  masterNickname: string;
}

export default function GameRoomList({ roomList }: { roomList: any[] }) {   
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [displayedRooms, setDisplayedRooms] = useState<Room[]>([]);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  // 전체 페이지 수 계산
  useEffect(() => {
    setTotalPage(Math.ceil(roomList.length / 6));
  }, [roomList]);

  // 현재 페이지에 따라 방 목록 업데이트
  useEffect(() => {
    const startIndex = (currentPage - 1) * 6;
    const endIndex = Math.min(startIndex + 6, roomList.length);
    setDisplayedRooms(roomList.slice(startIndex, endIndex));
  }, [currentPage, roomList]);

  // 페이지 변경 시 현재 페이지 업데이트
  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  // 페이지 변경 핸들러
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div css={container}>
      <Grid container spacing={2}> 
        {displayedRooms.map((room) => (
          <Grid item xs={6} key={room.roomName}>
            <GameRoom room={room} />
          </Grid>
        ))}
      </Grid>
      <Pagination css={paginationContainer}
        page={currentPage}
        count={totalPage}
        size="large"
        variant="outlined" 
        onChange={handlePageChange}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/lobby/${item.page === 1 ? "" : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
    </div>
  );
}

const container = css` 
  width: 700px;
  height: 55vh; 
  margin: 0% auto 5% auto;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 20px;
  padding: 3%;
  padding-bottom: 2%;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const paginationContainer = css`  
  width: 100%;
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 40px;  
  left: 50%;
  transform: translateX(-50%);
`;
