"use client"
export default  function CartTotal(props){
    return (
        <>
            <div className="cart_totals ">
                <h2>Cart Totals</h2>
                <table cellSpacing={0}>
                <tbody>
                    <tr className="cart-subtotal">
                    <th>Cart Subtotal</th>
                    <td>
                        <span className="amount">{props.subTotal.toFixed(2)} $</span>
                    </td>
                    </tr>
                    <tr className="shipping">
                    <th>Taxe {props.tax}%</th>
                    <td>{props.tax}$</td>
                    </tr>
                    <tr className="order-total">
                    <th>Order Total</th>
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
