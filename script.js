
// Mengatur semua thumbnail secara otomatis
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".thumbnail").forEach(img => {
        let fileId = img.getAttribute("data-thumbnail-id");
        if (fileId) {
            img.src = driveThumbnailBase + fileId;
        }
    });
});

function playVideo(videoId) {
    var videoSrc = "https://drive.google.com/file/d/" + videoId + "/preview";
    
    var player = document.getElementById("videoPlayer");
    player.src = videoSrc;
    
    var modal = document.getElementById("videoModal");
    modal.style.display = "flex";

    // Masuk ke mode fullscreen
    if (modal.requestFullscreen) {
        modal.requestFullscreen().then(() => {
            lockOrientation();
        });
    } else if (modal.mozRequestFullScreen) {
        modal.mozRequestFullScreen();
    } else if (modal.webkitRequestFullscreen) {
        modal.webkitRequestFullscreen();
    } else if (modal.msRequestFullscreen) {
        modal.msRequestFullscreen();
    }
}

// Mengunci orientasi berdasarkan layar HP
function lockOrientation() {
    if (screen.orientation && screen.orientation.lock) {
        let orientation = (window.innerWidth > window.innerHeight) ? "landscape" : "portrait";
        screen.orientation.lock(orientation).catch(err => console.log(err));
    }
}

// Jika fullscreen ditutup, reset orientasi
function closeVideo() {
    var player = document.getElementById("videoPlayer");
    player.src = "";
    
    var modal = document.getElementById("videoModal");
    modal.style.display = "none";

    if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
            if (screen.orientation && screen.orientation.unlock) {
                screen.orientation.unlock();
            }
        });
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

// Jika orientasi berubah, pastikan video tetap sesuai layar
window.addEventListener("orientationchange", () => {
    let player = document.getElementById("videoPlayer");
    if (document.fullscreenElement) {
        player.style.width = (window.innerWidth > window.innerHeight) ? "100vw" : "100vh";
        player.style.height = (window.innerWidth > window.innerHeight) ? "100vh" : "100vw";
    }
});