import React from 'react';
import Lottie from 'lottie-react';
import code from './hacker.json';
import classNames from 'classnames';

const CodeAnimation = (props) => {
    return (
        <Lottie
            {...props}
            className={classNames('inline-block', props.className)}
            animationData={code}
            loop={true}
        />
    );
};

export default CodeAnimation;
