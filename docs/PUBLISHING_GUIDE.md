# Publishing Platform Guide

## Overview

KD Arcade functions as a multi-platform indie publishing hub supporting browser WebGL games, native desktop downloads, mobile APKs, store redirects, version history, system specs, DLCs, and achievement tracking.

## Supported Platforms & Formats

- **Browser (WebGL / HTML5)**: Interactive frame launcher with loading progress bar, controls overlay, fullscreen mode, and game artwork launcher (`EnhancedBrowserPlayer.tsx`).
- **Windows**: `.exe` installers / `.zip` portable archives.
- **Android**: `.apk` packages.
- **macOS**: `.dmg` bundles (Apple Silicon / Intel).
- **Linux**: `.AppImage` / `.tar.gz` packages.
- **External Platforms**: Direct store integration links for **Steam**, **itch.io**, and **GitHub Releases**.

## Feature Extensions

1. **Multi-Platform Download Hub**: Displays SHA-256 checksums, version tags, file sizes, and platform badges (`PublishingDownloadHub.tsx`).
2. **Version History & Release Notes**: Timeline of release versions and changelog bullet points (`VersionHistoryTimeline.tsx`).
3. **System Requirements**: Minimum vs. Recommended spec table (`SystemRequirementsWidget.tsx`).
4. **DLC Architecture**: Expansion packs and skin bundle listings (`DlcGallery.tsx`).
5. **Achievements System**: Progress tracker, unlock timestamps, and player rarity percentages (`AchievementsWidget.tsx`).
