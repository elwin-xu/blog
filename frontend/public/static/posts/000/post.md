# How to deploy a Create React App website to GitHub Pages

## Introduction

GitHub offers a free static website hosting service GitHub Pages, which is perfect for your portfolio on the Internet. While it's easy to deploy a regular web project in which you can simply open index.html to open a web page, it's a little bit tricky for a Create React App project.

## Prerequisites

### Install Node.js

Download and install Node.js.

https://nodejs.org/en/

Then, update the npm that comes with Node.js.

```bash
npm install npm@latest -g
```

### Create a GitHub account

### Install VSCode (Optional)

Download and install Visual Studio Code.

## Create a React App

First, change to the folder where you would like to create your project. Run the following command to create your project using Create React App.

```bash
npx create-react-app my-app
cd my-app
npm start
```

## Create a GitHub repository

Create a new repository named *username*.github.io, where *username* has to exactly match your username, otherwise it won't work. Add remote repository to local files.

## Deploy your app to GitHub Pages

### Install gh-pages

```bash
npm install --save gh-pages
```

### Add homepage field to package.json

```diff
+   "homepage": "https://myusername.github.io/my-react-app"
```

```diff
"scripts": {
+   "predeploy": "npm run build",
+   "deploy": "gh-pages -d build",
    "start": "react-scripts start",
    "build": "react-scripts build",
```

## Further Discussion

You can also choose to deploy you app to your. In my next video, I'll show you how to create a web site with client-side routing.