const getPlayer = () => {
  const videoPlayer =
    netflix?.appContext?.state?.playerApp?.getAPI()?.videoPlayer;
  if (!videoPlayer) return null;

  const sessionId = videoPlayer.getAllPlayerSessionIds()?.[0];
  if (!sessionId) return null;

  return videoPlayer.getVideoPlayerBySessionId(sessionId);
};

document.addEventListener(
  "keydown",
  (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;

    const player = getPlayer();
    if (!player) return;

    e.stopImmediatePropagation();
    e.preventDefault();

    const currentTime = player.getCurrentTime();
    const seekAmount = e.key === "ArrowLeft" ? -5000 : 5000;
    player.seek(currentTime + seekAmount);
  },
  true
);
