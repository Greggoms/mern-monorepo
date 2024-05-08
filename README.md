# mern-monorepo

Expanding my knowledge on the MERN stack.

This is a sandbox that makes/will make use of various services
for features like emailing and data storage.

I do enjoy Next.js, but I have a feeling that I should improve
these skills. With React 19 just around the corner, there may be
less of a need to rely on Next.js. I love the ease of SSR with Next,
but I may have to apply the underlying concepts in my own apps.
The new features of React 19 should definitely help in these endeavors.
Express really isn't that bad, and I could try looking into something
like tRPC with a monorepo setup.

## Setup

- Frontend / client
  - Vite
  - shadcn/ui
  - react-router-dom (im too lazy to learn the tanstack router)
- Server
  - Express
  - Resend (emails. attempting to move away from EmailJS)
  - @pdf-react/renderer (to generate PDFs based on incoming client data)
  - MongoDB (or maybe this is where i decide to go relational...)
