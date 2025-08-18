"use client"
export default  function CartTotal(props){
    return (
        <>
            <div className="cart_totals ">
                <h2 style={{color:"black"}}>Cart Totals</h2>
                <table cellSpacing={0}>
                <tbody style={{color:"black"}}>
                    <tr className="cart-subtotal">
                    <th >Cart Subtotal</th>
                    <td>
                        <span className="amount">{props.subTotal.toFixed(2)} $</span>
                    </td>
                    </tr>
                    <tr className="shipping">
                    <th>Taxe {props.tax}%</th>
                    <td style={{color:"black"}}>{props.tax}$</td>
                    </tr>
                    <tr className="order-total">
                    <th >Order Total</th>
                    <td>
                        <strong>
                        <span className="amount">{props.total.toFixed(2)} $</span>
                        </strong>{" "}
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </>
    );
}
