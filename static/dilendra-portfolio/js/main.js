(function(){
  // set year
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();

  // mobile menu toggle
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  if(toggle && menu){
    toggle.addEventListener('click', () => {
      const open = menu.style.display === 'block';
      menu.style.display = open ? 'none' : 'block';
      toggle.setAttribute('aria-expanded', String(!open));
    });
  }

  // smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(!href || href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        if(menu && menu.style.display === 'block'){ menu.style.display='none'; toggle.setAttribute('aria-expanded','false'); }
      }
    });
  });

  // reveal on scroll (IntersectionObserver)
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if(en.isIntersecting) en.target.classList.add('visible');
    });
  }, {threshold: 0.08});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // lazy load images where supported
  document.querySelectorAll('img').forEach(img => { img.loading = 'lazy'; });

  // Load articles from external file
  function loadArticles() {
    fetch('articles/index.html')
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const articlesList = doc.querySelector('#articlesList');
        
        if (articlesList) {
          const container = document.getElementById('articles-container');
          container.innerHTML = articlesList.innerHTML;
          
          // Add click handlers to article cards
          container.querySelectorAll('.article-card').forEach(card => {
            card.addEventListener('click', function() {
              const articleUrl = this.getAttribute('data-article-url');
              loadArticle(articleUrl);
            });
          });
        }
      })
      .catch(error => {
        console.error('Error loading articles:', error);
        document.getElementById('articles-container').innerHTML = 
          '<p class="muted">Unable to load articles. Please try again later.</p>';
      });
  }
  
  // Load article in modal
  window.loadArticle = function(articleUrl) {
    fetch(articleUrl)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const articleContent = doc.querySelector('.article-full');
        
        if (articleContent) {
          const modalTitle = doc.querySelector('.article-title');
          if (modalTitle) {
            document.getElementById('modalTitle').textContent = modalTitle.textContent;
          }
          document.getElementById('modalContent').innerHTML = articleContent.innerHTML;
          document.getElementById('articleModal').style.display = 'block';
          document.body.style.overflow = 'hidden';
        }
      });
  };
  
  // Close modal
  window.closeModal = function() {
    document.getElementById('articleModal').style.display = 'none';
    document.body.style.overflow = 'auto';
  };
  
  // Close modal on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
  
  // Close modal when clicking outside content
  document.getElementById('articleModal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });
  
  // Load articles on page load
  window.addEventListener('DOMContentLoaded', loadArticles);
})();