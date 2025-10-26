var dem = 0;
var a = 0;
var nhac = null;

var playlist = [
  "music/baihat1.mp3",
  "music/baihat2.mp3",
  "music/baihat3.mp3",
  "music/baihat4.mp3",
  "music/baihat5.mp3"
];

const seek = document.getElementById("seek");

function chaynhac() {
  if (nhac) {
    if (!nhac.paused) {
      nhac.pause();
      document.getElementsByClassName("bt")[1].textContent = "◀";
    } else {
      nhac.play();
      document.getElementsByClassName("bt")[1].textContent = "⏸";
    }
    return;
  }
  taoNhac(playlist[a]);
}

function taoNhac(duongdan) {
  nhac = new Audio(duongdan);
  document.getElementsByClassName("bt")[1].textContent = "⏸";
  thumbnail();
  nhac.play();

  nhac.ontimeupdate = () => {
    if (nhac.duration) {
      const phanTram = (nhac.currentTime / nhac.duration) * 100;
      seek.value = phanTram;
      seek.style.background = `linear-gradient(90deg, cyan ${phanTram}%, #444 ${phanTram}%)`;
    }
  };

  seek.oninput = () => {
    nhac.currentTime = (seek.value / 100) * nhac.duration;
  };

  nhac.onended = function() {
    a++;
    if (a >= playlist.length) a = 0;
    taoNhac(playlist[a]);
  };
}

function thumbnail() {
  const baihats = document.querySelectorAll(".baihat");
  baihats.forEach(b => b.style.color = ""); // reset màu chữ

  const tieude = document.getElementById("tieudephone");
  const anh = document.getElementById("anh");
  const src = playlist[a];

  if (src.includes("baihat1.mp3")) {
    tieude.textContent = "Đừng làm trái tim anh đau";
    baihats[0].style.color = "green";
    anh.src = "https://image-cdn.nct.vn/singer/avatar/2024/10/11/3/v/D/5/1728643944137_600.jpg";
  } 
  else if (src.includes("baihat2.mp3")) {
    tieude.textContent = "Khuôn mặt đáng thương";
    baihats[1].style.color = "green";
    anh.src = "";
  } 
  else if (src.includes("baihat3.mp3")) {
    tieude.textContent = "Thu cuối";
    baihats[2].style.color = "green";
    anh.src = "https://i1.sndcdn.com/artworks-2o3Z4WVKPVN9yWjr-9dVXVw-t500x500.jpg";
  } 
  else if (src.includes("baihat4.mp3")) {
    tieude.textContent = "Đánh đổi";
    baihats[3].style.color = "green";
    anh.src = "https://i.scdn.co/image/ab67616d0000b273a06a6b51d0dc296d48505ee6";
  } 
  else {
    tieude.textContent = "Túy âm";
    baihats[4].style.color = "green";
    anh.src = "https://i1.sndcdn.com/artworks-000242595641-s604sm-t500x500.jpg";
  }
}
function vesau() {
  a++;
  if (a >= playlist.length) a = 0; 
  if (nhac) nhac.pause();
  taoNhac(playlist[a]);
}

function vetrc() {
  a--;
  if (a < 0) a = playlist.length - 1;
  if (nhac) nhac.pause();
  taoNhac(playlist[a]);
}
