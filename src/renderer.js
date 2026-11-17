const pages = ['home','versions','mods','shaders','packs','profiles','settings'];
const pageNames = {home:'Home',versions:'Versions',mods:'Mods',shaders:'Shaders',packs:'Texture & data packs',profiles:'Profiles',settings:'Settings'};
function showPage(name) {
  pages.forEach(p => document.getElementById(p).classList.toggle('show', p === name));
  document.querySelectorAll('.nav').forEach(b => b.classList.toggle('active', b.dataset.page === name));
  document.getElementById('page-name').textContent = pageNames[name] || 'Home';
}
document.querySelectorAll('[data-page]').forEach(b => b.addEventListener('click', () => showPage(b.dataset.page)));
document.querySelectorAll('[data-goto]').forEach(b => b.addEventListener('click', () => showPage(b.dataset.goto)));
document.querySelectorAll('[data-url]').forEach(b => b.addEventListener('click', () => window.panda.openExternal(b.dataset.url)));
document.getElementById('play-button').addEventListener('click', () => {
  alert('PandaMC is installed! Minecraft version installation, account sign-in and game launching are not included in this starter build yet.');
});
document.getElementById('profile-button').addEventListener('click', () => showPage('profiles'));
document.getElementById('new-profile').addEventListener('click', () => {
  const name = prompt('Name your new profile (for example: PvP or Survival):');
  if (!name || !name.trim()) return;
  const row = document.createElement('div');
  row.className = 'profile-row';
  const info = document.createElement('div');
  const title = document.createElement('b');
  title.textContent = name.trim();
  const desc = document.createElement('small');
  desc.textContent = 'New profile · Configure its game content later';
  info.append(title, desc);
  row.append(info);
  document.getElementById('profile-list').append(row);
});
document.getElementById('choose-folder').addEventListener('click', async () => {
  const folder = await window.panda.chooseFolder();
  if (folder) document.getElementById('folder-label').textContent = folder;
});
