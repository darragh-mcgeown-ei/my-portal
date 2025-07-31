// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

const fs = require('fs');
const path = require('path');

const announcementPath = path.resolve(__dirname, 'data/announcement.json');
let announcementBar;

if (fs.existsSync(announcementPath)) {
    const fullData = JSON.parse(fs.readFileSync(announcementPath, 'utf8'));

    // Remove invalid field before passing to Docusaurus
    const { enabled, ...cleanData } = fullData;

    if (enabled && cleanData.content?.trim()) {
        announcementBar = cleanData;
    }
}

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Aer Lingus NDC',
    tagline: 'Aer Lingus NDC allows you to offer your customers a more flexible, customised and personalised experience with our airline. Here’s how we’re providing this convenient new standardised distribution channel, so you can best utilise it.',
    favicon: 'img/favicon.ico',

    // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
    future: {
        v4: true, // Improve compatibility with the upcoming Docusaurus v4
    },

    markdown: {
        mermaid: true,
    },

    themes: ['@docusaurus/theme-mermaid'],

    // Set the production url of your site here
    url: 'https://darragh-mcgeown-ei.github.io',
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'darragh-mcgeown-ei',
    projectName: 'my-portal',

    onBrokenLinks: 'warn',
    onBrokenMarkdownLinks: 'warn',

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: './sidebars.js',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    // editUrl:
                    //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                },
                // blog: {
                //   showReadingTime: true,
                //   feedOptions: {
                //     type: ['rss', 'atom'],
                //     xslt: true,
                //   },
                //   // Please change this to your repo.
                //   // Remove this to remove the "edit this page" links.
                //   // editUrl:
                //   //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
                //   // Useful options to enforce blogging best practices
                //   onInlineTags: 'warn',
                //   onInlineAuthors: 'warn',
                //   onUntruncatedBlogPosts: 'warn',
                // },
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            announcementBar: announcementBar,
            colorMode: {
                defaultMode: 'light',
                disableSwitch: true,
            },
            navbar: {
                logo: {
                    alt: 'AerLingus',
                    src: 'img/aer-lingus-logo.svg',
                },
                items: [
                    {to: '/', label: 'Home', position: 'right'},
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'right',
                        label: 'Documentation',
                    },
                    {to: '/', label: 'Support', position: 'right'},
                    {
                        to: '/register',
                        label: 'Register',
                        position: 'right',
                    }
                ],
            },
            footer: {
                links: [
                    {
                        title: 'Legal',
                        items: [
                            {
                                label: 'Conditions of Carriage',
                                to: '/',
                            },
                            {
                                label: 'Imprint',
                                to: '/',
                            },
                            {
                                label: 'Terms of Use',
                                to: '/',
                            },
                            {
                                label: 'Privacy Statement',
                                to: '/',
                            },
                            {
                                label: 'Acceptable Usage Policy',
                                to: '/',
                            },
                        ],
                    },
                    {
                        title: 'Connect with us',
                        items: [
                            {
                                label: 'X',
                                to: '/',
                            },
                            {
                                label: 'Youtube',
                                to: '/',
                            },
                            {
                                label: 'Facebook',
                                to: '/',
                            },
                        ],
                    },
                    {
                        title: 'Help and Support',
                        items: [
                            {
                                label: 'Contact Us',
                                to: '/',
                            },
                            {
                                label: 'Support',
                                to: '/',
                            },{
                                label: 'Sitemap',
                                to: '/',
                            },
                            {
                                label: 'Cookie Settings',
                                to: '/',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Aer Lingus Group DAC and Aer Lingus Ltd. All rights reserved`,
            },
            prism: {
              theme: prismThemes.github,
              darkTheme: prismThemes.dracula,
            }
        }),
};

export default config;
