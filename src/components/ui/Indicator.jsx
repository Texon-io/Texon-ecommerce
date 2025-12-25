function Indicator({loaded, total}) {
    return (
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-black transition-all duration-500 rounded-full"
                    style={{ width: `${Math.min((loaded / total) * 100, 100)}%` }}
                />
            </div>
    )
}

export default Indicator;
