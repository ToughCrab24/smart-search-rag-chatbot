(function () {
  const scriptUrl = new URL(document.currentScript.src);
  const baseUrl = `${scriptUrl.protocol}//${scriptUrl.host}`;

  function createChatIcon() {
    var chatIcon = document.createElement("div");
    chatIcon.id = "chat-icon";
    chatIcon.innerHTML = "Chat";
    chatIcon.addEventListener("click", function (event) {
      event.stopPropagation();
      toggleChatIframe();
    });

    document.body.appendChild(chatIcon);
  }

  function toggleChatIframe() {
    var iframe = document.getElementById("chat-iframe");
    iframe.classList.toggle("hidden");
  }

  function renderChatIframe() {
    iframe = document.createElement("iframe");
    iframe.id = "chat-iframe";
    iframe.src = baseUrl; // Replace with your chat URL
    iframe.classList.add("hidden");
    document.body.appendChild(iframe);
  }

  function loadCss() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `${baseUrl}/embed.css`;

    document.head.appendChild(link);
  }

  function handleClose() {
    document.addEventListener("click", function () {
      var iframe = document.getElementById("chat-iframe");
      if (iframe.classList.contains("hidden")) return;
      iframe.classList.add("hidden");
    });
  }

  loadCss();
  renderChatIframe();
  createChatIcon();
  handleClose();
})();
