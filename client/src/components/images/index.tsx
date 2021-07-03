import { Grid } from "platyplex_ui";
import React, { useEffect, useState } from "react";
import { disabledTxtColor, primaryColor, } from "../../config";

const Images = ({ images, style, hideIndex }: any) => {
  const [state, setter] = useState({
    images,
    index: images.length > 0 ? 0 : -1,
  });

  
  const setState = (obj: any) => setter({ ...state, ...obj });

  const changeIndex = (value: number) => {
    const newIndex = state.index + value;
    if (newIndex >= 0 && newIndex < state.images.length)
      setState({ index: newIndex });
  };

  const canChange = (newIndex: number) =>
    newIndex >= 0 && newIndex < state.images.length;

  const isActive = (active: boolean) =>
    active ? "shadow hoverr" : "disable hide";
  useEffect(() => setState({ images, index: 0 }), [images]);
  return (
    <div style={{ width: 108, height: 108, position: "relative", ...style }}>
      <PointerWrapper
        left
        className={isActive(canChange(state.index - 1))}
        action={() => changeIndex(-1)}
        active={canChange(state.index - 1)}
      >
        <i className={"fa fa-chevron-left"} />
      </PointerWrapper>
      <img
        src={state.images[state.index]}
        style={{ width: "100%", height: "100%", objectFit: 'cover', maxHeight: "30vh"}}
        alt=''
      />
      <Grid
        customCols={`1fr repeat(${state.images.length},auto) 1fr`}
        gridGap=".25em"
        margin=".75em"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          margin: ".2em",
          width: "100%",
        }}
      >
        {" "}
        <span></span>
        {!hideIndex && state.images.map((_: string, i: number) => (
          <span 
            key={i}
            className="round" 
            style={{background: state.index === i ? primaryColor : disabledTxtColor, zIndex: 1}}
          ></span>
        ))}
      </Grid>
      <PointerWrapper
        active={canChange(state.index + 1)}
        className={ isActive(canChange(state.index + 1))}
        action={() => changeIndex(1)}
      >
      <i className="fa fa-chevron-right pointer" />
      </PointerWrapper>
   
    </div>
  );
};

const PointerWrapper = ({ action, className, children, left, active }: any) => (
<Grid
 style={{
    position: "absolute",
    height: '100%',
    top: 0,
    ...left? {left: 0} : {right: 0},
  }}
>
  <div
    style={{
        margin: ".5em",
        background: active? "white" : disabledTxtColor,
        padding: ".15em .5em",
        borderRadius: "50%",
    }}
    className={"pointer " + className}
   
    onClick={action}
  >
    {children}
  </div>
  </Grid>
);

export default Images;
