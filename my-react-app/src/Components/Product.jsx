function Product({productName, productQuantity,image}) {
    return (
        <div className="product" style={{
            textAlign: "center"
        }}>
        <h2 >{productName}</h2>
        <img src={image} alt="" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos odio blanditiis quo necessitatibus aliquam ullam facilis? Dicta dolore eaque quasi eveniet reprehenderit, nobis, odit facere, quo quidem aperiam quisquam laboriosam.</p>
        <p>Quantity: {productQuantity}</p>
        <button className="btn">Add to Cart</button>
        </div>
    );
}

export default Product;