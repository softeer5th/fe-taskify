import {createComponent, useState} from "../../../lib/react.js";
import {svg, path} from "../../../lib/react-dom-element.js";

const C = createComponent


export default function Sort({width = '12', height = '12', stroke = '#6E7191'}) {

    return (
        C(svg, {
            width: width, height: height, viewBox: '0 0 12 12', fill: 'none', children: [
                C(path, {
                    d: "M8.91634 10.6667V1.33333M8.91634 1.33333L10.6663 3.08333M8.91634 1.33333L7.16634 3.08333M3.08301 1.33333V10.6667M3.08301 10.6667L4.83301 8.91667M3.08301 10.6667L1.33301 8.91667",
                    stroke: stroke, strokeWidth: '1.5', strokeLinecap: "round", strokeLinejoin: "round"
                })
            ]
        })
    )
}
