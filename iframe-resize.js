(() => {
  let last = 0;

  function sendHeight() {
    const h = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );

    if (!h || Math.abs(h - last) < 4) return;
    last = h;

    window.parent.postMessage(
      { type: "yae:resize", height: h },
      "*"
    );
  }

  window.addEventListener("load", () => {
    sendHeight();
    setTimeout(sendHeight, 300);
    setTimeout(sendHeight, 800);
  });

  window.addEventListener("resize", () => {
    setTimeout(sendHeight, 150);
  });
})();
