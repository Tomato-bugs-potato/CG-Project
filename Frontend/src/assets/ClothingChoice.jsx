import { useGLTF } from "@react-three/drei";
import React from "react";

export default function ClothingChoice({choice}) {
    console.log("colthing choice model",choice);
    function Model({location, position}){
        if(location == "") return null;
        const {scene} = useGLTF(location);
        return <primitive object={scene} position={position}/>;
    }
    return (
        <group>
            {choice.Top != "" &&
                <Model location={choice.Top} position={[0, 1, 0]}/>
            }
            {choice.Bottom != "" &&
                <Model location={choice.Bottom} position={[0, 0, 0]}/>
            }
            {choice.Shoe != "" &&
                <Model location={choice.Shoe} position={[0, -1, 0]}/>
            }
        </group>
    );
}
