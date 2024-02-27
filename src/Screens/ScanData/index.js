import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactDOM from "react-dom";
import { logo } from "../../Assets/images";
import QRCode from "react-qr-code";
import './index.css'
const ScanData = () => {

    const { id } = useParams();
    const base_url = process.env.REACT_APP_API_URL;


    const [data, setData] = useState({});

    const [showModal, setShowModal] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [showModal3, setShowModal3] = useState(false);
    const [showModal4, setShowModal4] = useState(false);

    const inActive = () => {
        setShowModal(false)
        setShowModal2(true)
    }
    const Active = () => {
        setShowModal3(false)
        setShowModal4(true)
    }


    useEffect(() => {
        // document.querySelector('.loaderBox').classList.remove("d-none");
        document.title = 'Medical Customer Portal | User Management';
        const LogoutData = localStorage.getItem('login');

        fetch(`${base_url}/api/user/view_userdetails/${id}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(data)
                setData(data.data);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })


    }, []);

    return (
        <div className="scanLayout">
            <div className="container">
                <div className="dashCard mb-4">
                    <div className="row mb-3 justify-content-between">
                        <div className="col-md-12">
                            <div className="scannerLogo text-center">
                                <img src={logo} />
                            </div>
                        </div>
                        <div className="col-5 mb-2">
                            <h2 className="mainTitle text-capitalize">
                                {`${data?.name} Report`}
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="row">
                                        <div className="col-xl-4 col-md-6 mb-3">
                                            <h4 className="secondaryLabel">Name</h4>
                                            <p className="secondaryText">{data?.name}</p>
                                            {/* <p className="secondaryText">{profileData.name}</p> */}
                                        </div>
                                        <div className="col-xl-4 col-md-6 mb-3">
                                            <h4 className="secondaryLabel">Email Address</h4>
                                            <p className="secondaryText">{data?.email}</p>
                                            {/* <p className="secondaryText">{profileData.email}</p> */}
                                        </div>
                                        <div className="col-xl-4 col-md-6 mb-3">
                                            <h4 className="secondaryLabel">Phone Number</h4>
                                            <p className="secondaryText">{data?.user_details?.phone_number}</p>
                                            {/* <p className="secondaryText">{profileData.number}</p> */}
                                        </div>
                                        <div className="col-xl-4 col-md-6 mb-3">
                                            <h4 className="secondaryLabel">Address</h4>
                                            <p className="secondaryText">{data?.user_details?.address}</p>
                                            {/* <p className="secondaryText">{profileData.country}</p> */}
                                        </div>
                                        <div className="col-xl-4 col-md-6 mb-3">
                                            <h4 className="secondaryLabel">Gender</h4>
                                            <p className="secondaryText">{data?.user_details?.gender?.name}</p>
                                            {/* <p className="secondaryText">{profileData.country}</p> */}
                                        </div>
                                        <div className="col-xl-4 col-md-6 mb-3">
                                            <h4 className="secondaryLabel">Mobile Number</h4>
                                            <p className="secondaryText">{data?.user_details?.mobile_number}</p>
                                            {/* <p className="secondaryText">{profileData.country}</p> */}
                                        </div>
                                        <div className="col-xl-4 col-md-6 mb-3">
                                            <h4 className="secondaryLabel">Age</h4>
                                            <p className="secondaryText">{data?.user_details?.age}</p>
                                            {/* <p className="secondaryText">{profileData.country}</p> */}
                                        </div>
                                        <div className="col-xl-4 col-md-6 mb-3">
                                            <h4 className="secondaryLabel">Blood Group</h4>
                                            <p className="secondaryText">{data?.user_details?.bloodgroupdetails?.name}</p>
                                            {/* <p className="secondaryText">{profileData.country}</p> */}
                                        </div>
                                        <div className="col-xl-4 col-md-6 mb-3">
                                            <h4 className="secondaryLabel">Registered On</h4>
                                            <p className="secondaryText">{data?.created_at}</p>
                                            {/* <p className="secondaryText">{profileData.postal_code}</p> */}
                                        </div>
                                        <div className="col-xl-6 mb-3">
                                            <h4 className="secondaryLabel">Subscription Plan</h4>
                                            <p className="secondaryText">{data?.subscription_plan?.name}</p>
                                            {/* <p className="secondaryText">{profileData.address_1}</p>  */}
                                        </div>
                                        {/* <div className="col-xl-6 mb-3">
                                        <h4 className="secondaryLabel">No of File Categories</h4>
                                        <p className="secondaryText">{data?.user_category?.length}</p>
                                     
                                    </div> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScanData;
