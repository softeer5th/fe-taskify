import {component, useRef, useState, useEffect} from "../react.js";
const C = component
import {h1, header} from "../react-dom-element.js";


export default function Header() {


    return (
        C(header, {className: "header", children: [
            C(h1, {children: [
                'TASKIFY'
            ]})
        ]})
    )
}