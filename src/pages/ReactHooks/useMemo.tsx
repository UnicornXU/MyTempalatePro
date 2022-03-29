import { useState, useMemo } from 'react';




function Button({ name, children }: any) {
    function changeName(name: number) {
        return name + '改变name的方法'
    }

    const otherName = useMemo(() => changeName(name), [name])
    return (
        <>
            <div style={{ width: '200px', height: '50px', backgroundColor: '#eeeeee' }}>{otherName}</div>
            <div style={{ color: 'red' }}>{children}</div>
        </>

    )
}



function App() {
    const [name, setName] = useState(0)
    const [content, setContent] = useState(0)
    return (
        <>
            <button onClick={() => setName(new Date().getTime())}>name</button>
            <button onClick={() => setContent(new Date().getTime())}>content</button>
            <Button name={name}>{content}</Button>
        </>
    )
}

const useMemoDemo = () => {
    return (
        <App />
    )
}
export default useMemoDemo;




