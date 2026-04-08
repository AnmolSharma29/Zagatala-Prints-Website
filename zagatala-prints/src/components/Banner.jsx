export default function Banner(){
    return(
        <section className="w-full">
        <div className="mx-auto">
            <div className="relative w-full overflow-hidden">
            <img
                src="/zagatala.png"
                alt="Zagatala Prints Banner"
                className="w-full h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
            />
            {/* Optional overlay + text */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white px-4">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                    {/* Your Banner Headline */}
                </h2>
                <p className="mt-2 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
                    {/* Your subtext goes here */}
                </p>
                </div>
            </div>
            </div>
        </div>
        </section>
    )
}