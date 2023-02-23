---
title: Why Eleventy Nacara?
layout: nacara/layouts/docs.njk
---

**eleventy-layout-nacara** is a plugin for Eleventy that provides an opinionated layout.

The goal of this plugin is to provide ready to use layouts for your project, for you to **focus on the content instead of the layout**.

Features:

- Mobile friendly
- Allow to configure key elements via `Eleventy Data` like
    - `nacaraMetadata` for global metadata
    - `nacaraNavbar`
    - `nacaraFooter`
    - `nacaraMenu` for generating menus on different sections of your site
- Filters:
    - `to_icon` embed icons in your HTLM directly for faster loading
    - `last_modified_date` to display the last modified date of a file
