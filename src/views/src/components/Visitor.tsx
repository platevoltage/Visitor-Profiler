import { useState} from 'react';
type Props = {
    visitor: IVisitor;
}
export interface IVisitor {
    hidden: boolean;
    id: number;
    ip: string,
    time: string,
    userAgent: string,
    city: string,
    region: string,
    country: string,
  }
const dataPath = process.env.NODE_ENV === "development" ? "http://localhost:3004" : "";



export function Visitor({visitor}: Props) {
    const [rawData, setRawData] = useState();
    const [showRaw, setShowRaw] = useState(false);
    const [hidden, setHidden] = useState(false);

    const getRaw = async (id: number) => {
        const show = !showRaw;
        if (show) {
            const response = await fetch(`${dataPath}/raw/${id}`);
            const data = await response.json();
            setRawData( data );
            setShowRaw(true);
        } else {
            setShowRaw(false);
        }   
    }
    const hide = async (id: number) => {
        await fetch(`${dataPath}/hide/${id}`, {
            method: 'PUT'
        });
        setHidden(true);
    }
    const show = async (id: number) => {
        await fetch(`${dataPath}/show/${id}`, {
            method: 'PUT'
        });
        setHidden(false);
    }
    console.log(!!visitor.hidden)
    return (
        <>
        {
            hidden ?
            <div className="visitor">
                <p><b>{visitor.ip}</b></p>
                <button onClick={() => show(visitor.id)}>Show</button>
            </div>
            :
            <div className="visitor">
                <p><b>{visitor.ip}</b></p>
                <p>{visitor.time}</p>
                <p>{visitor.userAgent}</p>
                <p>{visitor.city}</p>
                <p>{visitor.region}</p>
                <p>{visitor.country}</p>
                <button onClick={() => getRaw(visitor.id)}>{showRaw ? <>Hide</> : <>Show</>} Raw Data</button>
                <button onClick={() => hide(visitor.id)}>Hide</button>
                {showRaw && <pre>{JSON.stringify(rawData, null, 2)}</pre>}

            </div>
        }
        </>
      );
    }