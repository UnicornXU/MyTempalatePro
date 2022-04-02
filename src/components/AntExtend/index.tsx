import React from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';

import './index.less';

interface RibbonProps extends CardProps {
    text: string;
    ribbonbgStyle?: React.CSSProperties;
    content?: React.ReactNode
}

export const Ribbon = (props: RibbonProps) => {
    return (
        <Card style={{ marginBottom: '10px' }}>
            <div className='ribbon-wrapper'>
                {props.content}
                <div className='ribbon ribbon-placement-end' style={props.ribbonbgStyle}>
                    <span className='ribbon-text'>{props.text}</span>
                    <div className='ribbon-corner'></div>
                </div>
            </div>
        </Card>
    )
}
