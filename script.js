// Floating hearts generator
const heartsContainer = document.getElementById('hearts');
function spawnHeart(){
    const h = document.createElement('div');
    h.className = 'heart';
    const size = Math.random()*28 + 18;
    h.style.width = h.style.height = size + 'px';
    const startX = (Math.random()*100 - 50) + 'vw';
    h.style.setProperty('--x', startX);
    h.style.setProperty('--x-end', (Math.random()*40 - 20) + 'vw');
    h.style.left = (Math.random()*100) + '%';
    h.style.top = (80 + Math.random()*20) + '%';
    h.style.animationDuration = (6 + Math.random()*6) + 's';
    h.style.opacity = '0';
    heartsContainer.appendChild(h);
    setTimeout(()=> h.remove(), 14000);
}
// keep a soft ambient of hearts
setInterval(spawnHeart, 800);
for(let i=0;i<6;i++) setTimeout(spawnHeart, i*350);

// Confetti on accept
const confetti = document.getElementById('confetti');
function burstConfetti(){
    confetti.innerHTML = '';
    const colours = ['#ff4d6d','#ffd76b','#6effc3','#8ec4ff','#ffb3d1'];
    const count = 36;
    for(let i=0;i<count;i++){
        const piece = document.createElement('div');
        piece.className = 'piece';
        piece.style.left = Math.random()*100 + '%';
        piece.style.top = (Math.random()*10 - 10) + 'vh';
        piece.style.background = colours[i%colours.length];
        piece.style.transform = `rotate(${Math.random()*360}deg)`;
        piece.style.animationDuration = (1.2 + Math.random()*1.2) + 's';
        piece.style.animationDelay = (Math.random()*0.12) + 's';
        confetti.appendChild(piece);
    }
    // remove after animation
    setTimeout(()=> confetti.innerHTML='',3000);
}

// Buttons behavior
const yesBtn = document.getElementById('yes');
const noBtn = document.getElementById('no');
const reveal = document.getElementById('reveal');
const closeBtn = document.getElementById('close');

yesBtn.addEventListener('click',()=>{
    burstConfetti();
    reveal.classList.add('open');
    reveal.setAttribute('aria-hidden','false');
    // a few more hearts burst
    for(let i=0;i<12;i++) setTimeout(spawnHeart, i*80);
});

closeBtn.addEventListener('click',()=>{
    reveal.classList.remove('open');
    reveal.setAttribute('aria-hidden','true');
});

// Playful "no" behavior (moves away)
noBtn.addEventListener('mouseenter',()=>{
    const dx = (Math.random()*60 - 30);
    const dy = (Math.random()*18 - 9);
    noBtn.style.transform = `translate(${dx}px, ${dy}px) rotate(${dx/6}deg)`;
});
noBtn.addEventListener('click',()=>{
    // gentle nudge hearts and show friendly text change
    const lead = document.querySelector('.lead');
    lead.textContent = "It's okay — take your time. I'll be here.";
    noBtn.disabled = true;
    noBtn.textContent = "Soon?";
    setTimeout(()=>{ noBtn.disabled = false; noBtn.textContent = "Maybe later"; lead.textContent = "I made this just for you — something small, warm, and true. Say yes and let's start our forever."; },3000);
});

// Accessibility: keyboard yes via Enter when focused
yesBtn.addEventListener('keydown', e => { if(e.key === 'Enter') yesBtn.click(); });
noBtn.addEventListener('keydown', e => { if(e.key === 'Enter') noBtn.click(); });
