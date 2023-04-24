# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

## 1.6.0 - 2022-03-25

### Changed

* Remove unused middleware
* On redirection based on the `BaseUrl` add a query params to the URL allowing us to detect already redirected URLs

    This is important to support url of the form `/Fable.Form/Fable.Form/introduction.html` where `Fable.Form` is the `BaseUrl`.

    Prior to this fix, the url was being redirected twice and ended up to `/introduction.html` instead of `/Fable.Form/introduction.html`.
