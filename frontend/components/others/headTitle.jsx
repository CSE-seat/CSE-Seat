import Head from "next/head";
import React from "react";

const HeadTitle = ({title}) => {
    return (
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{title} | CSE Seat</title>
        </Head>
    );
}

export default HeadTitle;