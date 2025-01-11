import {component, useState} from "../../../react.js";
const C = component
import {li, h3, pre, span, div, button} from "../../../react-dom-element.js";
import Close from "../../../component/svg/Close.js";
import Edit from "../../../component/svg/Edit.js";


export default function Card({title, text}) {


    return (
        C(li, {className: 'card', children: [
            C(div, {className: 'textArea', children: [
                C(h3, {children: [title]}),
                C(pre, {children: [text]}),
                C(span, {children: ['author by web']})
            ]}),
            C(div, {className: 'iconButtons', children: [
                C(button, {children: [
                        C(Close, {}),
                    ]}),
                C(button, {children: [
                        C(Edit, {})
                    ]})
            ]})
        ]})
    )
}