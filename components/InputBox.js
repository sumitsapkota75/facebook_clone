import { useSession } from "next-auth/client"
import Image from "next/image"
import { CameraIcon, EmojiHappyIcon, VideoCameraIcon } from "@heroicons/react/solid"
import { useRef, useState } from "react"
import { db, storage } from "../firebase"
import firebase from "firebase";

const InputBox = () => {
    const [session] = useSession()
    const inputRef = useRef(null)
    const filePickerRef = useRef(null);
    const [imagetoPost, setImageToPost] = useState(null);

    const addImageToPost = (e) => {
        console.log("sssss")
        const reader = new FileReader();
        const file = e.target.files[0]
        console.log(e.target.files[0])
        if (file) {
            reader.readAsDataURL(file)
        }
        console.log("jjjj")
        reader.onload = (readerEvent) => {
            setImageToPost(readerEvent.target.result)
        }
    }

    const removeImage = () => {
        setImageToPost(null);
    }

    const addPosts = (e) => {
        e.preventDefault();
        if (!inputRef.current.value) return;
        db.collection('posts').add({
            message: inputRef.current.value,
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            timeStamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(doc => {
            if (imagetoPost) {
                const uploadTask = storage.ref(`posts/${doc.id}`).putString(imagetoPost, 'data_url')
                removeImage();

                uploadTask.on('state_change', null, error => console.error(error), () => {
                    // when the upload completes
                    storage.ref(`posts`).child(doc.id).getDownloadURL().then(url => {
                        db.collection('posts').doc(doc.id).set({
                            postImage: url
                        }, { merge: true })
                    })
                })
            }
        })
        inputRef.current.value = "";
    }
    return (
        <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
            <div className="flex space-x-4 p-4 items-center">
                <Image className="rounded-full"
                    src={session.user.image}
                    width={40}
                    height={40}
                    layout="fixed"
                />
                <form className="flex flex-1">
                    <input ref={inputRef} className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none" type="text" placeholder={`Whats on your mind, ${session.user.name}`} />
                    <button className="focus:outline-none" type="submit" onClick={addPosts} >Submit</button>
                </form>
                {imagetoPost && (
                    <div onClick={removeImage}
                        className="flex flex-col filter hover:brightness-110 transform hover:scale-105 cursor-pointer"
                    >
                        <img className="h-10 object-contain" src={imagetoPost} alt="" />
                        <p className="text-xs text-center">Remove</p>
                    </div>
                )}
            </div>
            <div className="flex justify-evenly p-3 border-t">
                <div className="inputIcon">
                    <VideoCameraIcon className="h-7 text-red-500" />
                    <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
                </div>

                <div className="inputIcon" onClick={() => filePickerRef.current.click()}>
                    <CameraIcon className="h-7 text-green-400" />
                    <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
                    <input hidden ref={filePickerRef} type="file" onChange={addImageToPost} />
                </div>
                <div className="inputIcon">
                    <EmojiHappyIcon className="h-7 text-yello-300" />
                    <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
                </div>
            </div>
        </div>
    )
}

export default InputBox
