import {component, useRef, useState} from "../../../react.js";
const C = component
import {li, h3, pre, span, div, button} from "../../../react-dom-element.js";
import Button from "../component/IconButton.js";


export default function Card({title, text}) {


    return (
        C(li, {className: 'card', draggable: true, children: [
            C(div, {className: 'textArea', children: [
                C(h3, {children: [title]}),
                C(pre, {children: [text]}),
                C(span, {children: ['author by web']}),]}),
            C(div, {className: 'iconButtons', children: [
                C(Button, {type: 1}),
                C(Button, {type: 2}),]})]})
    )
}