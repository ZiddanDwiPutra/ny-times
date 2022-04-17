export default function PurchaseConfirmationBody({app, article}){
    return (
        <div>
            <div className="bold mb-1">Do you agree to the following purchases:</div>
            <div>
                <table className="table-no-border">
                <tbody>
                    <tr>
                        <td className="fs-15" style={{width: "150px"}}>Article Title</td>
                        <td style={{width: "20px"}}>:</td>
                        <td><span className="light fs-15">{article.title}</span></td>
                    </tr>
                    <tr>
                        <td className="fs-15">Published on</td>
                        <td>:</td>
                        <td><span className="light fs-15">{article.publishDate}</span></td>
                    </tr>
                    <tr>
                        <td className="fs-15">Price</td>
                        <td>:</td>
                        <td><span className="light fs-15">{article.price == 0 ? "FREE" : article.price + " NYT Coin"}</span></td>
                    </tr>
                </tbody>
                </table>
            </div>
            <div>
                <ul>
                    <li className="fs-10">by clicking the accept button, you mean that you have knowingly agreed to all the terms and conditions of purchase</li>
                    <li className="fs-10">Purchased content cannot be refunded</li>
                    <li className="fs-10">You have also agreed to all customer rules applied to the NY Times</li>
                </ul>
            </div>
        </div>
    )
}