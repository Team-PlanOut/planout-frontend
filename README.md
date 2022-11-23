# Welcome to PlanOut

### A useful tool for you and your friends to create events and tasks and be notified upon their completion.

![image](https://user-images.githubusercontent.com/84162315/190036935-993bfcc5-0d7b-46e4-8563-225a4b1e2abc.png)

# [Video Demo](https://drive.google.com/file/d/12lWXhbdBL1Pyvga3FIwEoM5I0QxgfQ2v/view?usp=sharing)


### This is the frontend repository for PlanOut. A separate backend repository is available at 👉[PlanOut Backend](https://github.com/cc-senior-project/planout-backend).

### Built With

- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Firebase](https://firebase.google.com/)
- [Socket.io](https://socket.io/)
- [Stripe](https://stripe.com/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

### Getting started

1. Create a `.env` file in the root of the project.
2. Add the following variables to the `.env` file:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Features

- Secure Login and SignUp with Firebase.
- Create events and tasks and assign them to users.
- Add friends who have registered.
- Invite friends to events
- Notify friends when a task is added/completed.
- Use Stripe for payments.

## Roadmap

- [ ] Connect to calendar apps
- [ ] iOS/Android app
- [ ] Extra language/currency support
- [ ] Email notifications
- [ ] Integrate into other social media apps
- [ ] Event location with Google Maps
