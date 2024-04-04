import styled from "styled-components";

export const WrapperHeaderText = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    color :rgb();
    font-size:26px; 
`
export const WrapperClosed = styled.div`
    font-size: 30px;
    display: flex;
    justify-content: flex-end;
    cursor:pointer;
    margin: 0;
    &:hover{
        color: red;
    }
`
export const WrapperLabel = styled.label`
    color: #000;
    font-size: 16px;
    line-height: 30px;
    font-weight: 400;
    width: 200px;
    margin-left : 10px;
    text-align: left;
`

export const WrapperInput = styled.div`
    align-items: center;

    gap: 20px;
`
