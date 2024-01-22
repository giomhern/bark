import { Database as db} from "@/lib/databases.types";

declare global {
    type Database = db
}