import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home_bg = () => {
    const navigate = useNavigate()
    return (
        <div className="md:min-h-[80vh] h-[80vh] relative bg-[url(src/assets/light-1246043_1280.jpg)] bg-no-repeat bg-center bg-cover  bg-gray-50 flex flex-col ">
            <section className="absolute flex flex-col md:flex-row items-center justify-center md:space-x-10 max-w-6xl mx-auto px-4 py-20 ">
                {/* Text Section */}
                <div className="">
                    <h1 className="md:text-8xl text-4xl font-extrabold text-black mb-4">
                        Create a Blog <span className="text-gray-100">Worth Sharing</span>
                    </h1>
                    <p className="text-lg text-slate-200  mb-24">
                        Bring your ideas to life by writing and managing your blog whenever inspiration strikes, on your desktop or on the go.
                    </p>
                    <button onClick={()=>navigate("/createPost")} className="bg-black text-2xl text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-950 transition duration-300">
                        Start Blogging
                    </button>
                </div>
            </section>
        </div>
    )
}

export default Home_bg
