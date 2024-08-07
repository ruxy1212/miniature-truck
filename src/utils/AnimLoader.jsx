const AnimLoader = () => {
    let classes = 'h-2.5 w-2.5 bg-current   rounded-full';

    return (
        <div className='flex'>
            <div className={`${classes} mr-1 animate-bounce`}></div>
            <div className={`${classes} mr-1 animate-bounce200`}></div>
            <div className={`${classes} animate-bounce400`}></div>
        </div>
    );
};

export default AnimLoader;