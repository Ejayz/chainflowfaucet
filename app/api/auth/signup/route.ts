import { createClient } from "@/utils/supabase/server";
import { verify } from "hcaptcha";
import { NextRequest, NextResponse } from "next/server";


const HCAPTCHA_SECRET_KEY = process.env.HCAPTCHA_SECRET_KEY || "";

export async function POST(request: NextRequest) {
  const { email, password,recaptchaToken } = await request.json();
    const supabase = createClient();
    if(!recaptchaToken){
        return NextResponse.json({error: "Recaptcha token is required"}, {status: 400});
    }
    if(!email || !password){
        return NextResponse.json({error: "Email and password are required"}, {status: 400});
    }
    const verifyHcaptcha= await verify(HCAPTCHA_SECRET_KEY, recaptchaToken);
    if(!verifyHcaptcha.success){
        return NextResponse.json({error: "Recaptcha verification failed"}, {status: 400});
    }



    
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.redirect(new URL("/auth/login", request.url));
}