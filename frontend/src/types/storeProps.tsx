interface fintechProps {
  fintechId: number;
  type: string;
  name: string;
  buyPrice: number;
  sellPrice: number;
  income: number;
}

interface privateAssetProps {
  memberId: number;
  memberName: string;
  memberProfile : string;
  cash: number;
  loan: number;
  fintechList: fintechProps[];
}

interface totalAssetProps {
  myProperty: privateAssetProps;
  propertyList: privateAssetProps[];
}

interface fintechCard {
  fintechId: number;
  type: string;
  name: string;
  buyPrice: number | null;
  sellPrice: number | null;
  income: number;
}


interface fintechDataProps {
  cardList: fintechCard[];
}

interface issueDataProps {
  description: string | null;
  issueId: number | null;
  name: string | null;
}

interface situationProps {
  id: number;
  name: string;
  story: string;
}
interface situationprop {
  situations: situationProps[];
}
interface RoomListData {
  roomList: roomListDataProps[];
}

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


interface RootState {
  characterLocation: number;
  setCharacterLocation: (characterLocation: number) => void;
  playerToRoll: number;
  setPlayerToRoll: (playerToRoll: number) => void;
  turn: number;
  setTurn: (turn: number) => void;
  roomListData: RoomListData | null;
  setRoomListData: (roomListData: RoomListData | null) => void;
  password: string | null;
  setPassword: (password: string | null) => void;
  roomTotalNum: number | null;
  setRoomTotalNum: (roomTotalNum: number) => void;
  roomnumber: number | null; // 로비에서 대기실로 이동할 때 roomId 전달
  setRoomNumber: (roomnumber: number) => void;
  fintechData: fintechDataProps | null;
  setFintechData: (fintechData: fintechDataProps) => void;
  destination: number | null;
  setDestination: (destination: number) => void;
  salary: boolean;
  setSalary: (salary: boolean) => void;
  actionName: string | null; // 액션 이름
  setActionName: (actionName: string) => void;
  actionFeatureName: string | null;
  setActionFeatureName: (actionFeatureName: string) => void;
  privateAsset: privateAssetProps | null;
  setPrivateAsset: (privateAsset: privateAssetProps) => void;
  totalAsset: totalAssetProps | null;
  setTotalAsset: (totalAsse: totalAssetProps) => void;
  issueData: issueDataProps | null;
  setIssueData: (issueData: issueDataProps) => void;
  cardId: number | null;
  setCardId: (cardId: number | null) => void;
  situationCard: situationprop | null;
  setSituationCard: (situationCard: situationprop) => void;
  situationId: number | null;
  setSituationCardId: (situationId: number | null) => void;
  fintechId: number | null;
  setFintectId: (fintechId: number | null) => void;
  winnerID: number | null;
  setWinnerID: (winnerID: number | null) => void;
}

export default RootState;
