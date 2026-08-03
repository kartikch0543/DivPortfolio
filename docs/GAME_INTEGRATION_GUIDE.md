# Game Integration Guide

Game integration is deliberately deferred beyond Phase 1. Future game modules should be placed in a dedicated feature slice and expose typed state through a narrow interface. Keep game data in versioned configuration or a content source; do not embed it in page components.

Before integration, define performance budgets, keyboard controls, reduced-motion behavior, save-state requirements, and a fallback experience for unsupported devices.
