import Components from "../../styles/Components.module.css"
import { useRouter } from 'next/router'

export default function ArticleDetail({ app }){
    const router = useRouter()
    const { param } = router.query
    let article = undefined
    if(param)article = app.decodeFromParamUri(param)
    
    
    if(article == undefined) return <div> Article Not Found ( id : {article.id}) </div>
    return (
        <div className={Components.box + " container-fluid"}>
            <div className="row">
                {article.id}
            </div>
        </div>
    )
}