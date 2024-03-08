const Avatar = ({name, size}: { name: string, size: "big" | "small" }) => {
    return (
    <div className={`rounded-full bg-slate-300 ${size === "small" ? "w-7 h-7" : "w-10 h-10"} flex justify-center items-center font-semibold ${size === "big" ? "text-xl" : ""}`} >{name[0].toUpperCase()}</div>
    )
}

export default Avatar