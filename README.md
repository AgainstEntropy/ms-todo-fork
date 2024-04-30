# Microsoft Todo App Fork

This project aims to fork the [Microsoft Todo App](https://apps.microsoft.com/detail/9nblggh5r558).

Techniques used:

- [Next.js](https://nextjs.org/) as framework
- [Tailwind CSS](https://tailwindcss.com/) for styling and responsive UI design
- [Vercel Postgres](https://vercel.com/storage/postgres) / [SQLite](https://www.sqlite.org/index.html) as the database
- [Dirzzle](https://orm.drizzle.team/) as the ORM for database access
- [Auth.js](https://authjs.dev/) for authentication
- [Vercel](http://vercel.com/) for deployment

## Demos

- Sign-in with GitHub / Google

- Smart lists (My Day | Planned | Important | All tasks)

- Create and edit tasks

- Create and custimize new lists

- Search

- Dark mode

## Deploy your own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAgainstEntropy%2Fms-todo-fork&env=AUTH_GITHUB_ID,AUTH_GITHUB_SECRET,AUTH_GOOGLE_ID,AUTH_GOOGLE_SECRET,AUTH_SECRET&project-name=ms-todo-fork&repository-name=ms-todo-fork)

> [!IMPORTANT]  
> Follow the [instructions](https://authjs.dev/getting-started/authentication/oauth) on Auth.js website to generate your own Client ID and SECRET for GitHub and Google OAuth.

## How to develop locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
