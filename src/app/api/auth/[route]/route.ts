import { ACCESS_TOKEN_KEY } from "@/utils/constant";
import httpClient from "@/utils/httpClient";
import { cookies } from "next/headers";
import { NextRequest , NextResponse } from "next/server";

// Login 
export async function POST(
    request : NextRequest,
    context : {
        params:{
            route : string
        };
    }
):Promise<any>{
   const route = context.params.route;
   const body = await request.json();
   if(route === "signin"){
    return signin(body);
   }
}
//test get 
export async function  GET(
    request : NextRequest,
    context : {
        params:{
        route : string;
        };
    }
):Promise<any>{
    const route = context.params.route
    return NextResponse.json({route});
}

async function signin(body:{
    username:string,
    password:string
}):Promise<any>{try{
    const response = await httpClient.post('/authen/login',body);
    const {token} = response.data;
    cookies().set(ACCESS_TOKEN_KEY,token,{
        httpOnly:true,
        secure: process.env.NODE_ENV !== "development",
        sameSite:"strict",
        path:"/"
    })
    return NextResponse.json(response.data);
}catch(error:any){
    return NextResponse.json({result:"not validation"})
}}