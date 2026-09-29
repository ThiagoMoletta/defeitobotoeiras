const videos = [
  { numero: 1,  titulo: "Vídeo 01", descricao: "Descrição do vídeo 01", url: "" },
  { numero: 2,  titulo: "Vídeo 02", descricao: "Descrição do vídeo 02", url: "" },
  { numero: 3,  titulo: "Vídeo 03", descricao: "Descrição do vídeo 03", url: "" },
  { numero: 4,  titulo: "Vídeo 04", descricao: "Descrição do vídeo 04", url: "" },
  { numero: 5,  titulo: "Vídeo 05", descricao: "Descrição do vídeo 05", url: "" },
  { numero: 6,  titulo: "Vídeo 06", descricao: "Descrição do vídeo 06", url: "" },
  { numero: 7,  titulo: "Vídeo 07", descricao: "Descrição do vídeo 07", url: "" },
  { numero: 8,  titulo: "Vídeo 08", descricao: "Descrição do vídeo 08", url: "" },
  { numero: 9,  titulo: "Vídeo 09", descricao: "Descrição do vídeo 09", url: "" },
  { numero: 10, titulo: "Vídeo 10", descricao: "Descrição do vídeo 10", url: "" },
  { numero: 11, titulo: "Vídeo 11", descricao: "Descrição do vídeo 11", url: "" },
  { numero: 12, titulo: "Vídeo 12", descricao: "Descrição do vídeo 12", url: "" },
  { numero: 13, titulo: "Vídeo 13", descricao: "Descrição do vídeo 13", url: "" },
  { numero: 14, titulo: "Vídeo 14", descricao: "Descrição do vídeo 14", url: "" },
  { numero: 15, titulo: "Vídeo 15", descricao: "Descrição do vídeo 15", url: "" },
  { numero: 16, titulo: "Vídeo 16", descricao: "Descrição do vídeo 16", url: "" },
  { numero: 17, titulo: "Vídeo 17", descricao: "Descrição do vídeo 17", url: "" },
  { numero: 18, titulo: "Vídeo 18", descricao: "Descrição do vídeo 18", url: "" }
];

const grade = document.getElementById("grade-videos");
const pesquisa = document.getElementById("pesquisa");
const contador = document.getElementById("contador");
const semResultados = document.getElementById("sem-resultados");

const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modal-titulo");
const modalVideo = document.getElementById("modal-video");
const botaoFechar = document.getElementById("botao-fechar");
const fecharModal = document.getElementById("fechar-modal");

function escapar(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function criarCard(video) {
  const card = document.createElement("article");
  card.className = "card";

  const url = video.url ? escapar(video.url) : "";

  card.innerHTML = `
    <div class="video-wrapper" data-numero="${video.numero}">
      <span class="numero">#${video.numero}</span>
      ${
        url
          ? `<video controls preload="metadata" src="${url}"></video>`
          : `<div style="height:100%;display:grid;place-items:center;color:#777;">URL do vídeo não cadastrada</div>`
      }
    </div>

    <div class="card-info">
      <h2>${escapar(video.titulo)}</h2>
      <p>${escapar(video.descricao)}</p>
      <button class="botao-abrir" type="button" data-numero="${video.numero}">
        Abrir em tela maior
      </button>
    </div>
  `;

  card.querySelector(".botao-abrir").addEventListener("click", () => abrirModal(video));

  const wrapper = card.querySelector(".video-wrapper");
  wrapper.addEventListener("click", (event) => {
    if (event.target.tagName !== "VIDEO" && video.url) abrirModal(video);
  });

  return card;
}

function renderizar(lista) {
  grade.innerHTML = "";

  lista.forEach(video => {
    grade.appendChild(criarCard(video));
  });

  contador.textContent = `${lista.length} vídeo${lista.length === 1 ? "" : "s"}`;
  semResultados.hidden = lista.length !== 0;
}

function abrirModal(video) {
  if (!video.url) {
    alert("Cadastre a URL do Vercel Blob deste vídeo no arquivo videos.js.");
    return;
  }

  modalTitulo.textContent = video.titulo;
  modalVideo.src = video.url;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function fechar() {
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
  modal.hidden = true;
  document.body.style.overflow = "";
}

pesquisa.addEventListener("input", () => {
  const termo = pesquisa.value.trim().toLowerCase();

  const filtrados = videos.filter(video =>
    video.titulo.toLowerCase().includes(termo) ||
    video.descricao.toLowerCase().includes(termo) ||
    String(video.numero).includes(termo)
  );

  renderizar(filtrados);
});

botaoFechar.addEventListener("click", fechar);
fecharModal.addEventListener("click", fechar);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !modal.hidden) fechar();
});

renderizar(videos);
