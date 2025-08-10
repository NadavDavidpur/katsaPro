import '../style.css'

function MessageAnouther({body,workerName,date,avatar}){
    return(
        <div>
             <div className="direct-chat-info clearfix justify-content-end position-absolute end-0">
                
                    <span className="direct-chat-timestamp text-left">{date}</span>
                    <span className="direct-chat-name text-right">{workerName}</span>
                    
             </div>
            <div className="pt-3">
                <div className="d-flex flex-row justify-content-end mb-4">
                    <div
                        className="p-3 me-3 border"
                        style={{ borderRadius: "15px", backgroundColor: "#fbfbfb" }}
                    >
                        <p className="small mb-0">
                           {body}
                        </p>
                    </div>
                    <img
                        src={avatar}
                        alt="avatar 1"
                        style={{ width: "45px", height: "100%" }}
                        />
                </div>
            </div>
        </div>
    )
}
export default MessageAnouther;