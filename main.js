const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("node:path");
const fs = require("node:fs");
const https = require("node:https");

function createWindow() {
  const win = new BrowserWindow({
    width: 1180,
    height: 760,
    minWidth: 900,
    minHeight: 620,
    backgroundColor: "#080b10",
    title: "PandaMC",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  win.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("choose-mods-folder", async () => {
  const result = await dialog.showOpenDialog({ properties: ["openDirectory", "createDirectory"] });
  if (result.canceled || !result.filePaths[0]) return null;
  return result.filePaths[0];
});

function requestJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "PandaMC-Launcher", "Accept": "application/vnd.github+json" } }, res => {
      let body = "";
      res.on("data", chunk => body += chunk);
      res.on("end", () => {
        if (res.statusCode < 200 || res.statusCode >= 300) return reject(new Error(`GitHub returned HTTP ${res.statusCode}`));
        try { resolve(JSON.parse(body)); } catch { reject(new Error("GitHub returned invalid JSON")); }
      });
    }).on("error", reject);
  });
}

ipcMain.handle("install-github-mod", async (_event, input) => {
  try {
    const raw = String(input || "").trim();
    const match = raw.match(/github\.com\/([^/]+)\/([^/#?]+)/i);
    if (!match) throw new Error("Paste a GitHub repository URL, such as https://github.com/owner/mod-repo");
    const owner = match[1], repo = match[2].replace(/\.git$/i, "");
    const folder = await dialog.showOpenDialog({ properties: ["openDirectory", "createDirectory"] });
    if (folder.canceled || !folder.filePaths[0]) return { canceled: true };

    const release = await requestJson(`https://api.github.com/repos/${owner}/${repo}/releases/latest`);
    const assets = (release.assets || []).filter(a => /\.jar$/i.test(a.name));
    if (!assets.length) throw new Error("The latest GitHub release has no .jar asset. Check that the project publishes a mod JAR.");
    const asset = assets[0];
    const destination = path.join(folder.filePaths[0], path.basename(asset.name));

    await new Promise((resolve, reject) => {
      const file = fs.createWriteStream(destination);
      https.get(asset.browser_download_url, { headers: { "User-Agent": "PandaMC-Launcher" } }, response => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          https.get(response.headers.location, { headers: { "User-Agent": "PandaMC-Launcher" } }, redirected => {
            if (redirected.statusCode !== 200) { file.close(); fs.unlink(destination, () => {}); return reject(new Error(`Download failed: HTTP ${redirected.statusCode}`)); }
            redirected.pipe(file);
            file.on("finish", () => file.close(resolve));
          }).on("error", reject);
          return;
        }
        if (response.statusCode !== 200) { file.close(); fs.unlink(destination, () => {}); return reject(new Error(`Download failed: HTTP ${response.statusCode}`)); }
        response.pipe(file);
        file.on("finish", () => file.close(resolve));
      }).on("error", err => { file.close(); fs.unlink(destination, () => {}); reject(err); });
    });
    return { ok: true, file: destination, release: release.tag_name || release.name || "latest" };
  } catch (error) {
    return { error: error.message };
  }
});

ipcMain.handle("open-external", async (_event, url) => {
  if (typeof url === "string" && /^https:\/\/(github\.com|minecraft\.net)\//i.test(url)) {
    await shell.openExternal(url);
    return true;
  }
  return false;
});