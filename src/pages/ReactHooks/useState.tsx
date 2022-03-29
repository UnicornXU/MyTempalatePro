import React, { useState, useEffect, useContext, useReducer } from 'react';
import useFriendStatus from '@/utils/customhooks';
import { Button, Space, Avatar } from 'antd';


const themes = {
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    }
};
const ThemeContext = React.createContext(themes.light);
const initialState = { count: 0 };

function App() {
    return (
        <ThemeContext.Provider value={themes.light}>
            <Toolbar />
        </ThemeContext.Provider>
    );
}

function Toolbar() {
    return (
        <div>
            <ThemedButton />
        </div>
    );
}

function ThemedButton() {
    const theme = useContext(ThemeContext);
    return (
        <button style={{ background: theme.background, color: theme.foreground }}>
            I am styled by theme context!
        </button>
    );
}
function reducer(state: any, action: any) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        default:
            throw new Error();
    }
}


function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </>
    )

}


const useStateDemo = () => {
    const [count, setCount] = useState(0);
    const isRecipientOnline = useFriendStatus(count);
    // 相当于componentDidMount componentDidUpdate
    useEffect(() => {
        // 改变文档标题
        document.title = `满身污泥的英雄${count}`;
        return () => {
            console.log('组件卸载')
        }
    }, [count]) // 加第二参代表componentDidMount 初始化,里面若有值,会根据值变化而更新

    console.log(isRecipientOnline, '对的')
    return (
        <div>
            <Counter />
            <App />
            <p>你点击了{count}下</p>
            <Avatar style={{ backgroundColor: isRecipientOnline ? 'green' : 'red', verticalAlign: 'middle' }} >
                You
            </Avatar>
            <Space>
                <Button onClick={() => { setCount(count + 1) }} type="primary">点击</Button>
                <Button onClick={() => { setCount(count - 1) }} type="primary">点击减少</Button>
            </Space>
        </div>
    )
}

export default useStateDemo;