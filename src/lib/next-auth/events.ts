import { type NextAuthOptions } from 'next-auth';
// import { onCreateuser } from './handlers/onCreateUser';
// @link: https://next-auth.js.org/configuration/options#events

// NOTE: UNUSED IN THIS PROJECT

export const events: NextAuthOptions['events'] = {
  // @link: https://next-auth.js.org/configuration/options#events
  async signIn(message) {
    // await wait(50);
    console.log('event:signIn | 🔥', message);
  },
  async signOut(message) {
    // await wait(50);
    console.log('event:signOut | 🔥', message);
  },
  async createUser(message) {
    console.log('event:createUser | 🔥', message);
    // await onCreateuser({
    //   id: message?.user?.id,
    //   name: String(message?.user?.name),
    //   email: String(message?.user?.email),
    // });
  },
  async updateUser(message) {
    // await wait(50);
    console.log('event:updateUser | 🔥', message);
  },
  async linkAccount(message) {
    console.log('event:linkAccount| 🔥', message);

    if (!message.account && !message.user.name) {
      // await wait(50);
      console.error('event:linkAccount | no account or user.name found');
    }
  },
  async session(message) {
    console.log('event:session | 🔥', message);
    // await wait(50);
    console.log('event:session - active');
  },
};
