import TopServer from "../top/topServer";
 
function ProductWidgetArea () {
    return (
        <div className="product-widget-area">
            <div className="zigzag-bottom" />
            <div className="container">
                <div className="product-grid">
                    <TopServer name="Top Sellers" api="http://localhost:3000/top-sellers-products"/>
                    <TopServer name="Recently Viewed" api="" />
                    <TopServer name="Top New" api="http://localhost:3000/top-new-products"/>
                </div>
            </div>
        </div>
    )
}
export default ProductWidgetArea;
