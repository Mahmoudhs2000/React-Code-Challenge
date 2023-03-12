import React, { useEffect, useState } from 'react'
import Box from './Box';

const Queue = ({newItem}) => {
    const [update, setUpdate] = useState(false)
    const [lines, setLines] = useState([[4,2], [1,2], [3,1], [], [10,2,1]]);


    const addToQueue = (item) => {

        const initialMin = lines[0].reduce((_prev,_cur)=> _prev+=_cur, 0);

        let result = lines.reduce((prev, cur, curI) => {

            const _sum = cur.reduce((_prev,_cur)=> _prev+=_cur, 0)

			return _sum < prev.min ? {i: curI, min: _sum} : prev
        }, 
        {i: 0, min: initialMin  })
        
        let _lines = lines;
        _lines[result.i] = [..._lines[result.i], parseInt(item)];
        setLines(_lines)
        setUpdate((u) => !u)
    };

    const updateLines = () => {
        let curLines = lines;
    
        ( curLines.some((l) => l.length) ) && curLines.forEach((line, i) => {
            if(typeof curLines[i][0] === 'number'){
                ( --curLines[i][0] === 0 ) && ( curLines[i] = curLines[i].slice(1) )
            }
        });
        
        setLines(curLines);
        setUpdate((u) => !u)
    }

    const startQueueProgress = () => { 
        setInterval(() => { updateLines() }, 3000);
    };

    useEffect(() => { startQueueProgress() }, [])
    useEffect(() => {  }, [update])
    
    useEffect(() => { newItem && addToQueue(newItem) }, [newItem])
    
    return (
        <div className='lines-container' >
            {lines.map((line,i) => <div key={i} >
                <div className='box main-box ' />
                {
                    line.map((item, k) => <Box key={k} itemsCount={item} /> )
                }
            </div> )}
        </div>
    )
}

export default Queue