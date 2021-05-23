import Image from "next/image";
import { useEffect, useState } from "react";


function Post({ key, name, email, message, timeStamp }) {
    const [postImageurl, setpostImageurl] = useState("")
    return (
        <div className="flex flex-col">
            <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
                <div className="flex items-center space-x-2">
                    <Image src="https://picsum.photos/40/40" className="rounded-full" width={40} height={40} />
                    <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-xs text-gray-400">
                            {new Date(timeStamp?.toDate()).toLocaleString()}
                        </p>

                    </div>
                </div>
                <p className="pt-4">{message}</p>
            </div>

            <div className="relative">
                <Image src="https://picsum.photos/400/400" objectFit="cover" layout="fill" />
            </div>
        </div>
    )
}

export default Post
