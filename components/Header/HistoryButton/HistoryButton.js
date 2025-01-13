import createHistoryButton from "./ui/createHistoryButton.js";

const HistoryButton = () => {
  const handleClickHistory = (e) => {
    const $history = e.currentTarget.nextSibling;
    $history.classList.toggle("fade-in");
  };

  const $historyButton = createHistoryButton({ handleClickHistory });
  return $historyButton;
};

export default HistoryButton;
