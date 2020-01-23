module.exports = {
  title: 'Laravel Package Development',
  description: 'A central place to learn how to create packages from scratch.',
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/favicons/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/favicons/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/favicons/favicon-16x16.png"}],
    ['link', { rel: "manifest", href: "/assets/favicons/site.webmanifest"}],
    ['link', { rel: "mask-icon", href: "/assets/favicons/safari-pinned-tab.svg", color: "#3a0839"}],
    ['link', { rel: "shortcut icon", href: "/assets/favicons/favicon.ico"}],
    ['meta', { name: "msapplication-TileColor", content: "#3a0839"}],
    ['meta', { name: "msapplication-config", content: "/assets/favicons/browserconfig.xml"}],
    ['meta', { name: "theme-color", content: "#ffffff"}],
  ],
  themeConfig: {
    logo: '/laravel-package-logo.png',
    repo: 'Jhnbrn90/LaravelPackage.com',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page!',
    nav: [
      {
        text: 'John Braun',
        link: 'https://johnbraun.blog/'
      },
    ],
    sidebar: [
      '/',
      '/01-the-basics',
      '/02-development-environment',
      '/03-service-providers',
      '/04-testing',
      '/05-facades',
      '/06-artisan-commands',
      '/07-configuration-files',
      '/08-models-and-migrations',
      '/09-routing',
      '/10-events-and-listeners',
      '/11-middleware',
      '/12-mail',
      '/13-jobs',
      '/14-notifications',
    ]
  },
}