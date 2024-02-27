import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faFilePdf, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";

const UserManagementDetail = () => {
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

    fetch(`${base_url}/api/user/view_userdetails`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LogoutData}`
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
    <>
      <DashboardLayout>
        <div className="dashCard mb-4">
          <div className="row mb-3 justify-content-between">
            <div className="col-5 mb-2">
              <h2 className="mainTitle">
                <BackButton />
                Profile Details
              </h2>
            </div>
            <div className="col-md-3 text-md-right">
              <Link className="editBtn" to='/user-management/edit-detail'>
                <FontAwesomeIcon icon={faUserEdit}></FontAwesomeIcon> Edit Profile
              </Link>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12">
              <div className="row mb-3 justify-content-end">
                <div className="col-lg-4 text-end order-1 order-lg-2 mb-3">
                  {/* <button onClick={() => {
                    profileData.status ? setShowModal(true) : setShowModal3(true)
                  }} className="notButton primaryColor fw-bold text-decoration-underline">Mark as {profileData.status ? 'Inactive' : 'Active'}</button> */}
                  <span className="statusBadge statusBadgeActive">Active</span>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-xl-6 col-md-6 mb-3">
                      <h4 className="secondaryLabel">Name</h4>
                      <p className="secondaryText">{data?.name}</p>
                      {/* <p className="secondaryText">{profileData.name}</p> */}
                    </div>
                    <div className="col-xl-6 col-md-6 mb-3">
                      <h4 className="secondaryLabel">Email Address</h4>
                      <p className="secondaryText">{data?.email}</p>
                      {/* <p className="secondaryText">{profileData.email}</p> */}
                    </div>
                    <div className="col-xl-6 col-md-6 mb-3">
                      <h4 className="secondaryLabel">Phone Number</h4>
                      <p className="secondaryText">{data?.user_details?.phone_number}</p>
                      {/* <p className="secondaryText">{profileData.number}</p> */}
                    </div>
                    <div className="col-xl-6 col-md-6 mb-3">
                      <h4 className="secondaryLabel">Address</h4>
                      <p className="secondaryText">{data?.user_details?.address}</p>
                      {/* <p className="secondaryText">{profileData.country}</p> */}
                    </div>
                    <div className="col-xl-6 col-md-6 mb-3">
                      <h4 className="secondaryLabel">Gender</h4>
                      <p className="secondaryText">{data?.user_details?.gender?.name}</p>
                      {/* <p className="secondaryText">{profileData.country}</p> */}
                    </div>
                    <div className="col-xl-6 col-md-6 mb-3">
                      <h4 className="secondaryLabel">Mobile Number</h4>
                      <p className="secondaryText">{data?.user_details?.mobile_number}</p>
                      {/* <p className="secondaryText">{profileData.country}</p> */}
                    </div>
                    <div className="col-xl-6 col-md-6 mb-3">
                      <h4 className="secondaryLabel">Age</h4>
                      <p className="secondaryText">{data?.user_details?.age}</p>
                      {/* <p className="secondaryText">{profileData.country}</p> */}
                    </div>
                    <div className="col-xl-6 col-md-6 mb-3">
                      <h4 className="secondaryLabel">Blood Group</h4>
                      <p className="secondaryText">{data?.user_details?.bloodgroupdetails?.name}</p>
                      {/* <p className="secondaryText">{profileData.country}</p> */}
                    </div>
                    <div className="col-xl-6 col-md-6 mb-3">
                      <h4 className="secondaryLabel">Registered On</h4>
                      <p className="secondaryText">{data?.created_at}</p>
                      {/* <p className="secondaryText">{profileData.postal_code}</p> */}
                    </div>
                    <div className="col-xl-6 mb-3">
                      <h4 className="secondaryLabel">Subscription Plan</h4>
                      <p className="secondaryText">{data?.subscription_plan?.name}</p>
                      {/* <p className="secondaryText">{profileData.address_1}</p>  */}
                    </div>
                    <div className="col-xl-6 mb-3">
                      <h4 className="secondaryLabel">No of File Categories</h4>
                      <p className="secondaryText">{data?.user_category?.length}</p>
                      {/* <p className="secondaryText">{profileData.address_1}</p>  */}
                    </div>

                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="col-md-4 mb-3 m-auto">
                    <QRCode
                      size={256}
                      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                      value={`https://inteloncommand.com/medical-customer-portal/user-detail/${data?.id}`}
                      viewBox={`0 0 256 256`}
                      renderAs="canvas"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CustomModal show={showModal} close={() => { setShowModal(false) }} action={inActive} heading='Are you sure you want to mark this user as inactive?' />
        <CustomModal show={showModal2} close={() => { setShowModal2(false) }} success heading='Marked as Inactive' />

        <CustomModal show={showModal3} close={() => { setShowModal3(false) }} action={Active} heading='Are you sure you want to mark this user as Active?' />
        <CustomModal show={showModal4} close={() => { setShowModal4(false) }} success heading='Marked as Active' />
      </DashboardLayout>
    </>
  );
};

export default UserManagementDetail;
