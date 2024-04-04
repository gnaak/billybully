import { useCallback, useState } from "react";

const useModal = (): [
  boolean,
  () => void,
  () => void,
  boolean,
  () => void,
  () => void,
  boolean,
  () => void,
  () => void,
  boolean,
  () => void,
  () => void,
  boolean,
  () => void,
  () => void,
  boolean,
  () => void,
  () => void,
  boolean,
  () => void,
  () => void,
  boolean,
  () => void,
  () => void,
  boolean,
  () => void,
  () => void,
    boolean,
  () => void,
  () => void
] => {
  const [isOpenSituation, setIsOpenSituation] = useState(false);
  const [isOpenAssets, setIsOpenAssets] = useState(false);
  const [isOpenIssue, setIsOpenIssue] = useState(false);
  const [isOpenSellAssets, setIsOpenSellAssets] = useState(false);
  const [isOpenHalf, setIsOpenHalf] = useState(false);
  const [isOpenDouble, setIsOpenDouble] = useState(false);
  const [isOpenStart, setIsOpenStart] = useState(false);
  const [isOpenLoan, setIsOpenLoan] = useState(false);
  const [isOpenRepayment, setIsOpenRepayment] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false)
  const openRepayment = useCallback(() => {
    setIsOpenRepayment(true);
  }, []);
  const closeRepayment = useCallback(() => {
    setIsOpenLoan(false);
  }, []);
  const openEnd = useCallback(() => {
    setIsOpenEnd(true);
  }, []);
  const closeEnd = useCallback(() => {
    setIsOpenEnd(false);
  }, []);
  const openLoan = useCallback(() => {
    setIsOpenLoan(true);
  }, []);
  const closeLoan = useCallback(() => {
    setIsOpenLoan(false);
  }, []);
  const openStart = useCallback(() => {
    setIsOpenStart(true);
  }, []);
  const closeStart = useCallback(() => {
    setIsOpenStart(false);
  }, []);
  const openSituaion = useCallback(() => {
    setIsOpenSituation(true);
  }, []);
  const openAssets = useCallback(() => {
    setIsOpenAssets(true);
  }, []);
  const openSellAssets = useCallback(() => {
    setIsOpenSellAssets(true);
  }, []);
  const openIssue = useCallback(() => {
    setIsOpenIssue(true);
  }, []);
  const openHalf = useCallback(() => {
    setIsOpenHalf(true);
  }, []);
  const openDouble = useCallback(() => {
    setIsOpenDouble(true);
  }, []);

  const closeSituaion = useCallback(() => {
    setIsOpenSituation(false);
  }, []);
  const closeAssets = useCallback(() => {
    setIsOpenAssets(false);
  }, []);
  const closeSellAssets = useCallback(() => {
    setIsOpenSellAssets(false);
  }, []);
  const closeIssue = useCallback(() => {
    setIsOpenIssue(false);
  }, []);

  const closeHalf = useCallback(() => {
    setIsOpenHalf(false);
  }, []);
  const closeDouble = useCallback(() => {
    setIsOpenDouble(false);
  }, []);

  return [
    isOpenSituation,
    openSituaion,
    closeSituaion,
    isOpenAssets,
    openAssets,
    closeAssets,
    isOpenIssue,
    openIssue,
    closeIssue,
    isOpenSellAssets,
    openSellAssets,
    closeSellAssets,
    isOpenHalf,
    openHalf,
    closeHalf,
    isOpenDouble,
    openDouble,
    closeDouble,
    isOpenStart,
    openStart,
    closeStart,
    isOpenLoan,
    openLoan,
    closeLoan,
    isOpenRepayment,
    openRepayment,
    closeRepayment,
    isOpenEnd,
    openEnd,
    closeEnd
  ];
};

export default useModal;
