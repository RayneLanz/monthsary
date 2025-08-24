// DOM Elements
const loadingScreen = document.getElementById("loading-screen");
const mainContent = document.getElementById("main-content");
const heartIcon = document.getElementById("heart-icon");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("close-modal");
const backgroundMusic = document.getElementById("background-music");

// Loading Screen Functionality
function hideLoadingScreen() {
  loadingScreen.style.opacity = "0";
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
    mainContent.classList.remove("hidden");
  }, 500);
}

// Modal Functionality
function openModal() {
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  // Play background music when modal opens
  playBackgroundMusic();

  // Add some sparkle effect when modal opens
  createSparkles();
}

function closeModalFunc() {
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";

  // Lower background music volume when modal closes
  lowerBackgroundMusicVolume();
}

// Sparkle Effect
function createSparkles() {
  const sparkles = ["✨", "💖", "💕", "💗", "💓", "💝"];
  const colors = ["#ff6b9d", "#c44569", "#f8b5d3", "#ff9ecd"];

  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      const sparkle = document.createElement("div");
      sparkle.textContent =
        sparkles[Math.floor(Math.random() * sparkles.length)];
      sparkle.style.position = "fixed";
      sparkle.style.left = Math.random() * window.innerWidth + "px";
      sparkle.style.top = Math.random() * window.innerHeight + "px";
      sparkle.style.fontSize = "2rem";
      sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];
      sparkle.style.pointerEvents = "none";
      sparkle.style.zIndex = "3000";
      sparkle.style.animation = "sparkle 2s ease-out forwards";

      document.body.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 2000);
    }, i * 100);
  }
}

// Heart Click Effect
function heartClickEffect() {
  // Create heart burst effect
  const hearts = ["❤️", "💖", "💕", "💗", "💓"];
  const heartIconRect = heartIcon.getBoundingClientRect();

  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.position = "fixed";
      heart.style.left = heartIconRect.left + heartIconRect.width / 2 + "px";
      heart.style.top = heartIconRect.top + heartIconRect.height / 2 + "px";
      heart.style.fontSize = "1.5rem";
      heart.style.pointerEvents = "none";
      heart.style.zIndex = "1000";
      heart.style.transform = "translate(-50%, -50%)";
      heart.style.animation = `heartBurst 1.5s ease-out forwards`;

      // Random direction
      const angle = i * 45 * (Math.PI / 180);
      const distance = 100 + Math.random() * 50;
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance;

      heart.style.setProperty("--end-x", endX + "px");
      heart.style.setProperty("--end-y", endY + "px");

      document.body.appendChild(heart);

      setTimeout(() => {
        heart.remove();
      }, 1500);
    }, i * 50);
  }
}

// Add CSS for sparkle and heart burst animations
const style = document.createElement("style");
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
    
    @keyframes heartBurst {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0);
        }
    }
`;
document.head.appendChild(style);

// Event Listeners
heartIcon.addEventListener("click", () => {
  heartClickEffect();
  setTimeout(openModal, 300);
});

closeModal.addEventListener("click", closeModalFunc);

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModalFunc();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModalFunc();
  }
});

// Add some interactive effects to the heart
heartIcon.addEventListener("mouseenter", () => {
  heartIcon.style.transform = "scale(1.1)";
  heartIcon.style.textShadow = "0 0 30px rgba(255, 255, 255, 0.8)";
});

heartIcon.addEventListener("mouseleave", () => {
  heartIcon.style.transform = "scale(1)";
  heartIcon.style.textShadow = "0 0 20px rgba(255, 255, 255, 0.5)";
});

// Add click sound effect (optional)
function playHeartbeatSound() {
  // Create a simple heartbeat sound using Web Audio API
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
  oscillator.frequency.setValueAtTime(150, audioContext.currentTime + 0.1);
  oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.2);

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(
    0.01,
    audioContext.currentTime + 0.3
  );

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.3);
}

// Music Control Functions
function playBackgroundMusic() {
  try {
    if (backgroundMusic.currentTime === 0) {
      const startTime = 154;
      backgroundMusic.currentTime = startTime; // Start from specified time
    }

    backgroundMusic.volume = 0.8;
    backgroundMusic.play().catch((error) => {
      console.log("Music playback failed:", error);
    });
  } catch (error) {
    console.log("Error playing music:", error);
  }
}

function lowerBackgroundMusicVolume() {
  try {
    backgroundMusic.volume = 0.2;
  } catch (error) {
    console.log("Error lowering music volume:", error);
  }
}

function stopBackgroundMusic() {
  try {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
  } catch (error) {
    console.log("Error stopping music:", error);
  }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  // Simulate loading time
  setTimeout(hideLoadingScreen, 3000);

  // Add some random floating heart interactions
  setInterval(() => {
    const floatingHearts = document.querySelectorAll(".floating-hearts i");
    const randomHeart =
      floatingHearts[Math.floor(Math.random() * floatingHearts.length)];

    if (randomHeart) {
      randomHeart.style.transform = "scale(1.2)";
      setTimeout(() => {
        randomHeart.style.transform = "scale(1)";
      }, 200);
    }
  }, 3000);
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = "smooth";

// Add some extra love-themed console messages (for fun)
console.log("💖 Welcome to your Monthsary website! 💖");
console.log("💕 May your love continue to grow stronger each day! 💕");
