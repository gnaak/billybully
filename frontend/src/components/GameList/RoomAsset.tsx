/* eslint-disable react-hooks/exhaustive-deps */
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

// import { useQuery } from "react-query";
import RoomList from "@components/GameList/Roomlist";
import Friendlist from "./Friendlist";
// import { useMutation } from "react-query";

const RoomAsset = () => {
  const container = css`
   
    width: 100%;
    height: 85%;
  `;
  const listcontainer = css`
    flex-direction: row;
    display: flex;
    width: 100%;
    height: 100%;
  `;

  return (
    <div css={container}>
      <div css={listcontainer}>
        <RoomList />
        <Friendlist />
      </div>
    </div>
  );
};

export default RoomAsset;
