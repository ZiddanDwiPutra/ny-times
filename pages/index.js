import { useEffect, useState } from "react"
import ArticleList from "../components/article-list"
import Balance from "../src/balance"
import StorageManager from "../src/storageManager"
import WelcomeImg from "../public/assets/4989777.jpg"
import Image from "next/image"

export default function Home({app}){

    useEffect(()=>{
        const userName = StorageManager.getUserName()
        if(userName==null) {
            setTimeout(()=>{
                app.showDialog({
                    title : "Welcome "+ app.userName + " !!", 
                    type : app.dialogType.DIALOG, 
                    body : <WelcomeBody/>, 
                    footer: <WelcomeFooter app={app}/>,
                    dialogSize: app.dialogSize.SM
                })
            }, 100)
        }
    }, [])
    return(
        <div className="container" style={{marginTop: "1rem"}}>
            <ArticleList app={app}/>
        </div>
    )
}

function WelcomeBody(){
    return(
        <div className="fs-15">
            Congratulations, you got 100,000 coins as initial credit, coins can be used as payment, browse and explore various articles in the New York Times. 
            <div className="fs-10"> * Click Browse button below to continue</div>
            <div className="mb-1" align="center">
                <Image alt="welcome-party" src={WelcomeImg} width={200} height={180}/>
            </div>
            <div align="center">
                <a href="https://www.freepik.com/vectors/welcome-party"  className="fs-10">Welcome party vector created by storyset - www.freepik.com</a>
            </div>
        </div>
    )
}

function WelcomeFooter(app){
    return(
        <div align="center" className="absolute-bottom">
            <button className="fs-15 btn-blue" onClick={()=>browseClick(app)}>BROWSE</button>
        </div>
    )
}

function browseClick(emit){
    _addTenThousand(emit.app)
    emit.app.closeDialog()
    StorageManager.setUserName(emit.app.userName)
}

function _addTenThousand(app){
    StorageManager.addBalanceHistory({
        total: 100000,
        refId: "",
        refObject: "INITIAL_COIN",
        type: Balance.TYPE.COIN
    })
    app.refreshBalance()
}