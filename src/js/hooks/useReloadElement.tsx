import * as React from 'react';



export default function useReloadElement() {

    const [, setState] = React.useState<Boolean>(true);


    const reloadElement = () => {
        setState(previous => !previous)
    }


    return {reloadElement};
}