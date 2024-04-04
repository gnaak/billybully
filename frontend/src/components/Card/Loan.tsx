/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import exit from "@/assets/exit.png";
import { ChangeEvent, useState } from "react";
import { useMutation } from "react-query";
import useStore from "@/store";
import useModal from "@/hooks/useModal";

const baseUrl = import.meta.env.VITE_APP_PUBLIC_BASE_URL;
const accessToken = localStorage.getItem("accessToken");

interface CreateRoomProps {
  close: () => void;
}

const Loan = ({ close }: CreateRoomProps) => {
  const [isOpenAssets, openAssets, closeAssets] = useModal();
  const [isOpenSituation, openSituation, closeSituation] = useModal();
  const [inputValue, setInputValue] = useState("200000000");
  const { totalAsset, privateAsset, setPrivateAsset } = useStore();

  const getLoan = useMutation(async () => {
    const response = await fetch(`${baseUrl}/game/loan/${inputValue}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return response.json();
  });

  const getLoanAction = async () => {
    try {
      const data = await getLoan.mutateAsync();
      setPrivateAsset(data);
    } catch (error) {
      console.log("error");
    }
  };

  const handleInputClick = () => {
    setInputValue("");
  };
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value);

    if (!isNaN(inputValue)) {
      setInputValue(e.target.value);
    } else {
      setInputValue(""); // 입력값이 유효하지 않은 경우, 입력값을 지움
    }
  };

  const handleLoan = () => {
    console.log("privateAsset", privateAsset);
    console.log("totalAsset", totalAsset);
    const loanAmount = parseInt(inputValue);

    if (isNaN(loanAmount) || loanAmount <= 0) {
      openAssets();
      return;
    }

    if (privateAsset && privateAsset.loan + loanAmount > 200000000) {
      openSituation();
      return;
    }

    // 대출 요청 보내기
    getLoanAction();
    close();
  };

  const backGround = css`
    position: absolute;
    top: 30%;
    left: 30%;
    background-color: white;
    border-radius: 20px;
    height: 40%;
    width: 40%;
    padding: 10px;
    border: 1px solid black;
  `;

  const coloredArea = css`
    display: flex;
    flex-direction: column;
    background-color: #f8c56a;
    height: 100%;
    width: 100%;
    border-radius: 20px;
    gap: 50px;
    align-items: center;
  `;

  const exitButton = css`
    position: absolute;
    top: 5%;
    left: 92%;
    cursor: pointer;
  `;

  const roomAsset = css`
    margin-top: 15%;
    height: 20%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  `;
  const roomAsset2 = css`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const roomcreate = css`
    height: 100%;
    width: 50%;
    background-color: white;
    border-radius: 20px;
    color: #f8c56a;
    font-size: 1.2vw;
    font-weight: bold;
    justify-content: center;
    align-items: center;
    display: flex;
    text-align: center;
  `;

  const createRoom = css`
    height: 20%;
    width: 30%;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #f8c56a;
    font-size: 1.2vw;
    font-weight: bold;
    border-radius: 20px;
    cursor: pointer;
    border: 1px solid black;
    text-decoration: none;
  `;

  const alertStyle = css`
    position: absolute;
    top: 85%;
    left: 30%;
    font-size: 1.5rem;
    font-weight: bold;
    color: red;
  `;

  return (
    <div css={backGround}>
      <div css={coloredArea}>
        <img src={exit} alt="종료하기" css={exitButton} onClick={close} />
        <div css={roomAsset}>
          <div css={roomAsset2}>
            <input
              id="roomName"
              type="text"
              value={inputValue}
              placeholder="대출금액을 입력하세요"
              onClick={handleInputClick}
              onChange={handleInputChange}
              css={roomcreate}
            />
          </div>
        </div>
        <button css={createRoom} onClick={() => handleLoan()}>
          대출 받기
        </button>
      </div>
      {isOpenSituation ? (
        <div css={alertStyle} onClick={closeSituation}>
          대출 한도를 초과했습니다
        </div>
      ) : null}
      {isOpenAssets ? (
        <div css={alertStyle} onClick={closeAssets}>
          유효한 값을 입력해주세요{" "}
        </div>
      ) : null}
    </div>
  );
};

export default Loan;
