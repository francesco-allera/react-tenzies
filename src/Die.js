import React, { Fragment } from "react";

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#1F51FF" : "#FF3131"
    }

    return (
        <div className="die" style={styles} onClick={props.handleClick} >
            <span>
                {
                    props.value % 2 !== 0 &&
                    <i className="central"></i>
                }
                {
                    props.value >= 2 &&
                    <Fragment>
                        <i className="top left"></i>
                        <i className="bottom right"></i>
                    </Fragment>
                }
                {
                    props.value >= 4 &&
                    <Fragment>
                        <i className="top right"></i>
                        <i className="bottom left"></i>
                    </Fragment>
                }
                {
                    props.value >= 6 &&
                    <Fragment>
                        <i className="center left"></i>
                        <i className="center right"></i>
                    </Fragment>
                }
            </span>
        </div>
    )
}