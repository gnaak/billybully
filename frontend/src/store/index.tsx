import { create } from "zustand";
import RootState from "@/types/storeProps";

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
  masterName : string|null;
  gameStarted: boolean | null;
  players: number | null;
}



const useStore = create<RootState>((set) => ({
  characterLocation: 0,
  setCharacterLocation: (characterLocation: number) =>
    set({ characterLocation }),
  playerToRoll: 0,
  setPlayerToRoll: (playerToRoll: number) => set({ playerToRoll }),
  turn: 0,
  setTurn: (turn: number) => set({ turn }),
  roomListData: null,
  setRoomListData: (roomListData: RoomListData | null) => set({ roomListData }),
  password: null,
  setPassword: (password) => set({ password }),
  roomTotalNum: null,
  setRoomTotalNum: (roomTotalNum) => set({ roomTotalNum }),
  roomnumber: null,
  setRoomNumber: (roomnumber: number | null) => set({ roomnumber }),
  fintechData: null,
  setFintechData: (fintechData: fintechDataProps | null) =>
    set({ fintechData }),
  destination: null,
  setDestination: (destination) => set({ destination }),
  salary: false,
  setSalary: (salary) => set({ salary }),
  actionName: null,
  setActionName: (actionName) => set({ actionName }),
  actionFeatureName: null,
  setActionFeatureName: (actionFeatureName) => set({ actionFeatureName }),
  privateAsset: null,
  setPrivateAsset: (privateAsset) =>
    set({
      privateAsset,
    }),
  totalAsset: null,
  setTotalAsset: (totalAsset) => set({ totalAsset }),
  issueData: null,
  setIssueData: (issueData) => set({ issueData }),
  cardId: null,
  setCardId: (cardId) => set({ cardId }),
  situationCard: null,
  setSituationCard: (situationCard: situationprop) => set({ situationCard }),
  situationId: null,
  setSituationCardId: (situationId) => set({ situationId }),
  fintechId: null,
  setFintectId: (fintechId) => set({ fintechId }),
  winnerID: null,
  setWinnerID: (winnerID) => set({ winnerID }),
}));

export default useStore;
