const pages = [...document.querySelectorAll(".page")];
document.querySelectorAll(".nav").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav").forEach(b => b.classList.toggle("active", b === button));
    pages.forEach(page => page.classList.toggle("active", page.id === button.dataset.page));
  });
});

const versions = ["1.21.8","1.21.7","1.21.6","1.21.5","1.21.4","1.21.3","1.21.1","1.20.6","1.20.4","1.20.2","1.20.1","1.19.4","1.19.2","1.18.2","1.17.1","1.16.5","1.12.2","1.8.9"];
const versionSelect = document.getElementById("versionSelect");
versions.forEach(v => { const option = document.createElement("option"); option.value = v; option.textContent = `Minecraft ${v}`; versionSelect.appendChild(option); });
versionSelect.value = "1.21.4";
document.getElementById("homeVersion").addEventListener("change", e => versionSelect.value = e.target.value);
versionSelect.addEventListener("change", e => document.getElementById("homeVersion").value = e.target.value);

document.getElementById("launchBtn").addEventListener("click", () => {
  document.getElementById("launchStatus").textContent = "Launcher UI preview: game launching is not connected yet.";
});

document.getElementById("installBtn").addEventListener("click", async () => {
  const status = document.getElementById("installStatus");
  const url = document.getElementById("githubUrl").value.trim();
  if (!url) { status.textContent = "Paste a GitHub repository URL first."; return; }
  const button = document.getElementById("installBtn");
  button.disabled = true; button.textContent = "Installing…"; status.textContent = "Checking the latest GitHub release…";
  const result = await window.panda.installGithubMod(url);
  button.disabled = false; button.textContent = "Install mod";
  if (result.canceled) status.textContent = "Install cancelled.";
  else if (result.error) status.textContent = `Couldn't install: ${result.error}`;
  else status.textContent = `Installed ${result.file} (release ${result.release}). Check version and loader compatibility before launching.`;
});