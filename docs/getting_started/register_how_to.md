---
title: How to Register
sidebar_position: 2
---
# How to Register

Let's discover **Docusaurus in less than 5 minutes**.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.

<details>
  <summary>Toggle me!</summary>

This is the detailed content

```js
console.log("Markdown features including the code block are available");
```

You can use Markdown here including **bold** and *italic* text, and [inline link](https://docusaurus.io)

  <details>
    <summary>Nested toggle! Some surprise inside...</summary>

```
😲😲😲😲😲
```

  </details>
</details>
