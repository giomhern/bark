import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
export const dynamic = "force-dynamic";
export async function GET(request: NextRequest){
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    if(code){
        const supabase = createRouteHandlerClient({ cookies }, {supabaseKey: process.env.NEXT_PUBLIC_ANON_KEY, supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL})
        await supabase.auth.exchangeCodeForSession(code) // authenticate the user
    }

    return NextResponse.redirect(requestUrl.origin)
}