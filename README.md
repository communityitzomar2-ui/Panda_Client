# PandaMC

An original dark Minecraft launcher UI starter inspired by the layout of the reference screenshot.

## Run it

1. Install [Node.js](https://nodejs.org/) (LTS).
2. Open this folder in a terminal.
3. Run:

   ```bash
   npm install
   npm start
   ```

## Included

- PandaMC home screen and navigation.
- Minecraft version selector UI.
- GitHub latest-release downloader for `.jar` assets.
- Folder picker so you can choose the Minecraft `mods` folder.
- Original CSS-built PandaMC artwork (no Lunar Client assets).

## Important: current limitations

This is an early launcher starter, **not yet a complete Minecraft launcher**.

- The Launch button is currently a UI placeholder.
- Microsoft account authentication is not implemented.
- Minecraft version manifests, game files, Java runtime management, and launching are not implemented.
- The version list is a selector only; it does not mean every version can currently be launched.
- The GitHub installer downloads the first `.jar` asset attached to the repository's latest GitHub release. It does not verify the mod, loader, or Minecraft version.
- A mod may need Fabric, Forge, or NeoForge and may not work with other versions.

Build and test the installer with trusted mod projects only. Do not install unknown JAR files.

## GitHub

Create a new GitHub repository and upload the contents of this folder. Do not upload `node_modules`.


## Build a Windows 11 installer without installing Node.js on your PC

This repository includes a GitHub Actions workflow that builds PandaMC on a GitHub-hosted Windows machine.

1. Push these files to your GitHub repository.
2. Open the repository's **Actions** tab.
3. Select **Build PandaMC for Windows**.
4. Choose **Run workflow** and confirm.
5. When it finishes, open the run and download **PandaMC-Windows-Installer** under Artifacts.
6. Open the downloaded `PandaMC-Setup-0.1.0.exe` to install the current starter app.

To publish a GitHub Release with the installer attached, create and push a version tag such as `v0.1.0`.

**Important:** This packages the current starter app as a Windows installer. It does not yet implement full Minecraft account sign-in, game/version installation, game launching, or the complete mod/shader/resource-pack browser. Those features need to be built and tested separately. The build machine uses Node.js in GitHub Actions; you do not need to install Node.js on your own PC.
