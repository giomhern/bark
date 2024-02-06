import { createClient } from "@supabase/supabase-js";

let supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL || "TODO: Supabase url"
let supabase_key = process.env.NEXT_PUBLIC_SUPABASE_KEY || "TODO: Supabase key"

export default async function handler(req: any, res: any){
    console.log('req method: ', req.method)
    console.log('req object: ', req)
    if(req.method == 'POST'){
        const {tweet, userId} = req.body;
        const supabase = createClient(
            supabase_url,
            supabase_key
        );

        const {data, error} = await supabase.from("tweets").insert([{ tweet, user_id: userId }]);
        if(error){
            return res.status(500).json({error:error.message})
        }
        return res.status(200).json({data});
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}