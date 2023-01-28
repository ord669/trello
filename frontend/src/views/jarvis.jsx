import { useEffect, useState } from "react";


export function Jarvis({ setIsOpenJarvis }) {

    useEffect(() => {
        const scriptSrcs = ["https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/TweenLite.min.js", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/EasePack.min.js", "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/demo.js"]

        scriptSrcs.forEach(src => {
            const script = document.createElement("script");
            script.src = src
            script.async = true
            document.body.appendChild(script);
        })
    }, [])

    return (
        <section>
            <div className="container demo">
                <div className="content">
                    <div id="large-header" className="large-header">
                        <canvas id="demo-canvas"></canvas>
                        <h1 className="main-title">Jarvis.ai</h1>
                    </div>
                </div>
            </div>
        </section>
    )
}