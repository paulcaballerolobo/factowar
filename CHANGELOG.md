# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### HUD & Metrics
- **TopHUD Implementation**: 
    - Created a new tactical monitoring console at the top of the interface.
    - Integrated user identity (Avatar, Alias, Operator ID).
    - Real-time display of tactical metrics: **Exposición**, **Impacto**, **Polarización**, and **Escepticismo**.
    - Premium glassmorphism aesthetic with tactical iconography and monospace typography.
- **Scoring System**:
    - Terminology update: "Score REGLA" renamed to **Score PARTIDA** (Cumulative).
    - Implemented **Score JUGADA** (Live score for the current simulation).
    - Automated score calculation based on health, recovered nodes, and simulation performance.
- **Engine Metrics (SEIZ)**:
    - Updated `seiz.ts` to calculate and export advanced social metrics (Polarization, etc.).
    - Integrated metrics into the global `GameState`.

### UX
- **News Card (Intelligence Card)**:
    - Implemented **Theme Selector** (Contexto): Feminismo, LGBTIQ+, Género, Sexualidad, Discriminación. (Default: LGBTIQ+).
    - News selection is now filtered by the chosen theme.
    - Implemented Matrix scramble animation ("Click to Decipher").
    - Integrated into sidebar layout with premium styling.
- **Power-Ups (Tactical Actions)**:
    - Updated `Inoculación de Red` and `Fricción Algorítmica` with detailed tooltips and centralized text assets.
- **Ticker (Marquee)**:
    - Implemented CNN-style scrolling with **Standard Green** (non-neon) color.
    - Added state-driven narrative triggers (e.g., Critical Health, Outrage Peaks).
    - Implemented **10-second priority hold** for alerts.
    - Implemented "Red Alert" mode.

### ARCH
- **Centralized Text Assets**: Created `TextAssets.ts` to manage all UI strings and microcopy.
- **Audio Module**: Created `useAudioFeedback.ts` for real-time Web Audio interference.
- **Content Layer**: Created `GameContent.ts` to host injectable News and Ticker pools.
- **Context**: Expanded `GameContext` to manage scores, news life-cycle, and alert triggers.
- **Identity**: Token-based sovereign identity system implemented in `UserContext.tsx`.

