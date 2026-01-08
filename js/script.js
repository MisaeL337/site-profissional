document.addEventListener('DOMContentLoaded', () => {
  // 1. Rolagem suave para links âncora
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 2. Lógica do Carrossel de Projetos
  const track = document.getElementById('track');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  if (track && prevBtn && nextBtn) {
    let scrollAmount = 0;
    
    const getCardWidth = () => {
      const card = track.querySelector('.project-card');
      // Largura do card + gap (40px definido no CSS)
      return card ? card.offsetWidth + 40 : 360;
    };

    nextBtn.addEventListener('click', () => {
      const cardWidth = getCardWidth();
      // Usa o pai (container) para calcular a largura visível correta
      const containerWidth = track.parentElement.offsetWidth;
      const maxScroll = track.scrollWidth - containerWidth;
      
      if (maxScroll <= 0) return; // Não há o que rolar

      // Se já estiver no fim (ou muito perto), volta para o início
      if (scrollAmount >= maxScroll - 10) {
        scrollAmount = 0;
      } else {
        scrollAmount += cardWidth;
        // Garante que não ultrapasse o máximo
        if (scrollAmount > maxScroll) scrollAmount = maxScroll;
      }
      
      track.style.transform = `translateX(-${scrollAmount}px)`;
    });

    prevBtn.addEventListener('click', () => {
      const cardWidth = getCardWidth();
      scrollAmount -= cardWidth;
      if (scrollAmount < 0) scrollAmount = 0; // Trava no início
      
      track.style.transform = `translateX(-${scrollAmount}px)`;
    });
  }
});
