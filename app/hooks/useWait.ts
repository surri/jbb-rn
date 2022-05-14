const useWait = () => (timeout: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout)
    })
}

export default useWait
