import Footer from "./small/footer"
import Header from "./small/header"

const NotFound = () => {
    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">

                        <img className="fourzero" src="../../assets/images/404.png" alt="" />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export default NotFound