import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
const handler=NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
        }),
       
      ],
      callbacks: {
        
        async session({ session, token}) {
          session.user.username="@"+session.user.name.split(' ').join('').toLocaleLowerCase();          //this is to add extra cookies to backend
          session.user.uid=token.sub;
          return session
        }
      }
      
})
export { handler as GET, handler as POST }