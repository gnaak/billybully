/** @jsxImportSource @emotion/react */  
import { useEffect, useState } from "react";
import { css } from '@emotion/react';  

export default function GameRoom({room}: {room : any[]}) {   
    
return (
    <div css={card}> 
    </div>
    );
}

const card = css` 
    width: 340px;
    height: 100px;
    display: flex;
    position: relative;
    background-color: rgba(255, 255, 255, 0.7);
    &:hover {
    box-shadow: 5px 5px 10px lightgray;
    } 
`;