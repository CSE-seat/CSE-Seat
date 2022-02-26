import styled from 'styled-components';
import Link from "next/link";
import React from 'react';

const StyledResDiv = styled.div`
    width: 100%;
    height: 100%;
    @media(min-width: 768px){
        min-height: calc(100vh - 60px - 150px);
    }
    @media (min-width: 480px) and (max-width: 767px){
        min-height: calc(100vh - 100px - 150px);
    }
    @media(max-width: 479px){
        min-height: calc(100vh - 100px - 220px);
    }
`;

const BorderDiv = styled(StyledResDiv)`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    @media(min-width: 768px){
        border: solid;
        border-width: 0 1px;
        border-color: #ddd;
        box-shadow: 0 -5px 6px 2px #ddd;
    }
`;

const StyledPageDiv = styled(StyledResDiv)`
    display: ${(props) => props.dis};
    justify-content: ${(props) => props.jus};
    align-items: ${(props) => props.ali};
    flex-direction: ${(props) => props.dir};
`;

const StyledDiv = styled.div`
    display: ${(props) => props.display};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    justify-content: ${(props) => props.jusContent};
    align-items: ${(props) => props.alignItem};
    flex-direction: ${(props) => props.flexDir};
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding};
    background-color: ${(props) => props.color};
    gap: ${(props) => props.gap};
    overflow: ${(props) => props.hidden ? "hidden" : ""};
    ${(props) => props.flexWrap ? "flex-wrap:wrap" : ""};
`;

const StyledA = styled.a`
    display: ${(props) => props.display};
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    justify-content: ${(props) => props.jusContent};
    align-items: ${(props) => props.alignItem};
    flex-direction: ${(props) => props.flexDir};
    cursor: pointer;
    margin: ${(props) => props.margin};
    padding: ${(props) => props.padding};
    gap: ${(props) => props.gap};
    ${(props) => props.border ? `
    border: 1px solid #ddd;
    ` : ``}
    font-size: ${(props) => props.fontSize};
`;

const PageDiv = ({
    children,
    dis,
    jus,
    ali,
    dir,
    }) => {
    
    const props = {
        dis, jus, ali, dir
    };

    return <StyledPageDiv {...props}>{children}</StyledPageDiv>;
}

const Div = ({
    children,
    display="flex",
    flexDir="row",
    jusContent="center",
    alignItem="center",
    flexWrap=false,
    width="",
    height="100%",
    margin="",
    padding="",
    color="",
    gap="",
    hidden=false
    }) => {
    
    const props = {
        display, jusContent, alignItem, width, height, flexDir, margin, padding, color, gap, hidden, flexWrap
    };

    return <StyledDiv {...props}>{children}</StyledDiv>;
}

const MyLink = ({
    children,
    href="/",
    passHref=false,
    display="flex",
    flexDir="row",
    jusContent="center",
    alignItem="center",
    width="100px",
    height="50px",
    margin,
    padding,
    gap,
    border=false,
    fontSize
    }) => {
        
        const props = {
            display, jusContent, alignItem, width, height, flexDir, margin, padding, gap, border, fontSize
        };

    return (
        <Link href={href} passHref={passHref}>
            <StyledA {...props}>
                {children}
            </StyledA>
        </Link>
    );
}

export {Div, PageDiv, MyLink, StyledResDiv, BorderDiv};