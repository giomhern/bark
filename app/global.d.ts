import { Database as db} from "@/lib/databases.types";

type Tweet = Database['public']['Tables']['tweets']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']

declare global {
    type Database = db
    type TweetWithAuthor = Tweet & {
        author: Profile;
        likes: number;
        user_has_liked_tweet: boolean;
    }

}