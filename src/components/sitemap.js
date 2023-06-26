import axios from "axios";
import { useEffect, useState } from "react";

const Sitemapss = () => {
    const [test, setTest] = useState([]);
    const [test1, setTest1] = useState("");
    const [xmlDoc, setTest3] = useState([]);
    const [test4, setTest4] = useState([]);

    useEffect(() => {
        const xmlString = '<root><element>Value</element></root>';
        const parser = new DOMParser();
        const doc = parser.parseFromString(xmlString, 'text/xml');

        console.log(`<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://w3.org/1999/xhtml" xmlns:mobile="http://google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://google.com/schemas/sitemap-image/1.1" xmlns:video="http://google.com/schemas/sitemap-video/1.1">
        <url> <loc>https://softliee.com/</loc> </url>`);
        setTest3(doc)
        axios.get("https://softliee.com/softlee/public/api/brands").then((res) => {

            res.data.brands.map((item, index) => {

                let test = `<url><loc>https://softliee.com/new-mobile/${item.slug}</loc></url>`
                console.log(test);
                // setTest(p => [...p, test])
            })

        })
        axios.get("https://softliee.com/softlee/public/api/get_products").then((res) => {

            res.data.$products.map((item, index) => {

                let test = `<url><loc>https://softliee.com/${item.slug}</loc></url>`
                console.log(test);
                // setTest1(p => [...p, test])

            })

        })
        axios.get("https://softliee.com/softlee/public/api/get_blogs").then((res) => {

            res.data.blogs.map((item, index) => {
                let test = `<url><loc>https://softliee.com/details/${item.slug}</loc></url>`
                console.log(test);
                // setTest4(p => [...p, test])
            })

            console.log(" <url> <loc>https://softliee.com/compare-mobile-phone</loc> </> \n <url> <loc>https://softliee.com/ram/:id</loc> </> <url> <loc>https://softliee.com/compare-mobile-phone/:slug/:slug1</loc> </>  <url> <loc>https://softliee.com/searchresult</loc> </url> </urlset>");

        })

    }, [])


    // useEffect(() => {
    //     console.log(xmlDoc);
    // }, [xmlDoc])
    return (
        <>

            <div className="sitemap">
                <div>

                </div>
                {test.length > 0 && test ?
                    test.map((item, index) => {
                        return (
                            <>

                                <p>{item}</p>
                            </>
                        )
                    }) : <></>
                }
                {test1.length > 0 && test1 ?
                    test1.map((item, index) => {
                        return (
                            <>

                                <p>{item}</p>
                            </>
                        )
                    }) : <></>
                }
                {test4.length > 0 && test4 ?
                    test4.map((item, index) => {
                        return (
                            <>

                                <p>{item}</p>
                            </>
                        )
                    }) : <></>
                }


                <div>

                </div>
            </div>
        </>
    )
}
export default Sitemapss