import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Post from "./Post"

const Posts = () => {
    const [realtimePosts] = useCollection(
        db.collection('posts').orderBy("timeStamp", "desc")
    );
    console.log({ realtimePosts })
    return (
        <div>
            {realtimePosts?.docs.map(post => (
                <Post
                    key={post.id}
                    name={post.data().name}
                    email={post.data().email}
                    message={post.data().message}
                    timeStamp={post.data().timeStamp}
                />
            ))}

        </div>
    )
}

export default Posts
