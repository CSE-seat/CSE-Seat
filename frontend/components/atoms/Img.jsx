import styled from 'styled-components';

// interface ImgProps{
//     length?: string;
//     invert?: boolean;
//     objectFit?: string;
//     radius?: string;
//     src: string;
// }

const StyledImg = styled.img`
    width:${(props) => props.length};
    height:${(props) => props.length};
    filter: invert(${(props) => props.invert ? 1 : 0});
    object-fit: ${(props) => props.objectFit};
    border-radius: ${(props) => props.radius};
`;

const SquareImg = ({
    length="40px",
    invert=false,
    objectFit="fill",
    radius="0",
    src
}) => {

    const props = {
        length, invert, objectFit, radius
    }

    return (
        <StyledImg src={src} {...props} />
    );
}

export default SquareImg;