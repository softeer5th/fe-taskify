import {component, div, h1, useState} from "./react.js";
import Test from "./Test.js";

export default function App() {
    const [state, setState] = useState(1)

    const onClickHandler = (e) => {
        setState(state+1)
    }
    console.log('렌더링 App')

    return (
        component(div, {children: [
                component(Test, {key:1, className: 'test1', children: [
                    'Test1'
                    ]}),
                component(Test, {key:2, memo: () => true, className: 'test2', children: [
                    'Test2'
                    ]}),
                component(Test, {key:3, className: 'test3', ha: onClickHandler, value: state, children: [
                    'Test3'
                    ]}),
            ]})
    )
}