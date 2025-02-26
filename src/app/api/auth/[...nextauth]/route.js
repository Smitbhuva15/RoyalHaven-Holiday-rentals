import prisma from "@/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";



export const authOptions = {

  adapter:PrismaAdapter(prisma),
  session:{
    strategy:'Jwt'
  }
,
    pages:{
        signIn: '/auth/login',
    }
,
    providers: [
        CredentialsProvider({
            name: "Credentials",
          
            credentials: {
              email: { label: "Username", type: "text", placeholder: "jsmith@gmail.com" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
             
              if(!credentials.email || !credentials.password){
                return null
              }

              const isExistUser=await prisma.user.findUnique({
                where:{
                  email:credentials.email
                }
              })
              if(!isExistUser){
                return null
              }

              const matchpassword=await bcrypt.compare(credentials.password,isExistUser.password)
              if(!matchpassword){
                return null
              }

              return{
                id:isExistUser.id,
                email:isExistUser.email,
                userName:isExistUser.userName
              }
             
            }
          })
     
    ],
  }

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
