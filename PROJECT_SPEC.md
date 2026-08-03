# KD Arcade - Project Specification

## Vision

KD Arcade is a premium indie game platform created by Divyanshu Kumar.

This is NOT a portfolio website.

It is the foundation of a long-term game publishing platform where players can:

- Play browser games
- Discover new releases
- Read development stories
- Download future Android games
- Follow future Steam releases
- Track updates
- Experience a polished indie studio brand

The project must be designed so it can grow from 2 games today to hundreds of games in the future.

---

# Goals

Version 1 should provide:

- Premium landing page
- Games library
- Individual game pages
- Browser game support
- Pixel-art inspired UI
- Fast loading
- Excellent SEO
- Responsive design
- Accessibility
- Clean architecture

Future versions should support:

- User accounts
- Achievements
- Leaderboards
- Comments
- Ratings
- Analytics
- Cloud saves
- Admin dashboard
- Play Store links
- Steam links
- Newsletters

---

# Design Language

Theme:

Modern Indie Pixel Arcade

The website should feel like entering a professional indie game studio.

Inspirations:

- Poki
- itch.io
- GX.games
- Steam
- Newgrounds

The interface should combine:

- pixel art
- modern UI
- smooth animations
- dark mode
- subtle retro effects

Avoid making the website feel like a student portfolio.

---

# Technology Stack

Frontend

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- shadcn/ui

Future Backend

- Next.js Route Handlers
- PostgreSQL
- Supabase

Deployment

- Vercel

Future Storage

- Cloudflare R2

---

# Architecture

Use Clean Architecture.

Separate:

- UI
- Components
- Features
- Business Logic
- Utilities
- Data
- Services
- Types

Avoid duplication.

Use reusable components.

Use reusable hooks.

Keep files small.

Follow SOLID principles whenever appropriate.

---

# Pages

Home

Games

Game Details

About

Devlog

Contact

Privacy

Terms

404

Future:

Profile

Achievements

Collections

Leaderboard

Admin

---

# Homepage

Should include:

Hero

Featured Games

Latest Games

Developer Story

Statistics

Tech Stack

Newsletter

Footer

---

# Games

Games must be data-driven.

Never hardcode game information inside components.

Each game should include:

Title

Slug

Genre

Engine

Platforms

Description

Screenshots

Trailer

Version

Status

Browser Build

Play Store

Steam

GitHub

Tags

Related Games

---

# Browser Games

Support:

Unity WebGL

HTML5

Future Godot

Games should display:

Loading Screen

Progress Bar

Artwork

Controls

Fullscreen

Restart

---

# Future Mobile Games

Every game page should already support:

Play Store button

App Store button

APK button

Hide unavailable buttons.

---

# SEO

Every page must support:

Metadata

OpenGraph

Twitter Cards

Canonical URLs

JSON-LD

Sitemap

Robots.txt

Optimized images

---

# Performance Goals

Lighthouse:

Performance >95

Accessibility >95

SEO >95

Best Practices >95

---

# Accessibility

Keyboard navigation

ARIA labels

Reduced motion

Semantic HTML

High contrast

---

# Git Workflow

Use Git from day one.

Follow Conventional Commits.

Examples:

feat:

fix:

docs:

style:

refactor:

perf:

test:

ci:

build:

chore:

Never combine unrelated changes.

---

# Branch Strategy

main

develop

feature/*

fix/*

release/*

hotfix/*

---

# Documentation

Maintain:

README

Architecture

Roadmap

Coding Standards

Deployment Guide

Game Integration Guide

Decision Log

Changelog

Keep documentation synchronized with implementation.

---

# Testing

Prepare architecture for:

Unit tests

Integration tests

Component tests

Future E2E tests

---

# CI/CD

GitHub Actions should:

Install dependencies

Run lint

Run TypeScript checks

Run tests

Build project

Deploy automatically

---

# Existing Games

Current games are hosted on:

https://kdivyanshu.itch.io/

Initially they may be embedded or linked.

The architecture should allow moving them to self-hosted Unity WebGL builds later without changing the UI.

---

# Coding Standards

Strict TypeScript

ESLint

Prettier

Absolute imports

Reusable hooks

Reusable utilities

Reusable UI components

No inline styles

No duplicated code

Document exported functions

---

# Long-Term Goal

KD Arcade should evolve from a personal game portfolio into a professional indie game platform that can support browser games, mobile games, desktop games, analytics, user accounts, achievements, community features, and future commercial releases without requiring major architectural rewrites.