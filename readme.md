# Todo App Using Nextjs and AWS Amplify

This is a learning repo resulting from the following tutorial:

[Server-Side Rendered Real-time Web App with Next.js, AWS Amplify & GraphQL](https://dev.to/rakannimer/server-side-rendered-real-time-web-app-with-next-js-aws-amplify-graphql-2j49)

---

## Questions/Challenges:

- Updated will occur as users input text with the current setup. This is _cool_, but is it responsible? What are some ways to reduce the potential cost burden of such an application?
- This application depends on `produce`. What is this library? Is it possible to build this app without `produce`?
- Reducers seem massive and messy. Is there a better way to do this? If not, can the index page's code be broken out within a directory?
- This application depends on [nanoid](https://github.com/ai/nanoid) - seemingly to generate unique id's. Does amplify/RDS make these id's anyway as records are created? Should this be removed?

## Todo

- Add styling
  - Mobile
  - Web
