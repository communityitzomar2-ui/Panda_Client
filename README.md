# PandaMC for Windows 11

This repository builds a Windows installer using GitHub Actions. You do not need Node.js installed on your own PC.

## Build the installer

1. Upload the contents of this folder to the root of your GitHub repository. The root must contain `package.json`, `src/`, and `.github/`.
2. Open the repository's **Actions** tab.
3. Select **Build PandaMC for Windows**.
4. Select **Run workflow** and confirm.
5. Wait for the run to finish successfully.
6. Open the completed run and download the `PandaMC-Windows-Installer` artifact.
7. Extract the downloaded ZIP and run the `.exe` installer.

## Current functionality

This is a desktop app starter with a PandaMC interface, basic profile creation in the current session, folder selection, and links to Modrinth/CurseForge catalogs.

It is **not yet a complete Minecraft launcher**. Minecraft installation, Microsoft sign-in, Java management, actual game launching, persistent independent profiles, and automatic in-app mod/shader/resource/data-pack installation still need implementation. The Play button explains this limitation instead of pretending to launch the game.
