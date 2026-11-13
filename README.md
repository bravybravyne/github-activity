

# GitHub User Activity CLI

A simple command-line application built with JavaScript and Node.js that fetches and displays the recent public activity of any GitHub user using the GitHub REST API.

## Features

- Fetch recent GitHub activity.
- Display pushed commits.
- Display opened issues and pull requests.
- Display starred repositories.
- Display repository forks and other events.
- Handle invalid usernames and API errors.
- No external dependencies.

## Technologies

- JavaScript
- Node.js
- GitHub REST API

## Requirements

- Node.js 18 or later.

## Installation

Clone the repository:

    git clone YOUR_GITHUB_REPOSITORY_URL

Navigate into the project:

    cd github-activity

Install and link the CLI:

    npm link

## Usage

    github-activity <username>

Example:

    github-activity kamranahmedse

Alternatively:

    npm start -- kamranahmedse

## API

https://api.github.com/users/<username>/events

## Project Page

YOUR_GITHUB_REPOSITORY_URL

## Author

Pravin Ngote
