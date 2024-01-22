export default function NewTweet(){

    const addTweet = async () => {
        'use server'

    }
    return (
        <form action={addTweet} className="">
            <input name="title" />
        </form>
    )
}