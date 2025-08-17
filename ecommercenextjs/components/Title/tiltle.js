export default function Title (props) {
    return(
        <div className="product-big-title-area">
            <div className="container">
                <div className="product-bit-title text-center">
                    <h2>{props.name}</h2>
                </div>
            </div>
        </div>
    );
}