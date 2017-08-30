# react-auth-sandbox
JWT token authentication with React, adapted from Vladimir Ponomarev's tutorial

I've decided to push myself to use React as much as I can before learning Redux, so for this project I took Vladimir Ponomarev's tutorial (parts [one](https://vladimirponomarev.com/blog/authentication-in-react-apps-creating-components) and [two](https://vladimirponomarev.com/blog/authentication-in-react-apps-jwt)) and simply updated it to use React Router v4 instead of v3. But the differences turned out to be pretty big; you can read more from React Training, the makers of React Router, [here](https://reacttraining.com/react-router/].

First, I had to learn how authentication was handled in this tutorial. When someone creates an account, their login information is stored in MongoDB, with the password hashed with bcrypt. Form validation ensures that no two accounts have the same email address, and that everyone's password is at least 8 characters long. When a user logs in, the request is sent to the server, which queries the database to check that a record exists, and that the hashed password matches the hash stored there. On a successful login, each request from the client includes a JSON Web Token that gives it special privileges to read private data. Logout simply removes this token from the requests.

React Router is the "gold standard" for keeping track of your locations while you move through a React web app. Version 4 was a big improvement over Version 3, which used some workarounds that didn't take full advantage of React's component-based system. Version 4 puts everything into React components so that it's not only easier to understand and to work with, but it also gets along much better with React's smart rendering strategies (the "virtual DOM") to improve perceived page loads. So if you wrap all of your components in a `<BrowserRouter />`, you can then use `<Route />` components that take `match`, `location`, and `history` as props, to display a given component for a given path.

So, back to my project. There was a separate routes.js file in client/src, which had to be deleted -- again, the strange thing to wrap your head around is that, in v4, routes are _not_ defined in an external file, but in the components themselves. Armed with this new knowledge, I was constantly itching to delete that file, but I kept it for reference until I was sure all my routes were pointing in the right direction.

I had to make a strategic decision when it came to displaying (or securely hiding) private content for logged-in users only. For this, I drew from The Meteor Chef's tutorial called [Getting Started with React Router v4](https://themeteorchef.com/tutorials/getting-started-with-react-router-v4). The key strategy was to wrap a `<Route />` component in a custom `<PrivateRoute />` component to conditionally render content or perform a redirect (more on redirects soon). I did the same thing for public-only content (the login and signup screens) with a custom `<PublicRoute />` component. You can see these custom components in client/src/containers. Here's an excerpt from The Meteor Chef's code that inspired me:

```
import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router-dom';

const Authenticated = ({ loggingIn, authenticated, component, ...rest }) => (
  <Route {...rest} render={(props) => {
    if (loggingIn) return <div></div>;
    return authenticated ?
    (React.createElement(component, { ...props, loggingIn, authenticated })) :
    (<Redirect to="/login" />);
  }} />
);

Authenticated.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
  component: PropTypes.func,
};

export default Authenticated;
```

(I looked hard for a way to replace React.createElement to be more ES6-savvy, and I found it! The problem is that `component` is a prop, so it must be lowercase, and yet it is a component itself, so when you ask to render it in JSX you have to capitalize it: `<Component />`. So I went to the function declaration where they destructure the props: `{ loggingIn, authenticated, component, ...rest }` and replaced `component` with `component: Component`, and then I could use the capital C in my JSX, with no need to use `createElement`!)

Redirects were an interesting challenge. I was getting some bugs with residual React Router v3 code, and once I found it and erased it, links broke, and I couldn't think of an easy v4-style way to do it. At one point, I just inserted the JSX line `<Redirect to="login" />` right in the middle of some JavaScript, outside of any render function. This seems silly in retrospect, but I genuinely couldn't think of an imperative way to get my app to redirect when I told it to.

But React Router is built to be declarative, and I'm learning more about the difference between the two paradigms. In this case, `<Redirect />` is a React component that will work alongside other components as long as it's wrapped somewhere in its ancestry by a `<BrowserRouter />` component. I'm still not quite sure how that works under the hood, but I was happy to see that lonely line of JSX join a larger herd of JSX animals.

It's not bug-free; there's something going wrong with the asynchronous setState() calls that means that my Redirect components don't get the signal to render until too late, so it sticks on the login page until you click a few times, then it eventually goes to the dashboard page. Still, I'm happy with the work I've done, and I'll know my way around authentication with React on the front end if I ever need to!
