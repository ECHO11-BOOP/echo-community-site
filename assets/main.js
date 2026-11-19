(() => {
  'use strict';
  const config = window.ECHO_SITE || {};
  const email = typeof config.supportEmail === 'string' ? config.supportEmail.trim() : '';
  const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  document.querySelectorAll('[data-email]').forEach(node => {
    if (valid) {
      node.textContent = email;
      if (node.tagName === 'A') node.href = 'mailto:' + email;
    } else {
      node.textContent = 'Contato ainda não configurado';
      if (node.tagName === 'A') { node.removeAttribute('href'); node.setAttribute('aria-disabled','true'); }
    }
  });
  document.querySelectorAll('[data-email-action]').forEach(node => {
    if (valid) {
      node.href='mailto:'+email+'?subject='+encodeURIComponent('Suporte ECHO COMMUNITY');
      node.textContent='Enviar e-mail ao suporte';
    } else {
      node.removeAttribute('href');
      node.classList.add('is-disabled');
      node.textContent='E-mail de suporte não configurado';
      node.setAttribute('aria-disabled','true');
    }
  });
  const socials = { discord: config.discordInvite, youtube: config.youtubeUrl, tiktok: config.tiktokUrl, instagram: config.instagramUrl };
  Object.entries(socials).forEach(([kind,url]) => {
    document.querySelectorAll('[data-social="'+kind+'"]').forEach(node=>{
      if(typeof url==='string' && /^https:\/\//i.test(url)){
        node.href=url;
        node.target='_blank';
        node.rel='noopener noreferrer';
        node.classList.remove('is-disabled');
        node.removeAttribute('aria-disabled');
      }else{
        node.removeAttribute('href');
        node.classList.add('is-disabled');
        node.setAttribute('aria-disabled','true');
      }
    });
  });
  const menuButton=document.querySelector('[data-menu-button]');
  const nav=document.querySelector('[data-main-nav]');
  if(menuButton && nav){
    menuButton.addEventListener('click',()=>{
      const opened=nav.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded',String(opened));
    });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      nav.classList.remove('is-open'); menuButton.setAttribute('aria-expanded','false');
    }));
  }
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
})();