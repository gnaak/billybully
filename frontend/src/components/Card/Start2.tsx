/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import exit from "@/assets/exit.png";
import useStore from "@/store";
import calendar from "@/assets/calendar.png";
interface AssetProps {
  close: () => void;
}

const Start2 = ({ close }: AssetProps) => {
  const { setActionName, setCardId, setSalary } = useStore();
  const situationStyle = css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: solid #f8c56a 1px;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    color: white;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  `;

  const coloredArea = css`
    width: 50%;
    height: 60%;
    // background-color: #f8c56a;
    background-color: rgba(255, 255, 255, 0.5);
    border: solid #f8c56a 1px;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
  `;

  const salary = css`
    width: 65%;
    height: 70%;
    background-color: #f8c56a;
    border: solid white 4px;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    font-size: 1.2vw;
    justify-content: center;
    align-items: center;
    //align-content: center;
    gap: 20px;
  `;
  const calendarArea = css`
    width: 70%;
    display: flex;
    justify-content: center;
    //align-items: center;
  `;
  const calendarImg = css`
    width: 21%;
  `;
  const word = css`
    font-size: 1.3vw;
    display: flex;
    flex-direction: column;
    margin: 5%;
    height: 22%;
    color: black;
    align-items: center;
  `;
  const exitButton = css`
    position: absolute;
    top: 3%;
    left: 93%;
    cursor: pointer;
  `;
  return (
    <div css={situationStyle}>
      <div css={coloredArea}>
        <img
          src={exit}
          alt="종료하기"
          css={exitButton}
          onClick={() => {
            close();
            setSalary(true);
            setActionName("START");
            setCardId(0);
          }}
        />
        <div css={salary}>
          <div css={calendarArea}>
            <img src={calendar} alt="달력" css={calendarImg} />
          </div>
          <div css={word}>
            <div>한 달이 지났습니다!</div>
            <br />
            <div>월급, 재테크 수입을 받고</div>
            <div>대출이자를 지불합니다.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start2;
