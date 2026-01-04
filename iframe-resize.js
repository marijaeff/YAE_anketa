let lastHeight = 0;

function sendHeight() {
  const body = document.body;
  const html = document.documentElement;

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  if (Math.abs(height - lastHeight) < 4) return;
  lastHeight = height;

  window.parent.postMessage(
    { type: "yae:resize", height },
    "*"
  );
}

window.addEventListener("load", () => {
  sendHeight();
  setTimeout(sendHeight, 300);
  setTimeout(sendHeight, 800);
  setTimeout(sendHeight, 1500);
});

window.addEventListener("resize", () => {
  setTimeout(sendHeight, 200);
});

new MutationObserver(() => {
  setTimeout(sendHeight, 100);
}).observe(document.body, {
  childList: true,
  subtree: true,
});
